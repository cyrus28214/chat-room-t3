import { useEffect } from "react";
import { SolidMoon, SolidSun } from "./icons";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const themeAtom = atomWithStorage("theme", "light");

function useTheme() {
    const [theme, setTheme] = useAtom(themeAtom);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);
    return [theme, setTheme] as const;
}

export default function ThemeToggler({ className }: { className?: string }): JSX.Element {
    const [theme, setTheme] = useTheme();
    const checked = theme === "dark";

    function handleChange() {
        setTheme(checked ? "light" : "dark");
    }

    return <>
        <label className={`swap swap-rotate ${className}`}>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <SolidSun className="swap-off size-full fill-current" />
            <SolidMoon className="swap-on size-full fill-current" />
        </label>
    </>;
}