import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between bg-gray-400  text-white">
      <ul className="flex">
        <li className="p-4">
          <Link href="/">Home</Link>
        </li>
        <li className="p-4">
          <Link href="/expenses">Expenses</Link>
        </li>
        <li className="p-4">
          <Link href="/income">Income</Link>
        </li>
        <li className="p-4">
          <Link href="/sandbox">Sandbox</Link>
        </li>
      </ul>

      <ul className="flex">
        <li className="p-4">
          <Link href="/register">Register</Link>
        </li>
        {session ? (
          <li className="p-4">
            <button onClick={() => signOut()}>
              {session?.user?.username} Next Sign Out
            </button>
          </li>
        ) : (
          <li className="p-4">
            <button onClick={() => signIn()}>Next Auth Sign in</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
