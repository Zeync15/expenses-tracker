import { ExpensesFormProps } from "@/model/expenses-model";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { CategoryOptionsProps, incomesOptions } from "@/lib/categoryOptions";
import Select from "react-select";
import dayjs from "dayjs";

const IncomeForm = ({
  handleInputChange,
  handleSubmit,
  formValues,
}: ExpensesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<CategoryOptionsProps | null>(null);

  useEffect(() => {
    formValues._id && setIsEditing(true);
    formValues._id &&
      setSelectedOption(
        incomesOptions.find((option) => option.value === formValues.category)!
      );
  }, []);

  const handleSelectChange = (selected: CategoryOptionsProps | null) => {
    setSelectedOption(selected);
    formValues.category = selected!.value;
  };

  return (
    <div>
      <Head>
        <title>Add Expenses</title>
      </Head>
      <div className="text-center text-5xl my-8">
        {isEditing ? "Edit Income" : "Add Income"}
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
            value={dayjs(formValues.date).format("YYYY-MM-DD")}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">Category:</label>
          <Select
            options={incomesOptions}
            name="category"
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="Income"
            className="w-[250px]"
            instanceId={useId()}
            defaultValue={selectedOption}
            required={true}
          />
        </div>

        <div className="flex flex-col items-center">
          <div>
            <button
              type="submit"
              className="border-2 rounded-md py-1 px-2 mb-4"
            >
              {isEditing ? "Update" : "Add"}
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

export default IncomeForm;
