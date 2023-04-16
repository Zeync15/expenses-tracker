import { ExpensesListProps } from '@/pages';
import Link from "next/link";

const ExpensesList = ({ data }: ExpensesListProps) => {
  return (
    <>
      <div className="text-center text-5xl mt-8">Expenses List</div>
      <div className="flex justify-center text-left mt-4">
        <table className="border w-9/12">
          <thead>
            <tr>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <Link href={`/expenses/${item._id}`}>
                  {item.item}
                  </Link>
                  </td>
                <td className="p-2 border">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ExpensesList;
