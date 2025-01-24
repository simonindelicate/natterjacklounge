// components/Chat/ChatMessage.tsx

import { Message } from "@/types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  message: Message;
}

const ChatMessage: FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
          isUser ? "user-color text-black" : "bg-gray-200 text-gray-900"
        }`}
      >
        <ReactMarkdown
          components={{
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                {...props}
                className="text-blue-600 underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    href || "",
                    "popup",
                    "width=600,height=600,left=50,top=50"
                  );
                }}
              >
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
