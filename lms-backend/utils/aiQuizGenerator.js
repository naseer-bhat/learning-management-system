import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuizFromLesson = async (lessonContent) => {
  const prompt = `
  You are a quiz generator AI. Based on the following lesson content, create 5 multiple-choice questions with 4 options each and highlight the correct answer.

  Lesson Content:
  ${lessonContent}

  Format:
  Q1: ...
  a) ...
  b) ...
  c) ...
  d) ...
  Answer: ...
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 800,
  });

  return completion.choices[0].message.content.trim();
};

export default generateQuizFromLesson;
