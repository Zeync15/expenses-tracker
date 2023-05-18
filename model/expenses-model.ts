import { ChangeEvent, FormEvent, Key } from "react";

export interface ExpensesProps {
  _id: Key;
  item: string;
  price: number;
  date: Date;
  handleDelete?: () => Promise<void>;
}

export interface ExpensesListProps {
  data?: ExpensesProps[];
}

export interface FormValue {
  _id?: Key;
  item: string;
  price: number;
  date: Date;
}

export const defaultValues: FormValue = {
  item: "",
  price: 0,
  date: new Date(Date.now().toString().substring(0, 10)),
};

export interface ExpensesFormProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formValues: FormValue;
}
