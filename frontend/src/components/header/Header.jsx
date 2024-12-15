import NavBar from "./NavBar";
import SearchBox from "./SearchBox/SearchBox";

const Header = () => {
  return (
    <div className="fixed top-0 z-50 w-full transition-all duration-300 shadow-lg bg-container backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent">
      <div className="mx-auto flex  max-w-full items-center justify-between px-6 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center space-x-6 lg:space-x-8">
          <a href="/" className="">
            <img
              src="https://divinityoriginalsin2.wiki.fextralife.com/file/Divinity-Original-Sin-2/sir-lora-gallery-npc-divinity2-wiki-guide.jpg"
              className="w-30 h-20 p-2 rounded-xl "
            />
          </a>
          <h1 className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent relative z-10">
            Lora&apos;s movies
          </h1>
        </div>
        <NavBar />
        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
