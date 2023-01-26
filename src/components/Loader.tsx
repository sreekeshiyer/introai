import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-blue-700 rounded-full w-6 h-6 animate-spin animate-ping"></div>
        </div>
    );
};

export default Loader;
