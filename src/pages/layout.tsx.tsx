import React from "react";
import NavBar from "../components/ui/NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="w-screen min-h-svh flex flex-col">
            <NavBar />
            <div className="w-full flex justify-center items-center py-4 px-14">
                <div className="flex flex-col items-center w-auto max-w-[800px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
