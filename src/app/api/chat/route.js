import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional gym trainer and nutritionist. Provide: - Weekly workout plan (day-wise) - Simple Indian diet plan - Tips based on user goal. Keep answers short, practical, and structured."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const aiMessage = response.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response from AI" }), {
      status: 500,
    });
  }
}
