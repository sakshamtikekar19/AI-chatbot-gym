"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Dumbbell, Utensils, Zap, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! I'm your AI Fitness Coach. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Lead Capture State
  const [leadData, setLeadData] = useState({
    captured: false,
    step: "name", // "name" | "phone" | "done"
    name: "",
    phone: "",
    originalQuery: ""
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveLeadToBackend = async (name, phone) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
    } catch (error) {
      console.error("Failed to save lead:", error);
    }
  };

  const callAI = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { 
          role: "ai", 
          content: data.response,
          showWhatsApp: true 
        }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error connecting to the AI coach." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (text) => {
    const messageToSend = typeof text === 'string' ? text : input;
    if (!messageToSend.trim() || isLoading) return;

    // Add user message to UI
    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Lead Capture Logic
    if (!leadData.captured) {
      if (leadData.step === "name") {
        // First message was the query, now asking for name
        if (!leadData.originalQuery) {
          setLeadData(prev => ({ ...prev, originalQuery: messageToSend, step: "name" }));
          setMessages(prev => [...prev, { role: "ai", content: "Before I create your personalized plan, can I get your name?" }]);
        } else {
          // User just provided their name
          setLeadData(prev => ({ ...prev, name: messageToSend, step: "phone" }));
          setMessages(prev => [...prev, { role: "ai", content: `Great ${messageToSend}! Please enter your WhatsApp number.` }]);
        }
      } else if (leadData.step === "phone") {
        // User just provided their phone
        const finalName = leadData.name;
        const finalPhone = messageToSend;
        
        setLeadData(prev => ({ ...prev, phone: finalPhone, captured: true, step: "done" }));
        setMessages(prev => [...prev, { role: "ai", content: "Thanks! Creating your personalized plan now... We'll send it on WhatsApp too! 🚀" }]);
        
        // Save lead and then call AI
        saveLeadToBackend(finalName, finalPhone);
        callAI(leadData.originalQuery);
      }
      return;
    }

    // Normal AI Flow (after lead is captured)
    callAI(messageToSend);
  };

  const suggestions = [
    { label: "Fat Loss Plan", icon: <Zap size={14} /> },
    { label: "Muscle Gain Plan", icon: <Dumbbell size={14} /> },
    { label: "Diet Plan", icon: <Utensils size={14} /> },
  ];

  const handleWhatsAppShare = (content) => {
    const text = encodeURIComponent(`My AI Fitness Plan:\n\n${content}`);
    window.open(`https://wa.me/${leadData.phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass w-[calc(100vw-2rem)] max-w-[360px] sm:max-w-[400px] h-[75vh] max-h-[560px] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Dumbbell size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Fitness Coach</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                      msg.role === "user"
                        ? "bg-red-600 text-white rounded-tr-none"
                        : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.showWhatsApp && (
                    <button
                      onClick={() => handleWhatsAppShare(msg.content)}
                      className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600/20 border border-green-600/30 text-green-400 text-xs font-bold hover:bg-green-600 hover:text-white transition-all"
                    >
                      <Phone size={12} />
                      Get this plan on WhatsApp
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSend(s.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {s.icon}
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type={leadData.step === "phone" && !leadData.captured ? "tel" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    !leadData.originalQuery 
                      ? "Tell me your goal (fat loss, muscle gain...)" 
                      : leadData.step === "name" 
                        ? "Enter your name..." 
                        : "Enter your WhatsApp number..."
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-red-600/50 transition-colors placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white disabled:opacity-50 disabled:bg-gray-700 transition-all hover:bg-red-700"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[10px] text-gray-500 mt-2 text-center">
                {!leadData.captured ? "We'll send your plan on WhatsApp too" : "Lead captured securely"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 hover:scale-110 transition-all active:scale-95 group"
          aria-label="Open AI chat"
        >
          <MessageCircle size={24} className="text-white group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}
