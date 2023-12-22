import Link from "next/link";
import { getServerSession } from "next-auth";
import { LoginButton, LogoutButton } from "@/components/Auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="my-24 text-center">
      <div className="w-full flex gap-2 justify-between items-center px-12">
        <h1 className="cursor-pointer">🤍</h1>

        {
          !!session
            ?
            <LogoutButton name={session?.user?.name} />
            :
            <LoginButton />
        }

      </div>
      <h1 className="text-3xl font-semibold mt-12">Next 13 Pages example ✨</h1>
      <div className="flex gap-2 justify-center mt-12">
        <Link
          className=" inline-block py-3 px-6 rounded-md font-bold text-black bg-white"
          href="/movies"
        >
          Fetch movies
        </Link>
        <Link
          className="text-black  inline-block py-3 px-6 rounded-md font-bold bg-gradient-to-tr from-teal-400 to-cyan-400"
          href="/movies-loading"
        >
          Fetch movies with loading.jsx
        </Link>
      </div>
      <div className="flex gap-2 justify-center">
        <Link
          className="text-black my-2 inline-block py-3 px-6 rounded-md font-bold bg-gradient-to-tr from-orange-400 to-red-400"
          href="/movies-error"
        >
          Fetch movies with error.jsx
        </Link>
        <Link
          className="text-black my-2 inline-block py-3 px-6 rounded-md font-bold bg-slate-400"
          href="/movie-not-found"
        >
          Fetch with not-found.jsx
        </Link>
      </div>
    </main>
  );
}
