import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";

function Chat() {
  return (
    <div className="flex flex-col items-center h-screen mt-[3.5vh]">
      <div className="bg-amber-200 w-[70vw]">
        <ChatArea />
        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
