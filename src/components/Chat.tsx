import { useState } from "react";

function Chat() {
  const [inputValue, setInputValue] =  useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  const sendMessage = () => {
    const APIKey = process.env.OPENAI_API_KEY;
    if (!inputValue) return;
    setIsLoading(true);

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + APIKey,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: inputValue,
        max_tokens: 2048,
        temperature: 0.5, 
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error?.message) {
          setResponse(`Error: ${json.error.message}`);
        } else if (json.choices?.[0].text) {
          setResponse("Chat GPT: " + json.choices[0].text || "No response");
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setInputValue('');
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col items-center h-screen mt-[3.5vh]">
      <div>
        <textarea 
          className="resize-none w-[70vw] h-[70vh]" 
          cols={70}
          disabled 
          placeholder="Response"
          value={response}
        >
        </textarea>
      </div>

      <div className="flex space-x-1">
        <input
          className="w-[65.9vw] bg-green-200 p-[1rem]"
          type="text"
          id="user-input"
          placeholder="Type your message.."
          onChange={handleChange}
          value={inputValue}
        />
        <button className="bg-blue-200 p-[1rem]" onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    
    </div>
  );
}

export default Chat;
