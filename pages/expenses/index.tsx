import ExpensesForm from "@/components/ExpensesForm";
import { FormValue, defaultValues } from "@/model/expenses-model";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Expenses = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValue>(defaultValues);
  const { data: session } = useSession();

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
    const finalValue = {
      ...formValues,
      price: +formValues.price,
    };
    try {
      let res = await fetch("http://localhost:5000/expense", {
        method: "POST",
        body: JSON.stringify(finalValue),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
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
