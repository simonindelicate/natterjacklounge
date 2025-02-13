import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as React from 'react';
import { recipes } from "@/data/recipes"; // Import the recipes data

type Recipe = {
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  method: string;
  garnish?: string;
  glassware?: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: chunkValue,
          },
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hello again, old friend, what can I get you?`,
      },
    ]);
    setTimer(0);
    if (intervalId) clearInterval(intervalId);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);
    setIntervalId(interval);
  };

  // Format the time function
  const formatTime = (timeInMilliseconds: number) => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const tenthsOfSeconds = Math.floor((timeInMilliseconds % 1000) / 100);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedTenthsOfSeconds = tenthsOfSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedTenthsOfSeconds}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hasScrolled) {
      scrollToBottom();
    }
  }, [messages, hasScrolled]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Welcome to the Natterjack - the Irish pub where all are welcome to take a seat by the fire and chat with me - the amphibian barkeep with a genius for mixology and an encyclopaedic knowledge of how to mix up a Natterjack cocktail. How are you today?`,
      },
    ]);
  }, []);

  return (
    <>
<Head>
  <title>The Natterjack Pub - A Chatbot-Driven Irish Cocktail Lounge</title>
  <meta name="description" content="Step into The Natterjack Pub, the AI-powered Irish cocktail lounge where the amphibian barkeep serves up conversation and expert mixology. Pull up a stool and chat." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="The Natterjack Pub - AI-Powered Cocktail Lounge" />
  <meta property="og:description" content="Step into The Natterjack Pub, an AI-driven Irish cocktail experience where a toad barkeep mixes up drinks and banter. Pull up a stool and join the chat." />
  <meta property="og:image" content="https://www.natterjackcocktails.com/images/TOAD_BARKEEP.png" />
  <meta property="og:url" content="https://www.natterjackcocktails.com" />
  <meta property="og:site_name" content="The Natterjack Pub" />

  {/* Twitter / X */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="The Natterjack Pub - AI-Powered Cocktail Lounge" />
  <meta name="twitter:description" content="An AI-driven Irish pub where a toad barkeep mixes up conversation and cocktails. Step in, pull up a stool, and chat." />
  <meta name="twitter:image" content="https://www.natterjackcocktails.com/images/TOAD_BARKEEP.png" />
  <meta name="twitter:site" content="@YourBrandHandle" />

  {/* SEO Keywords */}
  <meta name="keywords" content="Irish pub, AI chatbot, virtual bartender, mixology, whiskey cocktails, Irish whiskey, Natterjack Cocktails, cocktail lounge, AI-powered experience, interactive chatbot" />
  <meta name="author" content="Natterjack Cocktails" />

  {/* Favicon */}
  <link rel="icon" href="/favicon.ico" />
</Head>


      <div className="flex flex-col h-screen">
        <Navbar timer={timer} formatTime={formatTime} />

        <div className="flex flex-row overflow-auto sm:px-10 pb-4 sm:pb-10 chat-div">
          <div className="sloth">
            <img src="images/TOAD_BARKEEP.png" />
          </div>

          <div className="chat-box">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
