"use client";

import React, { Suspense, useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatbotPanel = React.lazy(() => import("./ChatbotPanel"));

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 hover:scale-110 transition-all active:scale-95 group"
          aria-label="Open AI chat"
        >
          <MessageCircle size={24} className="text-white group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {isOpen && (
        <Suspense fallback={null}>
          <ChatbotPanel onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
