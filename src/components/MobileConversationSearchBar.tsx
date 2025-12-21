import { useState, useEffect, useRef } from "react";
import TrSend from "../svgs/transparent/TrSend";
import ColSend from "../svgs/colored/ColSend";

interface MobileConversationSearchBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function MobileConversationSearchBar({ onSend, isLoading, disabled = false }: MobileConversationSearchBarProps) {
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
    <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-4 bg-transparent">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white rounded-[22px] shadow-lg border border-slate-200 p-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || disabled}
            placeholder={animatedTexts[currentTextIndex]}
            className="w-full resize-none outline-none border-none text-slate-800 text-sm font-vendsans bg-transparent placeholder:text-slate-400"
            rows={1}
            style={{
              maxHeight: '80px',
              minHeight: '20px',
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
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 flex-shrink-0 ${
            value.trim().length === 0 || isLoading || disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:shadow-xl transition-shadow duration-200'
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
  );
}

