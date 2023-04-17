import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import ExpensesList from '@/components/ExpensesList';

export async function getServerSideProps() {
  try {
    let res = await fetch('http://localhost:3000/api/expenses/getAllExpenses');
    let allExpenses = await res.json();

    return {
      props: { allExpenses: JSON.parse(JSON.stringify(allExpenses)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const AllExpenses = ({
  allExpenses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ExpensesList data={allExpenses} />
  );
};

export default AllExpenses;
