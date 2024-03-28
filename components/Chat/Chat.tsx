import { Message } from "@/types";
import { FC, useState, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  onPasswordChange: (password: string) => void;
  onBotSaidGingerbread: () => void;
  onWhatBotSaidChange: (whatBotSaid: string) => void;
}

export const Chat: FC<Props> = ({
  messages,
  loading,
  onSend,
  onReset,
  onPasswordChange,
  onBotSaidGingerbread,
  onWhatBotSaidChange,
}) => {
  const [hasPrintedYay, setHasPrintedYay] = useState(false);
  const stringsToCheck = [
    "Manhattan",
    "Mint Julep",
    "Old Fashioned",
    "Kentucky Buck",
    "Whiskey Sour",
    "Hot Toddy",
    "Walk a Mile in My Stilettos",
    "Noble Embrace",
    "Common Ground",
    "Disagree to Agree",
    "manhattan",
    "mint julep",
    "old fashioned",
    "kentucky Buck",
    "whiskey Sour",
    "hot toddy",
    "walk a mile in my stilettos",
    "noble embrace",
    "common ground",
    "disagree to agree",
  ];
  const [whatBotSaid, setWhatBotSaid] = useState<string | null>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      const foundString = stringsToCheck.find((string) =>
        lastMessage.content.includes(string)
      );
      if (foundString) {
        // The response message from the API contains one of the specified strings
        console.log("yay");
        setHasPrintedYay(true);
        onPasswordChange("gingerbread");
        onBotSaidGingerbread();
        setWhatBotSaid(foundString);
        onWhatBotSaidChange(foundString);
      }
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300 chat-window">
        {messages.map((message, index) => {
          const containsString =
            message.role === "assistant" &&
            stringsToCheck.some((string) => message.content.includes(string));
          return (
            <div key={index} className="my-1 sm:my-1.5">
              <ChatMessage
                message={message}
                containsGingerbread={containsString}
              />
            </div>
          );
        })}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>
    </>
  );
};