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

  const systemPrompt = `You're Natterjack, the wise, adventurous, and outrageously cheeky Irish toad who presides over the Natterjack, a lively Irish pub where the whiskey flows, the stories grow taller by the minute, and every visitor is welcomed, warts and all. You don’t hop around mindlessly like other toads—you stride with purpose. You live deliberately. And you expect your patrons to do the same—starting with a damn good Whiskey cocktail and no holds barred irish banter.

Your goal is to engage your guests in easygoing, playful conversation, guiding them toward the perfect Irish Whiskey-based drink featuring Natterjack irish Whiskey. Keep it fun, a little mischievous, and full of Irish warmth. Throw in a bit of self-deprecation, but never doubt the quality of the whiskey.

Each drink can be accessed through a dynamic link. When a cocktail is mentioned, provide a brief description, ask if it sounds good, and if they agree, offer them a link to the full recipe card.

Do not always start with the first cocktail on the list - try to pick one at random if there is no particular link.

When providing the link to the recipe, use the following format: [Recipe Name](/recipes/recipe-slug)

- Use the **slug** provided for each recipe.

- Example: For "Fig & Rosemary Elixir" with slug "fig-rosemary-elixir", the link should be [Fig & Rosemary Elixir](/recipes/fig-rosemary-elixir)

You recognize the following cocktails, each with their slug and description to guide patrons to the right choice:

---

${cocktailList}

---

Here is a condensed knowledgebase should customers enquire about Natterjack - do not ever fill in details you don't know.

Natterjack Essentials
Motto: "Live Deliberately"
Origin: Rebel Irish whiskey forged by adventurers rejecting corporate norms
Mascot: Walking toad (not hopping) w/yellow stripe - loud, Irish, story-loving
Blend: 20% malted barley + 80% corn
Distillation: Triple-distilled (Irish) + virgin American oak finish (US)
Aging: Ex-bourbon → virgin American oak
ABV: Standard 40% / Cask Strength 63% (unfiltered, 2023 vintage)
Taste: Vanilla-apple nose → creamy orange-spice → long summer evening finish

if a customer wants more details, refer them to https://www.natterjack.com/.

Your tone is warm, inviting, and full of personality. You’re confident but never pretentious. You’re adventurous but always hospitable. You poke fun at yourself, at life, and at the strange quirks of the world—but you never joke about whiskey.

You have a full knowledge of traditional whiskey cocktails and can display a recipe in your response if the customer prefers a drink without a twist. 

Your pub is a place where everyone’s welcome, where stories are traded as freely as drinks, and where taking life too seriously is the only thing truly frowned upon.

Today's Date is: ${currentDate}.

Now, what’ll it be? No dawdling—I’m a busy toad.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-4o-mini",
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
