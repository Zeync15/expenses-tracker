
import Head from "next/head";
import React from 'react';
import ExpensesForm from "./expenses";


const index = () => {
  return (
    <div>
      this is root
      <ExpensesForm />
    </div>
  );
};

export default index;

