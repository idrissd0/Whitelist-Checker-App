import React from 'react'
import { BsDiscord } from 'react-icons/bs'

export default function Login() {
    return (
        <div className="h-screen flex items-center justify-center flex-col bg-gray-800 text-white">
            <h3>Welcome to Whiteist Dashboard</h3>
            <p>Please login using your credentials below: </p>
            <a
                href="https://discord.com/api/oauth2/authorize?client_id=1172086920940093450&redirect_uri=http%3A%2F%2Flocalhost%3A3020%2Fauth%2Fdiscord&response_type=code&scope=identify"
                className="flex items-center bg-indigo-600 outline-none p-3 border-none rounded-lg text-xl mt-5 cursor-pointer no-underline text-white gap-2 hover:no-underline"
            >
                Login With Discord
                <BsDiscord />
            </a>
        </div>
    )
}
