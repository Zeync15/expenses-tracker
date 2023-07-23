import React, { useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import ExpensesList from "@/components/ExpensesList";
import IncomeList from "@/components/IncomeList";
import { RiAddCircleFill } from "react-icons/ri";
import BudgetSelector from "@/components/BudgetSelector";
import Head from "next/head";
import { useSession } from "next-auth/react";

export async function getServerSideProps() {
  try {
    const incomeRes = await fetch(
      "http://localhost:3000/api/income/getAllIncome"
    );
    let allIncome = await incomeRes.json();

    return {
      props: {
        allIncome: JSON.parse(JSON.stringify(allIncome)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        error: "An error occurred",
      },
    };
  }
}

const AllExpenses = ({
  allIncome,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showBudgetSelector, setShowBudgetSelector] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);
  const { data: session, status } = useSession();
  console.log(session)

  useEffect(() => {
    if (status === "authenticated" && session) {
      getExpenseList();
    }
  }, [status, session]);

  const getExpenseList = async () => {
    const expenseRes = await fetch("http://localhost:5000/expense", {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user?.access_token}`,
      },
    });
    let allExpenses = await expenseRes.json();
    setAllExpenses(allExpenses);
  };

  return (
    <>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <ExpensesList data={allExpenses} />
      <IncomeList data={allIncome} />

      <div className="absolute top-0 right-0 m-16 cursor-pointer">
        <RiAddCircleFill
          className="hover:scale-110 text-3xl"
          onClick={() => setShowBudgetSelector(true)}
        />
        {showBudgetSelector && (
          <BudgetSelector setShowBudgetSelector={setShowBudgetSelector} />
        )}
      </div>
    </>
  );
};

export default AllExpenses;
