import React from 'react';

const Loader = ({ fullScreen = true }) => {
    const loaderClasses = fullScreen ? 'h-screen' : 'h-full';

    return (
        <div className={`flex bg-black items-center justify-center ${loaderClasses}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
};

export default Loader;
