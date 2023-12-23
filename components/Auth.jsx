"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
    return <button
        className="inline-block py-3 px-6 rounded-md font-bold text-2xl text-blue-200 bg-slate-800"
        onClick={() => signIn()}>👻</button>
}

export const LogoutButton = ({ name }) => {
    return <button
        className="flex items-center gap-2 py-3 px-6 rounded-md font-bold text-2xl text-gray-400 bg-slate-900"
        onClick={() => signOut()}> <span className="text-sm">{name}</span>  <span>😀</span></button>
}