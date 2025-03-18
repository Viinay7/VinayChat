const API_KEY: string = "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"; // Replace with your actual API key
const API_URL: string = "https://openrouter.ai/api/v1/chat/completions";
const MODEL: string = "google/gemma-3-1b-it:free";


interface ChatMessage {
  role: string;
  content: { type: string; text?: string; image_url?: { url: string } }[];
}

interface APIResponse {
  choices: { message: { role: string; content: string } }[];
}

// Function to call OpenRouter API
async function getChatResponse(userMessage: string, imageUrl?: string): Promise<string> {
  const messageContent = [{ type: "text", text: userMessage }];
  
  if (imageUrl) {
    messageContent.push({ type: "image_url", image_url: { url: imageUrl } });
  }

  const payload = {
    model: MODEL,
    messages: [{ role: "user", content: messageContent }],
    max_tokens: 200,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
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
  const userMessage: string = "What is in this image?";
  const imageUrl: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
  
  const botResponse: string = await getChatResponse(userMessage, imageUrl);
  console.log("Bot Response:", botResponse);
}

main();
