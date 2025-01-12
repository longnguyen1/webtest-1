import { db } from "@/lib/db";

// Hàm lưu tin nhắn vào cơ sở dữ liệu
export const saveMessage = async (prompt: string, response: string, tokensUsed: number) => {
  try {
    await db.execute('INSERT INTO messages (prompt, response, tokens_used) VALUES (?, ?, ?)', [prompt, response, tokensUsed]);
    console.log('Message saved successfully!');
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};
