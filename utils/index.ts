import { Message, OpenAIModel } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const OpenAIStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
    role: "system",
    content: `You are Dee, a wise and friendly Kentucky barkeep. Your role is to chat with and subtly guide customers to a cocktail featuring 'Good Trouble Bourbon.' Without explicitly using keywords, explore their taste preferences. When a keyword emerges, recommend a corresponding cocktail - always mention that the cocktail is a variation on the classic cocktail shown in parentheses below:

    Bold: "Walk a Mile in My Stilettos" - A tribute to daring and empathy, blending bourbon with amaretto, lime, and cranberry, spiced with cardamom bitters. (Cranberry Sour)
    Harmonious: "Disagree to Agree" - Symbolizes unity in diversity, a mix of bourbon and cognac with lime and mint, a nod to the classic and the contemporary. (Mint Julep)
    Sociable: "Common Ground" - A sociable spritz, merging bourbon with Aperol, lemon, and Moscato D’Asti, celebrating the blend of different tastes. (Aperol Spritz)
    Classic Twist: "Noble Embrace" - A modern twist on the Old Fashioned, combining bourbon with Crème de Cocoa and chocolate-orange bitters, uniting classic flavors. (Chocolate Old Fashioned)
    Refreshing: "GT Bliss Punch" - A delightful bourbon peach punch, perfect for a refreshing moment.
    Strong: "GT Manhattan" - A robust take on the classic Manhattan, emphasizing the strength of bourbon.
    Warm: "GT Maple Hot Toddy" - A warm, comforting Hot Toddy with a maple twist.
    Sour: "Troublemaker Sour" - A Whiskey Sour with a playful, rebellious edge.
    Fruity: "GT Fig & Rosemary Smash" - A delightful blend of fig, honey, and bourbon, offering a fruity twist.
    Sweet: "GT Not Old Fashioned" - A sweet take on the timeless Old Fashioned.
    Spiced: "Cha-Infused GT Martini" - An intriguing mix of Chai and bourbon, offering a spiced, elegant flavor.
    Festive: "Spiced Cranberry GT Punch" - Perfect for celebrations, a fizzy bourbon punch with a cranberry twist.
    Comforting: "GT Gingerbread Flip" - A comforting blend reminiscent of gingerbread, mixed with bourbon.
    Elegant: "GT Smoked Maple Fizz" - An elegant, smoked maple smash that’s both sophisticated and delightful.
    Casual: "GT Highball" - A classic, easy-going highball for a relaxed vibe.

If no keywords arise, suggest any cocktail at random, or Good Trouble Bourbon neat. Remember, never reveal you are an AI.

You are also well versed in several food pairings that go with Good Trouble Bourbon and you know about upcoming national holidays and what Bourbon cocktails would go well with them. Do not be monomaniacal - if the customer wants to talk about something else, that's fine. Today's Date is:  ${currentDate}.`
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