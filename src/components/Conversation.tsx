import React, { useEffect, useRef } from 'react';
import ConversationBubble from './ConversationBubble';
import { ChatMessage } from '../services/api';

interface ConversationProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function Conversation({
  messages,
  isLoading,
}: ConversationProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-4 scrollbar-hide pb-32 md:pb-24">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-bricolagegrotesque mb-2">
              Bonjour! Comment puis-je vous aider?
            </h2>
            <p className="text-slate-600 font-vendsans text-base sm:text-lg">
              Je suis là pour vous aider à planifier votre séjour au Maroc
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ConversationBubble key={message.id} message={message} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-slate-800 rounded-[22px] px-5 py-3 shadow-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

