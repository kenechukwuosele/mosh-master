import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('hiya');
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});

const conversations = new Map<string, string[]>();

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, conversationId } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'moonshotai/Kimi-K2-Instruct-0905',
    });

    // Save conversation response ID properly
    conversations.set(conversationId, [
      ...(conversations.get(conversationId) || []),
      completion.id,
    ]);

    const content = completion.choices[0]?.message?.content;

    res.json({
      message: content || 'No response generated',
      id: completion.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during chat completion' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
