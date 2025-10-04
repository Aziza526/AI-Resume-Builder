const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// OpenAI setup
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve only public folder

// AI Improve endpoint
app.post("/api/ai-improve", async (req, res) => {
  try {
    const { name, email, education, workExperience, skills } = req.body;

    // Instruction for ChatGPT
    const prompt = `
        You are a professional resume writer. Output ONLY an HTML fragment (no <html>, <head>, or <body> tags).
Do NOT include <style> tags or inline style="" attributes.
Use only semantic HTML and the following class names EXACTLY where appropriate:
  - resume
  - resume-header
  - name
  - contact
  - section
  - section-title
  - section-item
  - skills-list
  - skill-item

Fill in missing fields, make the language professional and concise. Output only the HTML fragment.
Resume data:
Name: ${name || ""}
Email: ${email || ""}
Education: ${education || ""}
Work Experience: ${workExperience || ""}
Skills: ${skills || ""}

      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const improvedResume = response.choices[0].message.content;

    res.json({ improvedResume });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to improve resume" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
