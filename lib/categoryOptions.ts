export interface CategoryOptionsProps {
  value: string;
  label: string;
}

export const expensesOptions: CategoryOptionsProps[] = [
  {
    label: "Food",
    value: "Food",
  },
  {
    label: "Shopping",
    value: "Shopping",
  },
  {
    label: "Transport",
    value: "Transport",
  },
];

export const incomesOptions: CategoryOptionsProps[] = [
  {
    label: "Salary",
    value: "Salary",
  },
  {
    label: "Allowance",
    value: "Allowance",
  },
  {
    label: "Gift",
    value: "Gift",
  },
];

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly CategoryOptionsProps[] | null;
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Expenses",
    options: expensesOptions,
  },
  {
    label: "Income",
    options: incomesOptions,
  },
];
