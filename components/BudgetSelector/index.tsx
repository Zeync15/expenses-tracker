import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface BudgetSelectorProps {
  setShowBudgetSelector: Dispatch<SetStateAction<boolean>>;
}

const BudgetSelector = ({ setShowBudgetSelector }: BudgetSelectorProps) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center cursor-auto">
      <div className="bg-white p-12 opacity-100 relative rounded-md">
        <div
          className="absolute right-0 top-0 mr-4 mt-2 cursor-pointer"
          onClick={() => setShowBudgetSelector(false)}
        >
          X
        </div>
        <div className="mb-4 text-center">Add</div>
        <div className="flex">
          <div className="border-2 rounded-md p-2 m-2 cursor-pointer">
            <Link href="/expenses">Expenses</Link>
          </div>
          <div className="border-2 rounded-md p-2 m-2 cursor-pointer">
            <Link href="/income">Income</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSelector;
