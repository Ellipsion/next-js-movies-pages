"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";


export default function Example() {
    const params = useSearchParams()
    const email = params.get("email")
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6  py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm border  border-gray-800 rounded-md p-8">
                    <div className="w-full text-center flex flex-col gap-2 rounded-md text-white mb-8 ">
                        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight ">
                            Hi! 🤗
                        </h2>
                        <p className="text-sm font-semibold text-gray-500">{email}</p>
                        <p className="mt-3 text-md font-semibold text-gray-300">Please verify your email.</p>
                        <p className="text-sm font-medium text-gray-400">{"We've"} just sent a verification email to your inbox. Click the link to complete the process.</p>
                    </div>

                    {/* <div className="flex items-center mb-4 text-sm text-gray-600">
                        <hr className="flex-grow border-t border-gray-600" />
                        <span className="mx-2">Or use credentials</span>
                        <hr className="flex-grow border-t border-gray-600" />
                    </div> */}
                    <div className="flex justify-center">
                        <Link
                            className="ml-2 text-sm font-medium leading-6 text-cyan-500 hover:text-cyan-400"
                            href="#"
                        >
                            {"Didn't"} get the mail? Send it again
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

