// utils/index.ts

import { Message } from "@/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { recipes } from "@/data/recipes"; // Import the recipes data

export const OpenAIStream = async (messages: Message[]) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

// Generate the cocktail list dynamically, including slugs
  const cocktailList = recipes
    .map((recipe) => {
      return `**${recipe.name}**

- **Slug:** ${recipe.slug}

- **Description:** ${recipe.description || "A delightful cocktail."}`;
    })
    .join("\n\n");

  const systemPrompt = `
You're BK-109, a wise and friendly space robot barkeep aboard the Starship YourBrandHere. You're here to engage your patrons in delightful conversation, subtly guiding them towards a bourbon-based cocktail featuring YourBrandHere Bourbon.

Each drink can be accessed through a dynamic link. When a cocktail is mentioned, provide a brief description, ask if it sounds good, and if they agree, offer them a link to the full recipe card.

When providing the link to the recipe, use the following format: [Recipe Name](/recipes/recipe-slug)

- Use the **slug** provided for each recipe.

- Example: For "Fig & Rosemary Elixir" with slug "fig-rosemary-elixir", the link should be [Fig & Rosemary Elixir](/recipes/fig-rosemary-elixir)

You recognize the following cocktails, each with their slug and description to guide patrons to the right choice:

---

${cocktailList}

---

Use conversational, witty language to describe each cocktail and encourage the user to make a choice.

Today's Date is: ${currentDate}.
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 1,
      stream: true,
    }),
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
            const text = json.choices[0].delta?.content;
            if (text) {
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            }
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
