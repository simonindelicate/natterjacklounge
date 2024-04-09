import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
  containsGingerbread?: boolean;
}

export const ChatMessage: FC<Props> = ({ message, containsGingerbread }) => {
  // Function to get the page link
  const getPageLink = (whatBotSaid: string): string => {
    switch (whatBotSaid.toLowerCase()) { // Using toLowerCase for case-insensitive matching
      case "manhattan":
        return "/manhattan.html";
      case "mint julep":
        return "/julep.html";
      case "old fashioned":
        return "/fashioned.html";
      case "kentucky buck":
        return "/buck.html";
      case "hot toddy":
        return "/toddy.html";
      case "whiskey sour":
        return "/sour.html";
      case "walk a mile in my stilettos":
        return "/stilettos.html";
      case "disagree to agree":
        return "/disagree.html";
      case "common ground":
        return "/common.html";
      case "noble embrace":
        return "/noble.html";
      case "gt bliss punch":
        return "/GTbliss.html";
      case "gt manhattan":
        return "/GTManhattan.html";
      case "gt maple hot toddy":
        return "/GTMapleHot.html";
      case "troublemaker sour":
        return "/TroublemakerSour.html";
      case "gt fig & rosemary smash":
        return "/GTFig.html";
      case "gt not old fashioned":
        return "/GTNotOld.html";
      case "chai-infused gt martini":
        return "/Chai.html";
      case "spiced cranberry gt punch":
        return "/Spiced.html";
      case "gt gingerbread flip":
        return "/Gingerbread.html";
      case "gt smoked maple fizz":
        return "/GTMapleFizz.html";
      case "gt highball":
        return "/GThighball.html";
      default:
        return "/default.html";
    }
  };

  // Function to replace cocktail names with links
  const linkifyContent = (content: string): string => {
    const cocktailNames = [
      "Manhattan",
      "Mint Julep",
      "Old Fashioned",
      "Kentucky Buck",
      "Hot Toddy",
      "Whiskey Sour",
      "Disagree to Agree",
      "Walk a Mile in My Stilettos",
      "Common Ground",
      "Noble Embrace",
      "GT Bliss Punch",
      "GT Manhattan",
      "GT Maple Hot Toddy",
      "Troublemaker Sour",
      "GT Fig & Rosemary Smash",
      "GT Not Old Fashioned",
      "Chai-Infused GT Martini",
      "Spiced Cranberry GT Punch",
      "GT Gingerbread Flip",
      "GT Smoked Maple Fizz",
      "GT Highball"
    ];
    let linkedContent = content;

cocktailNames.forEach((name) => {
  const pageLink = getPageLink(name.toLowerCase());
  const regex = new RegExp('\\b' + name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
   console.log(`Linking: ${name}, Regex: ${regex}, Link: ${pageLink}`); // Debug line
  linkedContent = linkedContent.replace(regex, (match) => `<a href="${pageLink}" onclick="event.preventDefault(); window.open('${pageLink}', 'popup', 'width=600,height=600,left=50,top=50');">${match}<svg style="display: inline-block; vertical-align: top; font-size:50%; padding-right:5px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
  );
});


    return linkedContent;
  };

  // Use the linkifyContent function if the message contains a cocktail name
  const content = containsGingerbread ? linkifyContent(message.content) : message.content;

  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div
        className={`rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-zinc-600 text-white"}`}
        style={{ overflowWrap: "anywhere" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
