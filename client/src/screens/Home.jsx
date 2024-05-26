// src/components/Home.js
import React from 'react';

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="bg-blue-600 w-full p-4">
                <h1 className="text-white text-2xl text-center">User Management</h1>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome to the User Management System</h2>
                    <p className="text-gray-700 mb-6">Manage your users efficiently and effectively.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300">
                            <h3 className="text-lg font-semibold mb-2">Add User</h3>
                            <p className="text-sm">Create a new user account.</p>
                        </div>
                        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-400 transition duration-300">
                            <h3 className="text-lg font-semibold mb-2">View Users</h3>
                            <p className="text-sm">Browse the list of users.</p>
                        </div>
                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
                            <h3 className="text-lg font-semibold mb-2">Edit User</h3>
                            <p className="text-sm">Modify existing user information.</p>
                        </div>
                        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:bg-red-400 transition duration-300">
                            <h3 className="text-lg font-semibold mb-2">Delete User</h3>
                            <p className="text-sm">Remove a user from the system.</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 w-full p-4 mt-4">
                <p className="text-white text-center text-sm">© 2024 User Management. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
