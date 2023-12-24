"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyPage({ params }) {
    const { token } = params;
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        axios.post("/api/verify", { token })
            .then(res => {
                // notify kro
                toast.success("Account verified!")
                // redirect kro
                router.push("/auth/login")
            })
            .catch(error => {
                toast.error("Invalid Link")
                setError(error)
                router.push("/auth/login")
            })
        setLoading(false)
    }, [])

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6  py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-md p-8">
                    <div className="w-full text-center flex flex-col items-center gap-2 rounded-md text-white mb-8">
                        <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-500">
                            Verifying your account
                        </h2>
                        {
                            !error
                                ?
                                <>
                                    <div className="relative h-10 w-10 flex items-center justify-center mt-10 mb-5">
                                        <span className={`animate-ping absolute top-0 left-0 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`} />
                                        <span className="relative text-2xl">🐳</span>
                                    </div>
                                    <p className="mt-2 text-xs font-semibold text-gray-300">Please wait...</p>
                                </>
                                :
                                <>
                                    <div className="relative h-10 w-10 flex items-center justify-center my-5">
                                        <span className={` absolute top-0 left-0 inline-flex h-full w-full rounded-full`} />
                                        <span className="relative text-2xl">😵</span>
                                    </div>
                                    <p className="mt-2 text-xs font-semibold text-red-500">Invalid Link</p>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

const Form = () => {
    return (
        <div className="w-full flex flex-col gap-2 rounded-md bg-gradient-to-tr from-orange-400 to-red-400 text-black mb-8 p-5">
            <h2 className="text-3xl">👋</h2>
            <h2 className=" text-left text-3xl font-bold leading-9 tracking-tight ">
                Hello!
            </h2>
            <p className="text-xs font-semibold text-gray-800 w-4/5">Ready to setup your free acount? We just need a few more details.</p>
        </div>
    )
}
