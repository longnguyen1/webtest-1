import { NextRequest, NextResponse } from 'next/server';
import { saveMessage } from '@/app/api/lib/saveMessage'; // Import hàm lưu tin nhắn
// Cấu hình OpenAI API với API Key
import OpenAI from 'openai';

// Khởi tạo OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Thay bằng API Key của bạn
});


// Xử lý yêu cầu từ frontend
export async function POST(req: NextRequest) {
    try {
      const { prompt, maxTokens = 150 } = await req.json();
      if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
      }
  
      // Gọi OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Model GPT
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens, // Giới hạn token
      });
  
      const result = response.choices[0]?.message?.content?.trim() || '';
    const tokensUsed = response.usage?.total_tokens || 0; // Số token đã sử dụng
       // Lưu prompt, response và số token vào cơ sở dữ liệu
    await saveMessage(prompt, result, tokensUsed);

    return NextResponse.json({ result, tokensUsed });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
