"use client"
import clsx from "clsx";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { PiSunFill } from "react-icons/pi";
const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();

    const buttonClass = clsx("p-1.5 border rounded-md",
        theme === "light" ?
            //For light Theme
            "border-gray-100 bg-gray-200 text-slate-800" :
            //For Dark Theme
            "bg-gray-800 border-gray-800 text-orange-400")

    return (
        <div className="p-4 flex justify-end">
            <button className={buttonClass} onClick={theme === "light" ? () => setTheme("dark") : () => setTheme("light")}>
                {theme === "light" ? <MdDarkMode fontSize={18} /> : <PiSunFill fontSize={18} />}
            </button>
        </div>
    )
}
export default ThemeSwitcher;