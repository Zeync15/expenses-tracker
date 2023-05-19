import dayjs from "dayjs";
import { ChangeEvent, FormEvent, Key } from "react";

export interface ExpensesProps {
  _id: Key;
  item: string;
  price: number;
  date: string;
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
  date: string;
  category: string;
}

export const defaultValues: FormValue = {
  item: "",
  price: 0,
  date: dayjs().format("YYYY-MM-DD"),
  category: "",
};

export interface ExpensesFormProps {
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formValues: FormValue;
}
