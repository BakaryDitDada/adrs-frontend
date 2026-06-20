import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  useSendChatMessageMutation,
  useGetConversationQuery,
} from '@/store/features/ai/AiApi';
import * as S from './ChatWidget.styles';
import { streamChatMessage } from '@/services/chatStreamService';

const STORAGE_KEY = 'adrs_ai_conversation_id';

const formatTimestamp = (iso) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [streamStatus, setStreamStatus] = useState("");
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const [sendMessage] = useSendChatMessageMutation();

  // Conversation ID from localStorage
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || null;
    }
    return null;
  });

  // Fetch conversation history if conversationId exists
  // const {
  //   data: conversationData,
  //   isLoading: conversationLoading,
  //   isError: conversationError,
  // } = useGetConversationQuery(conversationId, {
  //   skip: !conversationId || !isOpen, // only fetch when chat is open and we have an ID
  // });

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      content: "Bonjour ! Je suis votre assistant ADRS. Posez-moi toutes vos questions concernant les employés, les projets, la paie ou les rapports ! Par exemple, essayez « Quels sont les projets en cours ? » ou « Montre-moi un rapport de paie pour le dernier trimestre.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Update messages when conversation data arrives
  // useEffect(() => {
  //   if (conversationData?.messages?.length) {
  //     const formatted = conversationData.messages.map((msg) => ({
  //       id: msg._id,
  //       role: msg.role === 'assistant' ? 'ai' : 'user',
  //       content: msg.content,
  //       timestamp: msg.createdAt,
  //     }));
  //     setMessages(formatted);
  //   } else if (conversationData && !conversationData.messages?.length) {
  //     // Conversation exists but has no messages (unlikely) – keep welcome
  //     setMessages([{
  //       id: 'welcome',
  //       role: 'ai',
  //       content: "Bonjour ! Je suis votre assistant ADRS. Posez-moi toutes vos questions concernant les employés, les projets, la paie ou les rapports ! Par exemple, essayez « Quels sont les projets en cours ? » ou « Montre-moi un rapport de paie pour le dernier trimestre.",
  //       timestamp: new Date().toISOString(),
  //     }]);
  //   }
  // }, [conversationData]);

  // Save conversation ID to localStorage
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem(STORAGE_KEY, conversationId);
    }
  }, [conversationId]);

  // Auto‑scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

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

  const handleSend = async () => {

    const trimmed =
      input.trim();

    if (!trimmed || typing) {
      return;
    }

    const userMessage = {
      role: "user",
      content:trimmed,
      // timestamp: new Date().toISOString(),
    };

    setMessages(
      prev => [
        ...prev,
        userMessage,
      ]
    );

    setInput("");

    setTyping(true);

    // const assistantId = crypto.randomUUID();

    setMessages(
      prev => [
        ...prev,
        {
          role: "assistant",
          content: ""
        },
      ]
    );

    try {

      await streamChatMessage({

        message: trimmed,
        // conversationId,

        onEvent:
          event => {

            switch (
              event.type
            ) {

              case "thinking":

                setStreamStatus(
                  event.content
                );

                break;

              case "token":

                setMessages(
                  prev =>
                    prev.map(
                      msg => {

                        if (
                          msg.id !==
                          assistantId
                        ) {
                          return msg;
                        }

                        return {
                          ...msg,

                          content:
                            msg.content +
                            event.content,
                        };
                      }
                    )
                );

                break;

              case "done":

                setTyping(
                  false
                );

                setStreamStatus(
                  ""
                );

                if (
                  event.conversationId &&
                  !conversationId
                ) {

                  setConversationId(
                    event.conversationId
                  );
                }

                break;

              case "error":

                setTyping(
                  false
                );

                setMessages(
                  prev =>
                    prev.map(
                      msg => {

                        if (
                          msg.id !==
                          assistantId
                        ) {
                          return msg;
                        }

                        return {
                          ...msg,

                          content:
                            event.content,
                        };
                      }
                    )
                );

                break;
            }
          },
      });

    } catch (
      error
    ) {

      console.error(
        error
      );

      setTyping(
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

  // Loading state for initial conversation fetch
  // const showLoader = conversationLoading && isOpen && conversationId;
  const showLoader = false; // Temporarily disable loader for now

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

            <S.MessageList>
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
              {typing && (
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
              <div ref={messagesEndRef} />
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