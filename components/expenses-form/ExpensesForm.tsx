import Head from "next/head";
import { useState } from "react";

interface FormValue {
  item: string,
  price: number;
}

const defaultValues: FormValue = {
  item: "",
  price: 0
};

const ExpensesForm = () => {
  const [formValues, setFormValues] = useState<FormValue>(defaultValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
    setFormValues(defaultValues);
  };

  return (
    <div>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <div className="text-center text-5xl mt-8">Expenses Tracker</div>
      <div className="mt-4 flex justify-center align-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="min-w-[100px]">
              Item:
            </label>
            <input type="text" name="item" value={formValues.item} onChange={handleInputChange} className="border-2 rounded-md ml-4 p-1" />
          </div>
          <div className="mb-4">
            <label className="min-w-[100px]">
              Price:
              <input type="number" name="price" value={formValues.price} onChange={handleInputChange} className="border-2 rounded-md ml-4 p-1" />
            </label>
          </div>
          <button type="submit" className="border-2 rounded-md p-1">Submit</button>
        </form>
      </div></div>
  );
};

export default ExpensesForm;