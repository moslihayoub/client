import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Conversation from '../components/Conversation';
import NexaStayTextarea from '../components/SearchBar';
import BgLottie from '../components/BgLottie';
import Navbar from '../components/Navbar';
import api, { ChatMessage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Wrapper component for SearchBar in conversation page
function ConversationSearchBarWrapper({ onSend, isLoading, disabled }: { onSend: (message: string) => void; isLoading: boolean; disabled: boolean }) {
  const [fullscreen, setFullscreen] = useState(false);
  
  return (
    <NexaStayTextarea
      fullscreen={fullscreen}
      setFullscreen={setFullscreen}
      width={100}
      height={fullscreen ? 80 : 8}
      fullHeight={90}
      onSend={onSend}
      isLoading={isLoading}
      disabled={disabled}
    />
  );
}

export default function ConversationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const lastLocationKeyRef = useRef<string | null>(null);

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize chat on mount or when location changes
  useEffect(() => {
    // Check if this is a new navigation (different location.key)
    const isNewNavigation = lastLocationKeyRef.current === null || lastLocationKeyRef.current !== location.key;
    lastLocationKeyRef.current = location.key;
    
    // Check if we have a saved conversation (indicates we're returning, not starting fresh)
    const savedChatId = localStorage.getItem('nexastay_current_chat_id');
    const hasExistingConversation = savedChatId !== null;
    
    // Only process initialMessage if:
    // 1. It's a new navigation (not back button)
    // 2. We don't have an existing conversation (or it's empty)
    // This prevents re-sending the message when returning via back button
    const shouldProcessInitialMessage = isNewNavigation && !hasExistingConversation;
    
    initializeChat(shouldProcessInitialMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.key]); // Re-run when pathname or key changes

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatId && messages.length > 0) {
      try {
        const conversationData = {
          chatId: chatId,
          messages: messages,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(`nexastay_conversation_${chatId}`, JSON.stringify(conversationData));
        localStorage.setItem('nexastay_current_chat_id', chatId);
      } catch (e) {
        console.warn('Failed to save conversation to localStorage', e);
      }
    }
  }, [messages, chatId]);

  const initializeChat = async (isNewNavigation: boolean = true) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get initial message from location state ONLY if it's a new navigation
      // When returning via back button, location.state might still contain old data
      const currentInitialMessage = isNewNavigation 
        ? ((location.state as { initialMessage?: string })?.initialMessage || '')
        : '';

      // Always check for saved conversation first (when returning from listing page)
      const savedChatId = localStorage.getItem('nexastay_current_chat_id');
      
      if (savedChatId) {
        // Try to load existing chat from backend first
        try {
          const chatResponse = await api.getChat(savedChatId);
          setChatId(savedChatId);
          setMessages(chatResponse.chat.messages);
          setIsLoading(false);
          
          // Only send initial message if:
          // 1. It's a new navigation (not back button)
          // 2. There's actually a new message to send
          // 3. Either the chat is empty OR the message is different from the last user message
          //    (This prevents re-sending the same message when returning via back button)
          const lastUserMessage = chatResponse.chat.messages
            .filter((msg: ChatMessage) => msg.role === 'user')
            .pop()?.content || '';
          
          const isDifferentMessage = currentInitialMessage.trim() !== lastUserMessage.trim();
          const isChatEmpty = chatResponse.chat.messages.length === 0;
          
          if (isNewNavigation && currentInitialMessage && currentInitialMessage.trim() && 
              (isChatEmpty || isDifferentMessage)) {
            await handleSendMessage(currentInitialMessage, savedChatId);
          }
          return;
        } catch (e) {
          // Chat doesn't exist in backend, will create new one below
          console.warn('Saved chat not found in backend, creating new chat', e);
          // Clear invalid chat ID
          localStorage.removeItem('nexastay_current_chat_id');
        }
      }

      // Create new chat ONLY if no saved chat exists or saved chat is invalid
      // AND it's a new navigation (not returning via back button)
      if (isNewNavigation) {
        const response = await api.createChat({
          user_id: user?.id || 'default-user',
          title: 'New Chat',
          // Don't pass initial_message here - let handleSendMessage handle it
        });

        setChatId(response.chat.id);
        
        // Save chat ID to localStorage
        localStorage.setItem('nexastay_current_chat_id', response.chat.id);

        // If there's an initial message, trigger the conversational search automatically
        if (currentInitialMessage && currentInitialMessage.trim()) {
          // Send the message immediately to trigger search
          // conversationalSearch will add the message to the chat
          await handleSendMessage(currentInitialMessage, response.chat.id);
        } else {
          // Load existing messages if no initial message
          const chatResponse = await api.getChat(response.chat.id);
          setMessages(chatResponse.chat.messages);
        }
      } else {
        // If returning via back button and no saved chat, just show empty state
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Error initializing chat:', err);
      setError('Failed to initialize conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string, currentChatId?: string) => {
    const activeChatId = currentChatId || chatId;
    if (!activeChatId || !message.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Call backend conversational search endpoint (uses Gemini AI)
      const response = await api.conversationalSearch(activeChatId, message);

      // Update messages from backend (it auto-adds messages)
      const chatResponse = await api.getChat(activeChatId);
      setMessages(chatResponse.chat.messages);

      // Save conversation to localStorage
      try {
        const conversationData = {
          chatId: activeChatId,
          messages: chatResponse.chat.messages,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(`nexastay_conversation_${activeChatId}`, JSON.stringify(conversationData));
      } catch (e) {
        console.warn('Failed to save conversation to localStorage', e);
      }

      // Store results in localStorage for assistant context
      if (response.search_results && response.search_results.length > 0) {
        const searchData = {
          results: response.search_results,
          collectedInfo: response.collected_info || {},
          searchType: response.collected_info?.search_type || response.search_results[0]?.type,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('nexastay_search_results', JSON.stringify(searchData));
      }
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message. Please try again.');

      // Detect language from message and add error message in same language
      const msgLower = message.toLowerCase();
      const userLang = msgLower.match(/\b(i|want|need|looking|search|find|hotel|book)\b/) ? 'en' : 
                      msgLower.match(/\b(quiero|necesito|busco|hotel|reservar)\b/) ? 'es' : 'fr';
      const errorMsgText = userLang === 'en' ? 'Sorry, I encountered an error. Please try again.' :
                          userLang === 'es' ? 'Lo siento, encontré un error. Por favor, inténtalo de nuevo.' :
                          'Désolé, j\'ai rencontré une erreur. Veuillez réessayer.';
      
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: errorMsgText,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <BgLottie />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <Navbar
          logoColor="normal"
          background="transparent"
          blur={true}
          iconVariant="transparent"
          profileImg="/users/user1.png"
          setIsMobileMenu={() => {}}
        />

        {/* Error Message */}
        {error && (
          <div className="mx-auto mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-vendsans text-sm max-w-2xl">
            {error}
          </div>
        )}

        {/* Conversation Container */}
        <div className="flex-1 flex flex-col overflow-hidden pt-[4%] pb-[5%]">
          <Conversation
            messages={messages}
            isLoading={isLoading}
          />
        </div>


        {/* Desktop Search Bar */}
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-20 bg-transparent pb-4">
          <div className="max-w-4xl mx-auto px-4">
            <ConversationSearchBarWrapper
              onSend={handleSendMessage}
              isLoading={isLoading}
              disabled={!chatId}
            />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-transparent pb-4">
          <div className="px-4">
            <ConversationSearchBarWrapper
              onSend={handleSendMessage}
              isLoading={isLoading}
              disabled={!chatId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

