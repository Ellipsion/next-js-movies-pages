import Link from "next/link";
import LoginForm from "./form";

export default function Example() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6  py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-800 rounded-md p-8">
                    <div className="w-full flex flex-col gap-2 rounded-md text-white mb-8">
                        <h2 className="text-3xl">😊</h2>
                        <h2 className=" text-left text-3xl font-bold leading-9 tracking-tight ">
                            Hi!
                        </h2>
                        <p className="text-xs font-semibold text-gray-300 w-4/5">Sign in to your account.</p>
                    </div>

                    <LoginForm />

                    <p className="mt-10 text-center text-sm text-gray-500">
                        New user?
                        <Link href="/auth/register" className="ml-2 font-semibold leading-6 text-cyan-500 hover:text-cyan-400">
                            Register here
                        </Link>
                    </p>
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
