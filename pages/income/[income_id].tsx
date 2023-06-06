import IncomeForm from "@/components/IncomeForm";
import { FormValue, defaultValues } from "@/model/expenses-model";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { income_id } = context.query;
  try {
    let res = await fetch(
      "http://localhost:3000/api/income/getIncome?id=" + income_id
    );
    let singleIncome = await res.json();

    return {
      props: { singleIncome: JSON.parse(JSON.stringify(singleIncome)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const EditIncome = ({
  singleIncome,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { income_id } = router.query;

  const [formValues, setFormValues] = useState<FormValue>(singleIncome);
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
      userId: session?.user.id,
    };
    try {
      let res = await fetch(
        "http://localhost:3000/api/income/editIncome?id=" + income_id,
        {
          method: "POST",
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
    <IncomeForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      formValues={formValues}
    />
  );
};

export default EditIncome;
