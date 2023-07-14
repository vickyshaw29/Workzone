'use-client';
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { usePlaygroundStore } from "@/store/PlaygroundStore";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggestion";

const Header = () => {
  const [board,searchText, setSearchText] = usePlaygroundStore(state=>[state.playground,state.searchText, state.setSearchText]);
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string>("")

  useEffect(()=>{
    if(board.columns.size===0)return;
    setLoading(true)
    const fetchSuggestionFunc = async()=> {
      try {
      const suggestion = await fetchSuggestion(board)
      setSuggestion(suggestion)
      setLoading(false)
      } catch (error) {
        setLoading(false)
        // alert(error)
      }
    }
    board.columns && fetchSuggestionFunc()
  },[board])

  return <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/* <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"/> */}
        {/* <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-400 via-pink-400 to-purple-500 rounded-md filter blur-3xl opacity-50 -z-50" /> */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-300 via-pink-200 to-purple-300 rounded-md filter blur-3xl opacity-50 -z-50" />
        <span className="text-5xl font-extrabold text-purple-500 leading-tight tracking-tighter uppercase border-2 border-purple-500 p-2 rounded-full shadow-lg">W</span><span className="text-4xl font-semibold tracking-wide">orkzone</span>
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        {/* searchBox */}
        <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
          <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="text" placeholder="Search" className="flex-1 outline-none p-2"/>
          <button hidden>Search</button>
        </form>
        {/* Avatar */}
        <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://avatars.githubusercontent.com/u/69159515?s=96&v=4" alt="Bordered avatar"/>
      </div>
    </div>
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-bounce"}`}/>
          {
            suggestion && !loading ? suggestion : "GPT is summarising your task for the day "
          }
        </p>
    </div>
  </header>;
};

export default Header;
