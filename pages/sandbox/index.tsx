import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sandbox = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const { data: session, status } = useSession();
  console.log(session);

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
  const defaultValue = {
    item: "",
    price: 0,
    date: dayjs(),
    category: "",
  };

  const [formValues, setFormValues] = useState(defaultValue);

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
    try {
      const submitValues = {
        ...formValues,
        price: +formValues.price,
      };

      let res = await fetch("http://localhost:5000/expense", {
        method: "POST",
        body: JSON.stringify(submitValues),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      res = await res.json();
    } catch (error) {
      console.error(error);
    }

    setFormValues(defaultValue);
  };

  return (
    <>
      <h1 className="mt-5 text-center text-3xl">Sandbox</h1>
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex mb-4">
          <label className="w-[100px]">Item:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="item"
            value={formValues.item}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">Price:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">Date:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="date"
            name="date"
            value={dayjs(formValues.date).format("YYYY-MM-DD")}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">Category:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col items-center">
          <div>
            <button
              type="submit"
              className="border-2 rounded-md py-1 px-2 mb-4"
            >
              Register
            </button>
          </div>
        </div>
      </form>

      <h1>asd</h1>
      {allExpenses?.map((expense: any, index: number) => (
        <div key={index}>
          <p>{expense.item}</p>
          <p>{dayjs(expense.createdDate).format("YYYY-MM-DD")}</p>
        </div>
      ))}
    </>
  );
};

export default Sandbox;
