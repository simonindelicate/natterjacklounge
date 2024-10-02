import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as React from 'react';
import PasswordInput from '@/components/PasswordInput';



export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);


const [hasScrolled, setHasScrolled] = useState(false);

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
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
            content: chunkValue
          }
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);


const handleReset = () => {
  setMessages([
    {
      role: "assistant",
      content: `Hello again, old friend, what can I get you?.`,
    },
  ]);
  setTimer(0);
  if (intervalId) clearInterval(intervalId);
  const interval = setInterval(() => {
    setTimer((prevTimer) => prevTimer + 10);
  }, 10);
  setIntervalId(interval);
  setBotSaidGingerbread(false);
};

const handlePasswordChange = (password: string) => {
  console.log(`The user entered password: ${password}`);
  if (password === 'gingerbread') {
    if (intervalId) clearInterval(intervalId);
//    alert(`The user entered the password gingerbread in ${formatTime(timer)}`);
  }
};

const [whatBotSaid, setWhatBotSaid] = useState<string | null>(null);

const handleWhatBotSaidChange = (whatBotSaid: string) => {
  setWhatBotSaid(whatBotSaid);
};

const formatTime = (timeInMilliseconds: number) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const tenthsOfSeconds = Math.floor((timeInMilliseconds % 1000) / 100);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedTenthsOfSeconds = tenthsOfSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedTenthsOfSeconds}`;
};

const [botSaidGingerbread, setBotSaidGingerbread] = useState(false);

const handleBotSaidGingerbread = () => {
  setBotSaidGingerbread(true);
};

function getPageLink(whatBotSaid: string): string {
  if (whatBotSaid === "Manhattan") {
    return "/manhattan.html";
  } else if (whatBotSaid === "Mint Julep") {
    return "/julep.html";
  } else if (whatBotSaid === "Old Fashioned") {
    return "/fashioned.html";
  } else if (whatBotSaid === "Kentucky Buck") {
    return "/buck.html";
  } else if (whatBotSaid === "Hot Toddy") {
    return "/toddy.html";
  } else if (whatBotSaid === "Whiskey Sour") {
    return "/sour.html";
  } else if (whatBotSaid === "Walk a Mile in My Stilettos") {
    return "/stilettos.html";
  } else if (whatBotSaid === "Disagree to Agree") {
    return "/disagree.html";
  } else if (whatBotSaid === "Common Ground") {
    return "/common.html";
  } else if (whatBotSaid === "Noble Embrace") {
    return "/noble.html";
  } else if (whatBotSaid === "GT Bliss Punch") {
    return "/GTbliss.html";
  } else if (whatBotSaid === "GT Manhattan") {
    return "/GTManhattan.html";
  } else if (whatBotSaid === "GT Maple Hot Toddy") {
    return "/GTMapleHot.html";
  } else if (whatBotSaid === "Troublemaker Sour") {
    return "/TroublemakerSour.html";
  } else if (whatBotSaid === "GT Fig & Rosemary Smash") {
    return "/GTFig.html";
  } else if (whatBotSaid === "GT Not Old Fashioned") {
    return "/GTNotOld.html";
  } else if (whatBotSaid === "Cha-Infused GT Martini") {
    return "/Chai.html";
  } else if (whatBotSaid === "Spiced Cranberry GT Punch") {
    return "/Spiced.html";
  } else if (whatBotSaid === "GT Gingerbread Flip") {
    return "/Gingerbread.html";
  } else if (whatBotSaid === "GT Smoked Maple Fizz") {
    return "/GTMapleFizz.html";
  } else if (whatBotSaid === "GT Highball") {
    return "/GThighball.html";
  } else {
    // Default link if no match is found
    return "/default";
  }
}


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
        content: `Welcome to the starlight lounge where we know the drinks you're looking for! How are you feeling today?`
      }
    ]);
  }, []);

  return (
    <>
      <Head>

        <title>The Starlight lounge</title>
        <meta
          name="description"
          content="Pull up a stool."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
<meta property="og:title" content="The Good Trouble Cocktail Lounge" />
<meta property="og:description" content="A prototype chatbot." />
<meta property="og:image" content="https://barkeep-prototype.vercel.app/images/de1.png" />
<meta property="og:site_name" content="The Good Trouble Cocktail Lounge" />

        <link
          rel="icon"
          href="/favicon.ico"
        />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col h-screen">

       <Navbar timer={timer} formatTime={formatTime} />



        <div className="flex flex-row overflow-auto sm:px-10 pb-4 sm:pb-10 chat-div">

      <div className="sloth">

      <img src="images/logo300.png" />
      </div>


          <div className="chat-box">



      


    <Chat
      messages={messages}
      loading={loading}
      onSend={handleSend}
      onReset={handleReset}
      onPasswordChange={handlePasswordChange}
      onBotSaidGingerbread={handleBotSaidGingerbread}
        onWhatBotSaidChange={handleWhatBotSaidChange}
    />
            <div ref={messagesEndRef} />


          </div>
{botSaidGingerbread && whatBotSaid !== null && (
  <div className="congrats">
    See How To Make a{" "}
    <a
      href="#"
      onClick={() =>
        window.open(
          getPageLink(whatBotSaid),
          "popup",
          "width=600,height=600,left=50,top=50"
        )
      }
    >
      {whatBotSaid}
    </a>
  </div>
)}






        </div>

        <Footer />
      </div>
    </>
  );
}
