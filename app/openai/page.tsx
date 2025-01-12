"use client";

import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm gửi tin nhắn
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input }; // Tin nhắn từ người dùng
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Xóa nội dung trong ô nhập
    setLoading(true); // Hiển thị trạng thái đang tải

    try {
      // Gửi tới API OpenAI
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      const botMessage = { role: "assistant", content: data.result }; // Tin nhắn từ bot
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Tắt trạng thái đang tải
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ChatGPT Clone</h1>
        <button className="bg-gray-200 px-4 py-2 rounded">Toggle Theme</button>
      </header>

      {/* Message Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <img
                src="/bot-avatar.png"
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } p-3 rounded-lg max-w-md`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <img
                src="/user-avatar.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-300 text-black p-3 rounded-lg max-w-md">
              Đang soạn câu trả lời...
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white shadow">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Gửi
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
