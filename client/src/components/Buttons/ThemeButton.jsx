import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeButton = () => {
   const { resolvedTheme, setTheme } = useTheme();

   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <button
         className="flex items-center justify-center rounded-full p-2.5 hover:bg-primary/20 dark:hover:bg-primary/20"
         onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
         {resolvedTheme === "dark" ? (
            <SunIcon className="h-5 w-5 text-orange-300" />
         ) : (
            <MoonIcon className="h-5 w-5 text-gray-700" />
         )}
      </button>
   );
};

export default ThemeButton;
