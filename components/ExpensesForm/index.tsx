import { ExpensesFormProps } from "@/model/expenses-model";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { categoryOptions } from "@/lib/categoryOptions";

const ExpensesForm = ({
  handleInputChange,
  handleSubmit,
  formValues,
}: ExpensesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    formValues._id ? setIsEditing(true) : setIsEditing(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Add Expenses</title>
      </Head>
      <div className="text-center text-5xl my-8">
        {isEditing ? "Edit Expenses" : "Add Expenses"}
      </div>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-center items-center"
      >
        <div className="flex mb-4">
          <label className="w-[100px]">Item:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="item"
            value={formValues.item}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex mb-4">
          <label className="w-[100px]">Price:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="number"
            min={0}
            step={0.01}
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex mb-4">
          <label className="w-[100px]">Date:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="date"
            name="date"
            value={formValues.date.toString().substring(0, 10)}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex mb-4">
          <label className="w-[100px]">Category:</label>
          <select
            className="border-2 rounded-md p-1 w-[250px]"
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            required
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <button
              type="submit"
              className="border-2 rounded-md py-1 px-2 mb-4"
            >
              Add
            </button>
          </div>

          <Link href="/" className="flex items-center">
            <RiArrowLeftLine />
            <span className="ml-2">Go back</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ExpensesForm;
