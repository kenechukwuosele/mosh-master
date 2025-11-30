import express, { type Request,type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => { 
    res.send("hiya");
});

app.get("/api/hello", (req: Request, res: Response) => { 
    res.json({ message: "Hello, World!" });
});

// Added app.listen to make the server actually run
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});