import React from 'react';

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <header className="bg-slate-950 mt-2 w-full p-4">
                <h1 className="text-white text-2xl text-center">Page Not Available</h1>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <p className="text-gray-400 mt-8">The page you are looking for does not exist.</p>
            </main>
            
        </div>
    );
}

export default NotFound;
