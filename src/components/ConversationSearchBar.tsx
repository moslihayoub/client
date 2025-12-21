import { useState, useEffect, useRef } from "react";
import TrSend from "../svgs/transparent/TrSend";
import ColSend from "../svgs/colored/ColSend";

interface ConversationSearchBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ConversationSearchBar({ onSend, isLoading, disabled = false }: ConversationSearchBarProps) {
  const [value, setValue] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const animatedTexts = [
    "Où vous voulez passer vos vacances",
    "Comment je peux vous aidez",
    "Comment vous voulez vivre votre séjour",
    "Si vous voulez découvrir les activités"
  ];

  // Text animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 py-4">
      <div
        className="relative w-full bg-white rounded-[22px] shadow-nexastay-default border border-slate-200 transition-all duration-300"
        style={{
          minHeight: '56px',
          maxHeight: '160px',
        }}
      >
        <div className="flex items-center w-full h-full px-4 py-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || disabled}
              placeholder={animatedTexts[currentTextIndex]}
              className="w-full resize-none outline-none border-none text-slate-800 text-base font-vendsans bg-transparent placeholder:text-slate-400 overflow-hidden"
              rows={1}
              style={{
                minHeight: '24px',
                maxHeight: '120px',
                transition: 'opacity 0.3s ease-in-out',
                opacity: isVisible ? 1 : 0.5,
              }}
            />
          </div>

          {/* Send button */}
          <button
            type="button"
            disabled={value.trim().length === 0 || isLoading || disabled}
            onClick={handleSend}
            className={`ml-3 w-[44px] h-[44px] flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200 ${
              value.trim().length === 0 || isLoading || disabled
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-105'
            }`}
          >
            {value.trim().length === 0 || isLoading || disabled ? (
              <TrSend />
            ) : (
              <ColSend />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

