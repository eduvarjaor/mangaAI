import Chat from "./Chat";

function App() {
  return (
    <div className="font-poppins">
      <div className="flex flex-col items-center mt-[6vh] text-white text">
        <h1 className="lg:text-5xl font-bold xx:text-4xl">MangaAI</h1>
        <h3 className="lg:text-lg mt-[2vh] xx:text-sm xx:text-center xx:p-[0.2rem]">Let AI discover new mangas and animes for you based on your preferences</h3>
      </div>
      <Chat />
    </div>
  );
}

export default App;
