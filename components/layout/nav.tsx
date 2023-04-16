import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <ul className="bg-gray-400 text-white flex ">
        <li className="p-4">
          <Link href="/">Home</Link>
        </li>
        <li className="p-4">
          <Link href="/expenses/">Expenses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
