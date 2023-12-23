import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-gray-700 my-5">004</h1>
            <h2 className="text-4xl">Page Not Found 😕</h2>
            <div className="my-6 flex gap-12">
                <Link href={"/"}
                    className="inline-block py-3 px-6 items-center rounded-md font-medium text-md text-blue-200 bg-slate-800"
                >Go back home <span className="text-2xl">👍</span> </Link>
            </div>
        </div>
    )
}