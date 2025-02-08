import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../Components/Inputs/Input";
import Button from "../Components/Buttons/Button";
import useAxios from "../Hooks/useAxios";
import { LOGIN_API_ENDPOINT } from "../Config/UserApiEndPoints";
import { useAuthCtx } from "../Contexts/AuthCtx";
import { DASHBOARD_ROUTE_POINT } from "../Config/Routes";
import SignupBlock from "../Components/Login/SignupBlock";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "12" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    axiosInstance,
    handleError,
    errorMsg,
    setErrorMsg,
    setIsLoading,
    isLoading,
  } = useAxios();

  const { handleToken } = useAuthCtx();
  const navigate = useNavigate();

  const onChangeHandler = (type, value) => {
    setErrorMsg("");

    setLoginData((prevData) => {
      return { ...prevData, [type]: value };
    });
  };

  const loginBtnHandler = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const { data } = await axiosInstance.post(LOGIN_API_ENDPOINT, loginData);

      handleToken(data.token);

      navigate(DASHBOARD_ROUTE_POINT);
    } catch (error) {
      handleError(error, false);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickSignUpBtnHandler = () => {
    setErrorMsg("");
    setIsSignUp(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginHtml = (
    <>
      <h1 className="text-lg font-bold">Sign in</h1>

      <Input
        label="Email"
        onChange={(e) => onChangeHandler("email", e.target.value)}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-7 text-sm text-violet-600 focus:outline-none"
        >
          {
          showPassword ?
           // Hide password icon (close eye)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
              :
            // Show password icon (open eye)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          }
        </button>



      </div>
      <Button isLoading={isLoading} onClick={loginBtnHandler} name="SIGN IN" />

      <div className="flex space-x-1 text-xs">
        <span>Don't have an account?</span>
        <button
          onClick={onClickSignUpBtnHandler}
          className="text-xs text-violet-600"
        >
          Sign up
        </button>
      </div>
    </>
  );

  return (
    <section className="h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex w-full h-full justify-center items-center ">
        <div className="flex flex-col border rounded-lg p-10 space-y-5 min-w-96  bg-white shadow-md">
          {isSignUp ? <SignupBlock setIsSignUp={setIsSignUp} /> : loginHtml}
          {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
