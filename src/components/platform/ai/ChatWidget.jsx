import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader,
  Trash,
  Pointer,
  CloudSnow,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { selectCurrentToken } from '@/store/features/auth/authSlice';
import {
  useSendChatMessageMutation,
  useGetConversationsQuery,
  useRemoveConversationMutation,
  useGetConversationQuery
} from '@/store/features/ai/AiApi';
import { formatTimestamp } from '@/utils/timesUtils';
import * as S from './ChatWidget.styles';

const STORAGE_KEY = 'adrs_ai_conversation_id';

export default function ChatWidget() {
  const token = useSelector(selectCurrentToken);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStatus, setStreamStatus] = useState("");
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || null;
    }
    return null;
  });

  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const containerRef = useRef(null);

  const { data: conversationsData, isLoading } = useGetConversationsQuery();
  
  // 1. Destructure the 'refetch' function from your query hook here
  const { 
    data: conversationData, 
    isLoading: isConvLoading, 
    refetch: refetchConversation 
  } = useGetConversationQuery(conversationId, { skip: !conversationId });

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (conversationId) {
      localStorage.setItem(STORAGE_KEY, conversationId);
    }
  }, [conversationId]);

  // 2. UPDATED SYNCHRONIZATION GUARD
  useEffect(() => {
    if (!conversationData?.messages || isStreaming) {
      return;
    }

    setMessages((prev) => {
      const serverCount = conversationData.messages.length;
      
      // 🛡️ GUARD: If our local state has more messages than the incoming server cache,
      // it means the server data is stale (hasn't caught up to the completed stream).
      // Reject the update to prevent the disappearing act!
      if (prev.length > 0 && serverCount < prev.length) {
        return prev;
      }

      // Otherwise, the server has caught up (or we are switching chats), safely sync.
      return conversationData.messages.map((msg) => ({
        id: msg._id ?? crypto.randomUUID(),
        role: msg.role === 'assistant' ? 'ai' : 'user',
        content: msg.content,
        timestamp: msg.createdAt,
      }));
    });
  }, [conversationData, isStreaming]);

  useEffect(() => {
    if (!conversationsData?.conversations) {
      return;
    }

    setConversations(
      conversationsData.conversations.map((conv) => ({
        id: conv._id ?? crypto.randomUUID(),
        title: conv.title,
        messages: conv.messages,
      }))
    );
  }, [conversationsData]);

  // useLayoutEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   const threshold = 50;
  //   const isAtBottom =
  //     container.scrollHeight - container.scrollTop <=
  //     container.clientHeight + threshold;

  //   if (!isAtBottom) return;

  //   const behavior = isStreaming ? 'auto' : 'smooth';

  //   requestAnimationFrame(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior });
  //   });
  // }, [messages, isStreaming]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Dynamic Threshold: Increase the tolerance window while streaming.
    // Markdown rendering causes sudden height expansions that trick a tight 50px guard.
    const threshold = isStreaming ? 250 : 80;

    // Calculate how far the user is from the absolute bottom
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const isNearBottom = distanceFromBottom <= threshold;

    // If the user has explicitly scrolled up higher than the threshold to read history, 
    // don't force their screen back down.
    if (!isNearBottom) return;

    // 2. Direct Container Manipulation: Setting scrollTop directly is far more
    // accurate and performant than scrollIntoView during rapid token re-renders.
    if (isStreaming) {
      // Instant snap to bottom during live text generation
      container.scrollTop = container.scrollHeight;
    } else {
      // Smooth transition for user messages or finalized states
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const chatWindow = chatWindowRef.current;
      if (chatWindow && !chatWindow.contains(target)) {
        closeChat();
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen, closeChat]);

  const sendMessageStream = async (req) => {
    const response = await fetch(`http://localhost:5000/api/v1/ai/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        message: req.content, 
        // conversationId: req.conversationId 
        ...(req.conversationId && { conversationId: req.conversationId }) // Only includes it if it exists
      }),
    });

    if (!response.ok) throw new Error('Erreur de streaming');
    if (!response.body) throw new Error('Streaming non supporté');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split('\n');
      buffer = events.pop() ?? '';

      for (const eventText of events) {
        let rawMessage = eventText.trim();
        if (!rawMessage) continue;

        if (rawMessage.startsWith('data:')) {
          rawMessage = rawMessage.replace('data:', '').trim();
        }

        if (!rawMessage.startsWith('{') || !rawMessage.endsWith('}')) {
          continue;
        }

        try {
          const data = JSON.parse(rawMessage);
          console.log("🚀 Decoded Stream Event:", data);

          switch (data.type) {
            case 'thinking':
              setStreamStatus(data.content);
              break;

            case 'conversation':
              setConversationId(data.conversationId);
              localStorage.setItem(STORAGE_KEY, data.conversationId);
              break;

            case 'token':
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === req?.aiMessageId
                    ? { ...msg, content: msg.content + data.content }
                    : msg
                )
              );
              break;

            case 'done':
              setStreamStatus('');
              setIsStreaming(false);
              
              // 3. FORCE RTK QUERY TO REFETCH DATABASE CONTENT
              // This updates the server cache smoothly in the background. Once the cache count
              // matches or exceeds local state, the useEffect will safely map real MongoDB IDs (_id).
              if (refetchConversation) {
                refetchConversation();
              }
              break;

            case 'error':
              throw new Error(data.content);
          }
        } catch (error) {
          console.error("Malformed JSON chunk received:", rawMessage, error);
        }
      }
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || showLoader) return;

    const userMessageId = crypto.randomUUID();
    const aiMessageId = crypto.randomUUID();

    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    const aiPlaceholder = {
      id: aiMessageId,
      role: 'ai',
      content: '',
      timestamp: new Date().toISOString(),
    };

    setInput('');
    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setIsStreaming(true);

    try {
      await sendMessageStream({
        content: trimmed,
        conversationId,
        aiMessageId,
      });
    } catch (error) {
      console.error("Stream failed:", error);
      setIsStreaming(false);
      setStreamStatus('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showLoader = isLoading && isOpen;
  
  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <S.FloatingButton
            as={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={toggleOpen}
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </S.FloatingButton>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <S.ChatWindow
            ref={chatWindowRef}
            as={motion.div}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            key="chat-window"
          >
            <S.ChatHeader>
              <S.ChatTitle>
                <Bot size={20} /> AI Assistant
              </S.ChatTitle>
              <S.CloseButton onClick={toggleOpen} aria-label="Close chat">
                <X size={18} />
              </S.CloseButton>
            </S.ChatHeader>

            <S.MessageList ref={containerRef}>
              {showLoader ? (
                <S.LoadingWrapper>
                  <Loader size={20} />
                  <span>Loading conversation...</span>
                </S.LoadingWrapper>
              ) : (
                messages.map((msg) => (
                  <S.MessageBubble key={msg.id} role={msg.role}>
                    <S.Avatar role={msg.role}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </S.Avatar>
                    <S.MessageContent role={msg.role}>
                      {/* <div>{msg.content}</div> */}
                      <ReactMarkdown
                        remarkPlugins={[
                          remarkGfm,
                        ]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                      <S.Timestamp>{formatTimestamp(msg.timestamp)}</S.Timestamp>
                    </S.MessageContent>
                  </S.MessageBubble>
                ))
              )}
              {isStreaming && (
                <S.TypingIndicator>

                  <S.TypingDots>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </S.TypingDots>

                  <span>
                    {streamStatus ||
                      "Réflexion..."}
                  </span>

                </S.TypingIndicator>
              )}
              <div ref={messagesEndRef} style={{height: "5rem"}}>test</div>
            </S.MessageList>

            <S.ChatInputBar>
              <S.Input
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={typing || showLoader}
                rows={1}
              />
              <S.SendButton
                onClick={handleSend}
                disabled={!input.trim() || typing || showLoader}
                aria-label="Send message"
              >
                {typing ? <Loader size={18} /> : <Send size={18} />}
              </S.SendButton>
            </S.ChatInputBar>
          </S.ChatWindow>
        )}
      </AnimatePresence>
    </>
  );
}