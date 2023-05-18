import ExpensesForm from "@/components/ExpensesForm";
import { FormValue, defaultValues } from "@/model/expenses-model";
import { useRouter } from "next/router";
import { useState } from "react";

const Expenses = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValue>(defaultValues);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/api/expenses/addExpenses", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      res = await res.json();

      router.push("/");
    } catch (error) {
      console.error(error);
    }

    setFormValues(defaultValues);
  };

  return (
    <ExpensesForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      formValues={formValues}
    />
  );
};

export default Expenses;
