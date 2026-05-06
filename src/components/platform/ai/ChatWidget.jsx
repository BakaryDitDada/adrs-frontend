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
import {
  useSendChatMessageMutation,
  useGetConversationQuery,
} from '@/store/features/ai/AiApi';
import * as S from './ChatWidget.styles';

const STORAGE_KEY = 'adrs_ai_conversation_id';

const formatTimestamp = (iso) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [sendMessage] = useSendChatMessageMutation();

  // Conversation ID from localStorage
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || null;
    }
    return null;
  });

  // Fetch conversation history if conversationId exists
  const {
    data: conversationData,
    isLoading: conversationLoading,
    isError: conversationError,
  } = useGetConversationQuery(conversationId, {
    skip: !conversationId || !isOpen, // only fetch when chat is open and we have an ID
  });

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      content: "Bonjour ! Je suis votre assistant ADRS. Posez-moi toutes vos questions concernant les employés, les projets, la paie ou les rapports ! Par exemple, essayez « Quels sont les projets en cours ? » ou « Montre-moi un rapport de paie pour le dernier trimestre.",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Update messages when conversation data arrives
  useEffect(() => {
    if (conversationData?.messages?.length) {
      const formatted = conversationData.messages.map((msg) => ({
        id: msg._id,
        role: msg.role === 'assistant' ? 'ai' : 'user',
        content: msg.content,
        timestamp: msg.createdAt,
      }));
      setMessages(formatted);
    } else if (conversationData && !conversationData.messages?.length) {
      // Conversation exists but has no messages (unlikely) – keep welcome
      setMessages([{
        id: 'welcome',
        role: 'ai',
        content: "Bonjour ! Je suis votre assistant ADRS. Posez-moi toutes vos questions concernant les employés, les projets, la paie ou les rapports ! Par exemple, essayez « Quels sont les projets en cours ? » ou « Montre-moi un rapport de paie pour le dernier trimestre.",
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [conversationData]);

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

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || typing) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setTyping(true);

    try {
      const data = await sendMessage({
        message: trimmed,
        conversationId,
      }).unwrap();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation ID if new
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Désolé, j’ai rencontré une erreur. Veuillez réessayer.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Loading state for initial conversation fetch
  const showLoader = conversationLoading && isOpen && conversationId;

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
                      <div>{msg.content}</div>
                      <S.Timestamp>{formatTimestamp(msg.timestamp)}</S.Timestamp>
                    </S.MessageContent>
                  </S.MessageBubble>
                ))
              )}
              {typing && (
                <S.TypingIndicator>
                  <S.TypingDots>
                    <span>.</span><span>.</span><span>.</span>
                  </S.TypingDots>
                </S.TypingIndicator>
              )}
              <div ref={messagesEndRef} />
            </S.MessageList>

            <S.ChatInputBar>
              <S.Input
                placeholder="Type your message..."
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

// import { useState, useRef, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   MessageCircle,
//   X,
//   Send,
//   Bot,
//   User,
//   Loader,
// } from 'lucide-react';
// import { useSendChatMessageMutation } from '@/store/features/ai/AiApi';
// import * as S from './ChatWidget.styles';

// const STORAGE_KEY = 'adrs_ai_conversation_id';

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 'welcome',
//       role: 'ai',
//       content: "",
//       timestamp: new Date().toISOString(),
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [typing, setTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const [sendMessage] = useSendChatMessageMutation();
//   const [conversationId, setConversationId] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem(STORAGE_KEY) || null;
//     }
//     return null;
//   });

//   // Save conversation ID to localStorage
//   useEffect(() => {
//     if (conversationId) {
//       localStorage.setItem(STORAGE_KEY, conversationId);
//     }
//   }, [conversationId]);

//   // Auto‑scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, typing]);

//   const toggleOpen = () => setIsOpen(!isOpen);

//   const handleSend = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || typing) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: trimmed,
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setTyping(true);

//     try {
//       const data = await sendMessage({
//         message: trimmed,
//         conversationId,
//       }).unwrap();

//       const aiMessage = {
//         id: (Date.now() + 1).toString(),
//         role: 'ai',
//         content: data.response,
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);

//       // Update conversation ID if new
//       if (data.conversationId && !conversationId) {
//         setConversationId(data.conversationId);
//       }
//     } catch (error) {
//       const errorMessage = {
//         id: (Date.now() + 1).toString(),
//         role: 'ai',
//         content: '',
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <>
//       {/* Floating button */}
//       <AnimatePresence>
//         {!isOpen && (
//           <S.FloatingButton
//             as={motion.button}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0 }}
//             onClick={toggleOpen}
//             aria-label="Open chat"
//           >
//             <MessageCircle size={24} />
//           </S.FloatingButton>
//         )}
//       </AnimatePresence>

//       {/* Chat window */}
//       <AnimatePresence>
//         {isOpen && (
//           <S.ChatWindow
//             as={motion.div}
//             initial={{ opacity: 0, y: 50, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 50, scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             key="chat-window"
//           >
//             <S.ChatHeader>
//               <S.ChatTitle>
//                 <Bot size={20} /> Assistant IA
//               </S.ChatTitle>
//               <S.CloseButton onClick={toggleOpen} aria-label="Close chat">
//                 <X size={18} />
//               </S.CloseButton>
//             </S.ChatHeader>

//             <S.MessageList>
//               {messages.map((msg) => (
//                 <S.MessageBubble key={msg.id} role={msg.role}>
//                   <S.Avatar role={msg.role}>
//                     {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
//                   </S.Avatar>
//                   <S.MessageContent role={msg.role}>
//                     {msg.content}
//                   </S.MessageContent>
//                 </S.MessageBubble>
//               ))}
//               {typing && (
//                 <S.TypingIndicator>
//                   <S.TypingDots>
//                     <span>.</span><span>.</span><span>.</span>
//                   </S.TypingDots>
//                 </S.TypingIndicator>
//               )}
//               <div ref={messagesEndRef} />
//             </S.MessageList>

//             <S.ChatInputBar>
//               <S.Input
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 disabled={typing}
//                 rows={1}
//               />
//               <S.SendButton
//                 onClick={handleSend}
//                 disabled={!input.trim() || typing}
//                 aria-label="Send message"
//               >
//                 {typing ? <Loader size={18} /> : <Send size={18} />}
//               </S.SendButton>
//             </S.ChatInputBar>
//           </S.ChatWindow>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }