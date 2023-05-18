import { categoryOptions } from "@/lib/categoryOptions";
import { ChangeEvent, FormEvent, Key } from "react";

export interface ExpensesProps {
  _id: Key;
  item: string;
  price: number;
  date: Date;
  category: string;
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
  category: string;
}

export const defaultValues: FormValue = {
  item: "",
  price: 0,
  date: new Date(Date.now().toString().substring(0, 10)),
  category: "",
};

export interface ExpensesFormProps {
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formValues: FormValue;
}
