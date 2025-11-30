import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import z from "zod";


dotenv.config();

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.OPENAI_API_KEY,
});


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const chatSchema = z.object({
  prompt: z.string()
    .trim()
    .min(1, "Prompt cannot be empty")
    .max(1000, "Prompt is too long"),
  conversationId: z.string().optional(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
  const validation = chatSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { prompt } = req.body;
  try {
    const chatCompletion = await client.chat.completions.create({
	model: "openai/gpt-oss-20b:groq",
    messages: [
        {
            role: "user",
        content: prompt,
        },
      ],  
    
    })
    
    res.json(chatCompletion.choices[0]?.message);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
    
});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});