import dayjs from "dayjs";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";

export async function getServerSideProps() {
  try {
    let res = await fetch("http://localhost:5000/expense");
    let expenses = await res.json();

    return {
      props: {
        expensesList: JSON.parse(JSON.stringify(expenses)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "An error occurred",
      },
    };
  }
}

const Sandbox = ({
  expensesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const defaultValue = {
    item: "",
    price: "",
    createdDate: "",
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
    console.log(formValues);
    event.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/expense", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      res = await res.json();
      // router.push("/");
    } catch (error) {
      console.error(error);
    }

    setFormValues(defaultValue);
  };

  return (
    <>
      <h1>asd</h1>
      {expensesList.map((expense: any, index: number) => (
        <div key={index}>
          <p>{expense.item}</p>
          <p>{dayjs(expense.createdDate).format("YYYY-MM-DD")}</p>
        </div>
      ))}

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
          <label className="w-[100px]">Created Date:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="createdDate"
            value={formValues.createdDate}
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
    </>
  );
};

export default Sandbox;
