import { useState } from "react";
import { AiOutlineSend } from 'react-icons/ai';

function Chat() {
  const [inputValue, setInputValue] =  useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  const sendMessage = () => {
    const APIKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!inputValue) {
      alert('Write a message...');
      return;
    }
    
    setIsLoading(true);

    const context = "Reply to me as a fun manga and anime recommender based on my personal tastes that gives short answers."; 
    const fullPrompt = context + inputValue;

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIKey,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: fullPrompt,
        max_tokens: 2048,
        temperature: 0.5, 
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error?.message) {
          setResponse(`Error: ${json.error.message}`);
        } else if (json.choices?.[0].text) {
          setResponse((prevResponse) => `${prevResponse}\n🦊 Me: ${inputValue}\n\n🍥 MangaAI: ${json.choices[0].text}\n` || "MangaAI developers are busy watching anime right no- they are doing server maintenance now hahaha. Please wait or refresh the page.");
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setInputValue('');
        setIsLoading(false);
      });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  }
  
  return (
    <div className="flex flex-col items-center h-auto mt-[2vh]">
      <div>
        <textarea 
          className="resize-none lg:w-[70vw] xx:w-[88vw] h-[65vh] bg-slate-950 opacity-[0.8] rounded-lg p-[1rem] shadow-md text-white lg:text-xl" 
          cols={70}
          disabled 
          placeholder="🍜 Tell me about your tastes..."
          value={response}
        />
      </div>

      <div className="flex space-x-2 lg:w-[70vw]">
        <input
          className="lg:w-[65.9vw] xx:w-[75vw] md:w-[81vw] p-[1rem] rounded-lg border-solid border-x-[3px] border-y-[3px] outline-none shadow-sm"
          type="text"
          id="user-input"
          placeholder="Type your message.."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          disabled={isLoading}
        />
        <button 
          className="p-[1rem] bg-green-400 lg:text-3xl rounded-lg text-gray-600 hover:bg-green-500 shadow-md" 
          onClick={sendMessage} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : <AiOutlineSend />}
        </button>
      </div>
    </div>
  );
}

export default Chat;