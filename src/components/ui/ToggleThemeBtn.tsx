import React from "react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeProvider";

const ToggleThemeBtn: React.FC = () => {
    const { setTheme, theme } = useTheme();
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const mode = theme === "system" ? systemTheme : theme;

    return (
        <button
            onClick={() => {
                setTheme(mode === "dark" ? "light" : "dark");
            }}
        >
            {mode === "dark" ? <FiSun /> : <FaMoon />}
        </button>
    );
};

export default ToggleThemeBtn;
