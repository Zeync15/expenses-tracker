import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

const Register = () => {
  const defaultValue = {
    username: "",
    password: "",
    retypedPassword: "",
    firstName: "",
    lastName: "",
    email: "",
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
    console.log(event);
    event.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/user", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      res = await res.json();
      router.push("/");
    } catch (error) {
      console.error(error);
    }

    setFormValues(defaultValue);
  };

  return (
    <>
      <div className="text-center text-5xl my-8">Register</div>

      <Head>
        <title>Register</title>
      </Head>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex mb-4">
          <label className="w-[100px]">Username:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">password:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="password"
            maxLength={50}
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">retypedPassword:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="password"
            maxLength={50}
            name="retypedPassword"
            value={formValues.retypedPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">firstName:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">lastName:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mb-4">
          <label className="w-[100px]">email:</label>
          <input
            className="border-2 rounded-md p-1 w-[250px]"
            type="text"
            maxLength={50}
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col items-center">
          <div>
            <button
              type="submit"
              className="border-2 rounded-md py-1 px-2 mb-4"
              // disabled={status !== "authenticated"}
            >
              Register
            </button>
          </div>

          <Link href="/" className="flex items-center">
            <RiArrowLeftLine />
            <span className="ml-2">Go back</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
