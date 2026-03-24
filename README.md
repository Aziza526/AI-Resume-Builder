# AI Resume Builder

A full-stack web app that generates a professional resume from your information and uses AI to improve it instantly.

## Features

- Fill in your details and generate a formatted resume in seconds
- Choose between two professional resume designs
- AI-powered improvement using OpenAI GPT to make your resume sound more professional
- Download your resume as a PDF

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI:** OpenAI GPT API
- **PDF Export:** html2pdf.js

## Usage

1. Fill in your full name, email, education, work experience and skills
2. Choose a resume design
3. Click **Build Resume** to generate your resume
4. Click **AI Improve** to let AI enhance the language and formatting
5. Click **Download as PDF** to save your resume

## Security

- User inputs are sanitized to prevent XSS attacks
- API endpoint is rate limited to 10 requests per 15 minutes
- API key is stored securely in environment variables and never exposed to the frontend

## License

MIT
