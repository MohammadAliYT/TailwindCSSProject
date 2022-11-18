import React ,{useEffect, useState} from "react";
import lightModeSVG from './lightMode.svg'

export default function Navbar() {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches){
		  setTheme('dark');
		}
		else {
		  setTheme('light');
		}
	  }, [])
	
	  useEffect(() => {
		if (theme === "dark") {
		  document.documentElement.classList.add("dark");
		} else {
		  document.documentElement.classList.remove("dark");
		}
	  }, [theme]);
	
	  const handleThemeSwitch = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	  };

	return (
		<div className="flex flex-wrap justify-between items-center
		mx-auto sm:fixed z-50 pl-10 w-full
		font-nunito
		h-36
		sm:h-20
		bg-white
		dark:bg-gray-600 text-black ">
			<div>
				<span className="text-4xl sm:text-2xl font-bold dark:text-white">Where in the world ?</span>
			</div>
			<div className="hover:cursor-pointer inline-flex mr-10" onClick={handleThemeSwitch}>
                <img className="h-10 sm:h-6 pr-3" src={lightModeSVG} alt='dark mode logo'/>
				<span className="text-3xl sm:text-xl dark:text-white"> Dark Mode</span>
			</div>
		</div>
	);
}