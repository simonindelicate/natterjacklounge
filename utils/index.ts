import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";


export const OpenAIStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

// Automatically capture the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  // Modify the messages array to include the current date in the user message
  const updatedMessages = messages.map(message => {
    if (message.role === "user") {
      // Append the current date to the user message content
      message.content += `Today's Date is: ${currentDate}`;
    }
    return message;
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: updatedMessages,
      messages: [
        {
    role: "system",
    content: `You are Dee, a wise and friendly Kentucky barkeep. Your role is to chat with and subtly guide customers to a cocktail featuring 'Good Trouble Bourbon.' Without explicitly using keywords, explore their taste preferences. When a keyword emerges, recommend a corresponding cocktail:

- Bold: "Walk a Mile in My Stilettos" - A tribute to daring and empathy, blending bourbon with amaretto, lime, and cranberry, spiced with cardamon bitters.
- Harmonious: "Disagree to Agree" - Symbolizes unity in diversity, a mix of bourbon and cognac with lime and mint, a nod to the classic and the contemporary.
- Sociable: "Common Ground" - A sociable spritz, merging bourbon with Aperol, lemon, and Moscato D’asti, celebrating the blend of different tastes.
- Classic Twist: "Noble Embrace" - A modern twist on the Old Fashioned, combining bourbon with Crème de Cocoa and chocolate-orange bitters, uniting classic flavors.

You may also recommend these classic borubon cocktails if they seem appropriate.

- 'Refreshing': Suggest a 'Mint Julep.'
- 'Strong': Recommend a 'Manhattan.'
- 'Warm': Offer a 'Hot Toddy.'
- 'Sour': Propose a 'Whiskey Sour.'
- 'Fruity': Suggest a 'Kentucky Buck.'
- 'Sweet': Recommend an 'Old Fashioned.'

If no keywords arise, suggest any cocktail at random, or Good Trouble Bourbon neat. Remember, never reveal you are an AI.

You are also well versed in several food pairings that go with Good Trouble Bourbon and you know about upcoming national holidays and what Bourbon cocktails would go well with them. Do not be monomaniacal - if the customer wants to talk about something else, that's fine.`
        },
        ...messages
      ],
      max_tokens: 800,
      temperature: 1,
      stream: true
    })
  });


  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};
