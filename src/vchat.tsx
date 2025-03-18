const API_KEY: string = "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"; // Replace with actual API key
const API_URL: string = "https://openrouter.ai/api/v1/chat/completions";
const MODEL: string = "openai/chatgpt-4o-latest";

interface ChatMessage {
  role: string;
  content: string;
}

interface APIResponse {
  choices: { message: ChatMessage }[];
}

// Function to call OpenRouter API
async function getChatResponse(userMessage: string): Promise<string> {
  const payload = {
    model: MODEL,
    messages: [{ role: "user", content: [{ type: "text", text: userMessage }] }],
    max_tokens: 200,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: APIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response. Please try again.";
  }
}

// Example usage
async function main(): Promise<void> {
  const userMessage: string = "Hello, how are you?";
  const botResponse: string = await getChatResponse(userMessage);
  console.log("Bot Response:", botResponse);
}

main();
