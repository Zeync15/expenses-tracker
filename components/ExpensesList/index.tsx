import { ExpensesListProps } from "@/model/expenses-model";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key } from "react";
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri';

const ExpensesList = ({ data }: ExpensesListProps) => {
  const router = useRouter();
  const handleDelete = async (expenses_id: Key) => {
    try {
      let res = await fetch('http://localhost:3000/api/expenses/deleteExpenses?id=' + expenses_id, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      res = await res.json();

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <div className="text-center text-4xl lg:text-5xl mt-8">Expenses Tracker</div>
      <div className="flex justify-center text-left mt-4">
        {data!.length > 0 ?

          <table className="border w-9/12">
            <thead>
              <tr>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>

              {data!.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    {item.item}
                  </td>
                  <td className="p-2 border">{item.price}</td>
                  <td className="p-2 border w-1/12">
                    <div className="text-xl flex justify-around">
                      <button className="group relative">
                        <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-6 right-[-7px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">Edit</span>
                        <Link href={`/expenses/${item._id}`} className="">
                          <RiEditLine className="hover:scale-110" />
                        </Link>
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="group relative">
                        <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-6 right-[-15px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">Delete</span>
                        <RiDeleteBinLine className="hover:scale-110" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          : <h1>no data</h1>}
      </div>
    </>
  );
};
export default ExpensesList;
