"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status])


    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const callback = await signIn("credentials", {
            ...data,
            redirect: false
        })
        console.log(callback)
        if (callback.error && callback.error === "USER_NOT_VERIFIED") {
            router.push(`/auth/not-verified?email=${data.email}`)
        } else if (callback.error || !callback.ok) {
            setError(callback.error)
        }

        if (!callback.error && callback.ok) {
            toast.success("Logged in successfuly!")
        }

    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {
                error && (
                    <h2 className="text-rose-500">😕 {error}</h2>
                )
            }
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onFocus={() => setError(null)}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-orange-500 hover:text-orange-400">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="text-black w-full inline-block py-3 px-6 rounded-md font-bold bg-white"
                >
                    Continue
                </button>
            </div>
        </form>
    )
}

export default LoginForm