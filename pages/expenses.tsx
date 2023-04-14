import ExpensesForm from "@/components/expenses-form/ExpensesForm";
import clientPromise from "@/lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useState } from 'react';



export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const result = await db.collection("ratings")
      .find({})
      .sort({ createdAt: 1 })
      .limit(10)
      .toArray();

    console.log('re', result);

    return {
      props: { result: JSON.parse(JSON.stringify(result)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const Expenses: React.FC<any> = (
  { result }: InferGetServerSidePropsType<typeof getServerSideProps>
) => {

  return (
    <>
      <div>
        {result ? (
          <div>{result.map((re: any, index: number) => (
            <div key={index}>{re.value}</div>
          ))}</div>
        ) : (
          <h1>empty</h1>
        )}
      </div>

      <ExpensesForm />
    </>
  );
};

export default Expenses;

