import { ExpensesFormProps } from "@/model/expenses-model";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowLeftLine } from 'react-icons/ri';

const ExpensesForm = ({ handleInputChange, handleSubmit, formValues }: ExpensesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    formValues._id ? setIsEditing(true) : setIsEditing(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Add Expenses</title>
      </Head>
      <div className="text-center text-5xl mt-8">{isEditing ? "Edit Expenses" : "Add Expenses"}</div>
      <div className="mt-4 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="min-w-[100px]">Item:</label>
            <input
              type="text"
              maxLength={50}
              name="item"
              value={formValues.item}
              onChange={handleInputChange}
              className="border-2 rounded-md ml-4 p-1"
            />
          </div>
          <div className="mb-4">
            <label className="min-w-[100px]">
              Price:
              <input
                type="number"
                min={0}
                step={0.1}
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                className="border-2 rounded-md ml-4 p-1"
              />
            </label>
          </div>
          <div className="flex justify-center mb-4">
            <button type="submit" className="border-2 rounded-md py-1 px-2">
              Add
            </button>
          </div>
        </form>

        <div>
          <button>
            <Link href="/" className="flex items-center">
              <RiArrowLeftLine /><span className="ml-2">Go back</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesForm;