import ExpensesForm from "@/components/ExpensesForm";
import { FormValue, defaultValues } from "@/model/expenses-model";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { expenses_id } = context.query;
  try {
    let res = await fetch(
      "http://localhost:5000/expense/" + expenses_id
    );
    let singleExpenses = await res.json();

    return {
      props: { singleExpenses: JSON.parse(JSON.stringify(singleExpenses)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const EditExpenses = ({
  singleExpenses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { expenses_id } = router.query;

  const [formValues, setFormValues] = useState<FormValue>(singleExpenses);
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
      let res = await fetch(
        "http://localhost:5000/expense/" + expenses_id,
        {
          method: "PATCH",
          body: JSON.stringify(finalValue),
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

export default EditExpenses;
