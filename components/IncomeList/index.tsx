import { ExpensesListProps } from "@/model/expenses-model";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key } from "react";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

const IncomeList = ({ data }: ExpensesListProps) => {
  const router = useRouter();
  const handleDelete = async (income_id: Key) => {
    try {
      let res = await fetch(
        "http://localhost:3000/api/income/deleteIncome?id=" + income_id,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center text-4xl lg:text-5xl mt-8">Income List</div>
      {data!?.length > 0 ? (
        <>
          <div className="flex justify-center text-left mt-4">
            <table className="border w-9/12">
              <thead>
                <tr>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data!.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="p-2 border w-5/12">{item.item}</td>
                    <td className="p-2 border w-2/12">{item.price}</td>
                    <td className="p-2 border w-2/12">
                      {dayjs(item.date).format("YYYY-MM-DD")}
                    </td>
                    <td className="p-2 border w-2/12">{item.category}</td>
                    <td className="p-2 border w-1/12">
                      <div className="text-xl flex justify-around">
                        <button className="group relative">
                          <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-6 right-[-7px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">
                            Edit
                          </span>
                          <Link href={`/income/${item._id}`}>
                            <RiEditLine className="hover:scale-110" />
                          </Link>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="group relative"
                        >
                          <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-6 right-[-15px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">
                            Delete
                          </span>
                          <RiDeleteBinLine className="hover:scale-110" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-9/12 flex justify-end mr-[5%]">
              <button className="group relative">
                <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-8 right-[-4px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">
                  Add
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 flex justify-center">
            <div className="w-9/12 flex justify-end mr-[5%]">
              <h1 className="mr-2">No data add one </h1>
              <button className="group relative">
                <span className="text-xs opacity-0 group-hover:opacity-100 absolute bottom-8 right-[-4px] bg-slate-600 text-white p-1 px-2 rounded ease-in duration-150">
                  Add
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default IncomeList;