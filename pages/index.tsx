import React, { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import ExpensesList from "@/components/ExpensesList";
import IncomeList from "@/components/IncomeList";
import { RiAddCircleFill } from "react-icons/ri";
import BudgetSelector from "@/components/BudgetSelector";
import Head from "next/head";

export async function getServerSideProps() {
  try {
    let res = await fetch("http://localhost:3000/api/expenses/getAllExpenses");
    let allExpenses = await res.json();

    res = await fetch("http://localhost:3000/api/income/getAllIncome");
    let allIncome = await res.json();

    return {
      props: {
        allExpenses: JSON.parse(JSON.stringify(allExpenses)),
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
  allExpenses,
  allIncome,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showBudgetSelector, setShowBudgetSelector] = useState(false);

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
