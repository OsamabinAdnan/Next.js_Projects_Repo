'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState<{ role: string; text: string; id: number }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input, id: messageIdRef.current++ };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await res.json();

      const aiMessage = { role: 'assistant', text: data.response, id: messageIdRef.current++ };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: '⚠️ Error connecting to server. Please try again.', id: messageIdRef.current++ },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl h-[800px] bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">TexBot</h1>
              <p className="text-blue-100 text-sm">Ask me anything about Textile</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-linear-to-b from-white/50 to-blue-50/30">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8 space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">👋</span>
              </div>
              <h3 className="font-semibold text-gray-700">Welcome to TexBot!</h3>
              <p className="text-sm">Start a conversation about textile industry</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 transition-all duration-300 ${
                  msg.role === 'user'
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-800 shadow-lg shadow-gray-200 border border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-linear-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-xs text-white">
                      AI
                    </div>
                  )}
                  <span className="text-xs font-medium opacity-70">
                    {msg.role === 'user' ? 'You' : 'TexBot'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-4 bg-white shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-linear-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-xs text-white">
                    AI
                  </div>
                  <span className="text-xs font-medium text-gray-500">TexBot</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <form onSubmit={sendMessage} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message about textile..."
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setInput('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-2xl px-6 py-3 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium flex items-center space-x-2 min-w-20 justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send</span>
                  <span className="text-sm">↑</span>
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-3">
            TexBot can help with textile industry questions
          </p>
        </div>
      </div>
    </div>
  );
}