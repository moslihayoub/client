import React from 'react';
import { ChatMessage } from '../services/api';
import ConversationResults from './ConversationResults';

interface ConversationBubbleProps {
  message: ChatMessage;
}

export default function ConversationBubble({ message }: ConversationBubbleProps) {
  const isUser = message.role === 'user';
  const hasResults = message.search_results && message.search_results.length > 0;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[85%] sm:max-w-[90%] rounded-[22px] px-4 sm:px-5 py-3 transition-all duration-200 ${
          isUser
            ? 'bg-white text-slate-900 shadow-md hover:shadow-lg'
            : 'bg-slate-800 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        <p className="text-sm sm:text-base font-medium font-vendsans leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>

        {/* Display search results if available */}
        {!isUser && hasResults && (
          <ConversationResults 
            results={message.search_results!} 
            searchType={message.search_results?.[0]?.type}
          />
        )}

        {/* Display timestamp */}
        <p
          className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 ${
            isUser ? 'text-slate-500' : 'text-slate-400'
          } font-vendsans`}
        >
          {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

