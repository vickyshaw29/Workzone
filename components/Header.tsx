'use-client';
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Header = () => {
  return <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
      <Image
        src="https://links.papareact.com/c2cdd5"
        alt="Logo"
        height={100}
        width={300}
        className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
      />
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        {/* searchBox */}
        <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
          <input type="text" placeholder="Search" className="flex-1 outline-none p-2"/>
          <button hidden>Search</button>
        </form>
        {/* Avatar */}
        <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://avatars.githubusercontent.com/u/69159515?s=96&v=4" alt="Bordered avatar"/>

      </div>
    </div>
  </header>;
};

export default Header;
