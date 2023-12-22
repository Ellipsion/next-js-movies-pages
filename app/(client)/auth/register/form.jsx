"use client";

import axios from "axios";
import { useState } from "react";


const RegisterForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("/api/register", data)
            .then(() => alert("registered"))
            .catch((res) => setError(res?.response?.data?.error))
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
                    Name
                </label>
                <div className="mt-2">
                    <input
                        name="name"
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
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
                    Get started
                </button>
            </div>
        </form>
    )
}

export default RegisterForm