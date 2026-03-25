# AI Gym Website with AI Fitness Coach

A premium, modern AI Gym Website built with **Next.js 15**, **Tailwind CSS**, and **OpenAI**. This project features a high-end dark luxury theme and an intelligent chatbot that captures leads and generates personalized workout and diet plans.

## 🚀 Features

- **Dark Luxury UI**: Modern aesthetic with glassmorphism, smooth animations, and responsive design.
- **AI Fitness Coach**: Integrated with OpenAI's `gpt-4o-mini` to provide:
  - Personalized weekly workout plans.
  - Simple Indian diet suggestions.
  - Goal-based fitness tips.
- **Lead Generation System**:
  - Automatically captures user's **Name** and **WhatsApp Number** before providing AI plans.
  - Stores leads locally in `leads.json` for business tracking.
- **WhatsApp Integration**: Users can instantly get their generated plans sent to their WhatsApp with a single click.
- **Interactive Chat UI**: Floating chat bubble with typing animations, quick suggestion buttons, and auto-scroll.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [OpenAI SDK](https://platform.openai.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sakshamtikekar19/AI-chatbot-gym.git
cd AI-chatbot-gym
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/page.js`: Premium landing page UI.
- `src/components/Chatbot.js`: Advanced chatbot component with lead capture logic.
- `src/app/api/chat/route.js`: OpenAI integration backend.
- `src/app/api/lead/route.js`: Lead storage logic (saves to `leads.json`).
- `leads.json`: Local storage for captured user leads.

## 📄 License

This project is licensed under the MIT License.
