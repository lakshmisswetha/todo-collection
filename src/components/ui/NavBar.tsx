import React from "react";
import ToggleThemeBtn from "./ToggleThemeBtn";

const NavBar = () => {
    return (
        <div
            className="flex justify-between py-4 px-14 sticky top-0 z-10 backdrop:blur-[10px] bg-[#FFFFFFCC] dark:bg-[#0000007D] "
            style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
            }}
        >
            <h1 className="font-semibold text-2xl">Todo Collections</h1>

            <ToggleThemeBtn />
        </div>
    );
};

export default NavBar;
