function ChatInput() {
    return ( 
        <div>
            <input
            className="w-[70vw] h-[5vh] bg-amber-100"
            type="text"
            id="user-input"
            placeholder="Type your message..."
            // onChange={handleChange}
            // value={inputValue}
            />
        </div>
     );
}

export default ChatInput;