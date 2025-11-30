import React, { useState, useRef, useEffect } from "react";
import TrSend from "../svgs/transparent/TrSend";
import ColSend from "../svgs/colored/ColSend";

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
            text: "Bonjour ! Je suis NexaBot, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
            sender: "assistant",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            sender: "user",
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        // Simulate assistant response after a short delay
        setTimeout(() => {
            const responses = [
                "Merci pour votre message ! Je traite votre demande...",
                "C'est une excellente question. Laissez-moi vous aider avec cela.",
                "Je comprends votre besoin. Voici ce que je peux vous proposer.",
                "Parfait ! J'ai bien noté votre demande. Comment puis-je vous assister davantage ?",
                "Très bien ! Je vais vous fournir les informations nécessaires.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "assistant",
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, assistantMessage]);
        }, 1000);
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
                className={`fixed bottom-6 right-6 w-[420px] h-[600px] bg-white rounded-[24px] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-[500px]"
                }`}
                style={{
                    maxHeight: "calc(100vh - 48px)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-[24px] bg-gradient-to-r from-teal-50 to-sky-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 via-sky-500 to-fuchsia-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
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
                                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                                    message.sender === "user"
                                        ? "bg-gradient-to-r from-teal-400 via-sky-500 to-fuchsia-500 text-white rounded-br-sm"
                                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                }`}
                            >
                                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">
                                    {message.text}
                                </p>
                                <span
                                    className={`text-xs mt-1 block ${
                                        message.sender === "user" ? "text-white/70" : "text-gray-500"
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
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Tapez votre message..."
                            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={inputValue.trim().length === 0}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                                inputValue.trim().length === 0
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : "bg-gradient-to-r from-teal-400 via-sky-500 to-fuchsia-500 hover:scale-105 active:scale-95"
                            }`}
                            aria-label="Envoyer"
                        >
                            {inputValue.trim().length === 0 ? (
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

