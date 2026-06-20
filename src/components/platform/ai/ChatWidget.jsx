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

// const formatTimestamp = (iso) => {
//   const date = new Date(iso);
//   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

export default function ChatWidget() {
  const token = useSelector(selectCurrentToken);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStatus, setStreamStatus] = useState("");
  // Conversation ID from localStorage
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || null;
    }
    return null;
  });

  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const containerRef = useRef(null);

  const [sendMessage] = useSendChatMessageMutation();
  const [removeConversation, { isSuccess: isRemoveSuccess }] = useRemoveConversationMutation();
  const { data: conversationsData, isLoading } = useGetConversationsQuery();
  const { data: conversationData, isLoading: isConvLoading } = useGetConversationQuery(conversationId);

  // Messages 
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Save conversation ID to localStorage
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem(STORAGE_KEY, conversationId);
    }
  }, [conversationId]);

  useEffect(() => {

    if (
      !conversationData?.messages
    ) {
      return;
    }

    setMessages(
      conversationData.messages.map(
        msg => ({
          id: msg._id ?? crypto.randomUUID(),
          role: msg.role === 'assistant' ? 'ai' : 'user',
          content: msg.content,
          timestamp: msg.createdAt,
        })
      )
    );

  }, [conversationData]);

  useEffect(() => {

    if (
      !conversationsData?.conversations
    ) {
      return;
    }

    setConversations(
      conversationsData.conversations.map(
        conv => ({
          id: conv._id ?? crypto.randomUUID(),
          title: conv.title,
          messages: conv.messages
        })
      )
    )

  }, [conversationsData]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user is at the bottom (with tolerance)
    const threshold = 50;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + threshold;

    if (!isAtBottom) return; // user is reading history – don't move

    // Use instant scroll during streaming, smooth otherwise
    const behavior = isStreaming ? 'auto' : 'smooth';

    // Batch scrolls to avoid jank
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior });
    });
  }, [messages, isStreaming]); // depend on streaming state as well

  useEffect(() => {
    // small delay to guarantee the DOM is ready
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   const isUserAtBottom =
  //     container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
  //   // +50px de tolérance

  //   if (isUserAtBottom) {
  //     scrollToBottom(true);
  //   }
  // }, [messages]);

  // Scroll automatique au montage (ouverture du chatbot)
  // useEffect(() => {
  //   scrollToBottom(false);
  // }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (
      event
    ) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const chatWindow =
        chatWindowRef.current;

      if (
        chatWindow &&
        !chatWindow.contains(target)
      ) {
        closeChat();
      }
    };

    document.addEventListener(
      'pointerdown',
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsideClick
      );
    };
  }, [isOpen, closeChat]);

  const sendMessageStream = async (message) => {
    const response =
      await fetch(
        `http://localhost:5000/api/v1/ai/chat/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ token }`,
          },

          body: JSON.stringify({
            message
          }),
        }
      );

    if (!response.ok) {
      throw new Error(
        'Erreur de streaming'
      );
    }

    if (!response.body) {
      throw new Error(
        'Streaming non supporté'
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    let buffer = '';

    //
    // Empty AI message
    //
    const aiMessageId =
      crypto.randomUUID();

    setMessages(prev => [
      ...prev,
      {
        id: aiMessageId,
        role: 'ai',
        content: '',
        timestamp:
          new Date().toISOString(),
      },
    ]);

    while (true) {

      const {
        done,
        value,
      } =
        await reader.read();

      if (done) {
        break;
      }

      buffer +=
        decoder.decode(
          value,
          {
            stream: true,
          }
        );

      const events =
        buffer.split('\n\n');

      buffer =
        events.pop() ?? '';

      for (
        const eventText
        of events
      ) {

        const line =
          eventText
            .split('\n')
            .find(
              l =>
                l.startsWith(
                  'data:'
                )
            );

        if (!line)
          continue;

        try {

          const data =
            JSON.parse(
              line.replace(
                'data:',
                ''
              )
            );

          switch (
            data.type
          ) {

            case 'thinking':

              setStreamStatus(
                data.content
              );

              break;
            
            case 'conversation':

              setConversationId(
                data.conversationId
              );

              localStorage.setItem(
                STORAGE_KEY,
                data.conversationId
              );

              break;

            case 'token':

              setMessages(
                prev =>
                  prev.map(
                    msg =>
                      msg.id ===
                      aiMessageId
                        ? {
                            ...msg,
                            content:
                              msg.content +
                              data.content,
                          }
                        : msg
                  )
              );

              break;

            case 'done':

              setStreamStatus('');

              break;

            case 'error':

              throw new Error(
                data.content
              );
          }

        } catch (error) {

          console.error(
            error
          );
        } finally {
          setIsStreaming(false);
        }
      }
    }
  };

  const handleSend = async () => {

    const trimmed = input.trim();

    if (!trimmed || isStreaming) {
      return;
    }

    const userMessage = {
      id:crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [
      ...prev,
      userMessage,
    ]);

    setInput('');

    setIsStreaming(true);

    try {

      await sendMessageStream(
        trimmed
      );

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'ai',
          content: 'Une erreur est survenue.',
          timestamp: new Date().toISOString(),
        },
      ]);

    } finally {

      setIsStreaming(
        false
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // const handleDelete = async(id) => {
  //   if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) return;
    
  //   try {
  //     await removeConversation(id).unwrap();
  //     toast.success("Conversation supprimée avec succès!")
  //   } catch(err) {
  //     console.log("Error deleting ::: ", err)
  //     toast.error(`Erreur lors de la suppression: ${err}`)
  //   }
    
  // }

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
              <div ref={messagesEndRef} style={{height: "5rem"}} />
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