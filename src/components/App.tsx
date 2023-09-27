import Chat from "./Chat";

function App() {
  return (
    <div className="font-poppins">
      <div className="flex flex-col items-center mt-[6vh] text-white text">
        <h1 className="text-5xl font-bold">MangaAI</h1>
        <h3 className="text-lg mt-[2vh]">Let AI discover new mangas and animes for you based on your preferences</h3>
      </div>
      <Chat />
    </div>
  );
}

export default App;
