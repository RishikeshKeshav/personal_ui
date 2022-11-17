import React, { useContext, useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function Login(): JSX.Element {
  const { page, setPage } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (): void => {
    void axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}auth`, {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      });
  };
  return (
    <div id="login_page" className="mt-32">
      <div className="bg-white rounded shadow-lg w-1/2 mx-auto p-8">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-clifford hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-clifford hover:text-red-darker"
            href="#"
            onClick={() => setPage("register")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

function Register(): JSX.Element {
  const { page, setPage } = useContext(LoginContext);

  return (
    <div id="registration_page" className="mt-32">
      <div className="bg-white rounded shadow-lg w-1/2 mx-auto p-8">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
          <p className="text-red text-xs italic">Please enter a valid email.</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="phone"
            type="tel"
            placeholder="0123456789"
          />
          <p className="text-red text-xs italic">
            Please enter a valid phone number.
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="address"
            type="text"
            placeholder="1234 Main St"
          />
          <p className="text-red text-xs italic">
            Please enter a valid address.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-clifford hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-clifford hover:text-red-darker"
            href="#"
            onClick={() => setPage("login")}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

interface ILoginContext {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
const LoginContext = React.createContext<ILoginContext>({
  page: "login",
  setPage: () => () => {},
});

function LoginRegistration(): JSX.Element {
  const [page, setPage] = React.useState("login");

  return (
    <LoginContext.Provider value={{ page, setPage }}>
      <ResponsiveAppBar />
      {page === "login" ? <Login /> : <Register />}
    </LoginContext.Provider>
  );
}

export default LoginRegistration;
