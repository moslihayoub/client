import React, { useState, useRef, useEffect } from "react";
import TrSend from "../svgs/transparent/TrSend";
import ColSend from "../svgs/colored/ColSend";
import api from "../services/api";
import { useLocation } from "react-router-dom";

interface Message {
    id: string;
    text: string;
    sender: "user" | "assistant";
    timestamp: Date;
}

interface AssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Assistant({ isOpen, onClose }: AssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Bonjour ! Je suis NexaBot, je peux vous aider à choisir un hôtel, un service, une expérience ou une option santé une fois la recherche effectuée.",
            sender: "assistant",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    const allowedRoutes = ["/hotels", "/favorites"];
    const isDetailsRoute = location.pathname.startsWith("/details");
    const isAllowed = allowedRoutes.includes(location.pathname) || isDetailsRoute;

    const getStoredResults = () => {
        try {
            const searchSaved = localStorage.getItem("nexastay_search_results");
            const currentSaved = localStorage.getItem("nexastay_current_list");
            const searchResults = searchSaved ? (JSON.parse(searchSaved)?.results || []) : [];
            
            // Parse current list - can be array (old format) or object (new format with context)
            let currentListItems: any[] = [];
            let listingContext: any = null;
            
            if (currentSaved) {
                const parsed = JSON.parse(currentSaved);
                if (Array.isArray(parsed)) {
                    // Old format: just array
                    currentListItems = parsed;
                } else if (parsed && parsed.items) {
                    // New format: object with items and context
                    currentListItems = parsed.items || [];
                    listingContext = {
                        selectedTab: parsed.selectedTab,
                        affichageType: parsed.affichageType,
                        totalCount: parsed.totalCount
                    };
                }
            }

            const seen = new Set<string>();
            const merged = [...searchResults, ...currentListItems].filter((item: any) => {
                const key = `${item.type || item.title}-${item.id}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
            
            return { results: merged, listingContext };
        } catch {
            return { results: [], listingContext: null };
        }
    };

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when assistant opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (inputValue.trim() === "") return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            sender: "user",
            timestamp: new Date()
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        if (!isAllowed) {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Lancez d’abord une recherche (hôtels, services, expériences ou santé) pour que je puisse recommander une option.",
                sender: "assistant",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, assistantMessage]);
            return;
        }

        const { results, listingContext } = getStoredResults();
        if (!results.length) {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Je n'ai pas encore de résultats. Faites une recherche puis je vous recommanderai le meilleur choix.",
                sender: "assistant",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, assistantMessage]);
            return;
        }

        try {
            setIsLoading(true);
            const resp = await api.assistantRecommend(userMessage.text, results, listingContext);
            const assistantMessage: Message = {
                id: (Date.now() + 2).toString(),
                text: resp.reply,
                sender: "assistant",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (e) {
            const assistantMessage: Message = {
                id: (Date.now() + 3).toString(),
                text: "Je rencontre un souci technique. Réessayez dans un instant.",
                sender: "assistant",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Assistant Panel */}
            <div
                className={`fixed bottom-6 right-6 w-[420px] h-[600px] bg-white rounded-[24px] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-[500px]"
                    }`}
                style={{
                    maxHeight: "calc(100vh - 48px)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-[24px] bg-gradient-to-r from-teal-50 to-sky-50">
                    <div className="flex items-center gap-3">
                        <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.9885 18.0745C31.9751 16.6791 32.0158 15.2767 31.9616 13.8818C31.9008 12.0402 31.4144 10.2272 30.5092 8.65492C29.6988 7.27359 28.6115 6.05556 27.2875 5.20586C25.3491 3.97326 23.3566 2.83312 21.4115 1.62213C18.1491 -0.552632 13.7317 -0.53806 10.476 1.65027C9.78023 2.07537 9.08443 2.507 8.38239 2.92507C6.27485 4.27073 3.88362 5.30485 2.28979 7.36554C1.68887 8.13083 1.20918 8.9946 0.803778 9.88701C0.337992 11.1126 0.0135705 12.4085 0.00686162 13.7401C-0.0065561 16.2967 0.00686156 18.8463 0.000152763 21.403C-0.013265 23.8184 0.857928 26.2052 2.33052 28.0539C3.27599 29.3001 4.54588 30.2141 5.86945 30.9648C7.10579 31.7225 8.35508 32.4516 9.58424 33.2169C11.0166 34.1656 12.5563 34.9661 14.2383 35.2992C15.7918 35.5043 17.3924 35.4334 18.9052 34.9731C20.0807 34.6194 21.1412 33.946 22.1883 33.3089C24.0725 32.112 26.0583 31.0638 27.8889 29.7749C30.0635 28.0891 31.5764 25.4405 31.86 22.6074C32.056 21.1055 31.9683 19.59 31.9885 18.0745Z" fill="url(#paint0_radial_3702_4)" />
                            <path d="M15.9734 7.8287C16.7569 7.82116 17.4192 8.31008 18.0877 8.67137C18.2161 10.4205 18.0542 12.1843 18.1352 13.9334C18.196 14.9253 18.162 15.9167 18.162 16.9081C18.162 17.4111 18.1687 17.9071 18.2027 18.4095C18.2161 18.6648 18.2362 18.7779 18.4188 18.9483C18.6416 19.1673 18.9455 19.316 19.2224 19.4648C19.452 19.5854 19.9384 19.7979 20.1813 19.5784C20.6883 19.1252 20.4723 18.3317 20.5326 17.7227C20.4924 15.2012 20.6275 12.6727 20.4723 10.1517C21.5529 10.8386 22.7211 11.3768 23.7073 12.2124C24.2881 13.0837 24.3557 14.1671 24.3015 15.1941C24.2407 17.2835 24.349 19.3728 24.268 21.4621C24.0246 22.3405 23.4303 23.0772 22.667 23.4948C20.8637 24.5575 19.0873 25.6766 17.2841 26.7388C16.2303 27.4116 14.7376 27.1493 13.9608 26.1649C13.8865 25.457 13.934 24.7485 13.934 24.0405C13.9273 21.7029 13.9407 19.3658 13.934 17.0287C14.0217 16.2072 13.1299 15.9237 12.5697 15.6403C12.0699 15.3358 11.5025 15.8389 11.5835 16.4052C11.5227 19.203 11.6372 22.0074 11.5293 24.8052C10.2935 23.9128 8.55058 23.5093 7.87537 21.9722C7.51022 20.7753 7.70626 19.4794 7.66602 18.2398C7.69285 16.7313 7.63868 15.2158 7.71966 13.7068C7.76039 12.7506 8.42891 11.9717 9.18557 11.5185C10.6783 10.6401 12.1576 9.73368 13.6369 8.8272C14.3662 8.38804 15.1023 7.86389 15.9734 7.8287Z" fill="url(#paint1_linear_3702_4)" />
                            <defs>
                                <radialGradient id="paint0_radial_3702_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.9956 2.59922) rotate(90) scale(33.5447 30.3074)">
                                    <stop stop-color="#2DD4BF" />
                                    <stop offset="0.55" stop-color="#0EA5E9" />
                                    <stop offset="1" stop-color="#D946EF" />
                                </radialGradient>
                                <linearGradient id="paint1_linear_3702_4" x1="15.9827" y1="7.82861" x2="15.9827" y2="27.1125" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" />
                                    <stop offset="1" stop-color="#F8FAFC" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div>
                            <h3 className="font-semibold text-gray-800 text-base font-outfit">NexaBot</h3>
                            <p className="text-xs text-gray-500">Assistant virtuel</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Fermer"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.sender === "user"
                                        ? "bg-fuchsia-500 text-white rounded-br-sm"
                                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                    }`}
                            >
                                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">
                                    {message.text}
                                </p>
                                <span
                                    className={`text-xs mt-1 block ${message.sender === "user" ? "text-white/70" : "text-gray-500"
                                        }`}
                                >
                                    {message.timestamp.toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 rounded-b-[24px] bg-gray-50">
                    <div className="flex items-center gap-2">
                        <div 
                            className="flex-1 rounded-full p-[1.5px] transition-all"
                            style={{
                                background: isFocused 
                                    ? 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)'
                                    : 'transparent'
                            }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Tapez votre message..."
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={inputValue.trim().length === 0 || isLoading}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${inputValue.trim().length === 0
                                    ? "cursor-not-allowed"
                                    : "hover:scale-105 active:scale-95"
                                }`}
                            aria-label="Envoyer"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-gray-300 border-t-sky-500 rounded-full animate-spin" />
                            ) : inputValue.trim().length === 0 ? (
                                <div className="opacity-50">
                                    <TrSend />
                                </div>
                            ) : (
                                <ColSend />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

