"use client";

import { useSearchParams } from 'next/navigation'

import { signIn, signOut, useSession } from "next-auth/react";

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

export const GoogleLogin = () => {
    return <button
        // className="flex w-full justify-center mb-5 items-center gap-2 py-3 px-6 rounded-md font-bold text-2xl text-gray-400 bg-slate-900"
        className="flex w-full justify-center mb-5 items-center gap-2 py-3 px-6 rounded-md font-bold text-2xl text-gray-900 bg-slate-500"
        onClick={() => signIn("google")}> <span className="text-sm">Login with Google</span>  <span>🔥</span></button>
}


export function OAuthError() {
    const searchParams = useSearchParams()

    const error = searchParams.get('error')
    if (error === "OAuthAccountNotLinked") {
        return <p className='text-rose-500 mb-2'>🚧 This email is linked with a different provider</p>
    } else if (error) {
        return <p className='text-rose-500 mb-2'>Some Error Occured</p>
    }

    return <></>
}

export const GithubLogin = () => {

    return <button
        // className="flex w-full justify-center mb-5 items-center gap-2 py-3 px-6 rounded-md font-bold text-2xl text-gray-400 bg-slate-900"
        className="flex w-full justify-center mb-5 items-center gap-2 py-3 px-6 rounded-md font-bold text-2xl text-gray-900 bg-slate-500"
        onClick={() => signIn("github")}> <span className="text-sm">Login with Github</span>  <span>👾</span></button>
}

export const User = () => {
    const { data: session } = useSession()
    return (<>
        <h1>Client session</h1>
        <h1>{JSON.stringify(session)}</h1>
    </>);
}