import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import DataContext from "./DataContext/DataContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { setUser, setUserID, setuserName } = useContext(DataContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://next-api-blogapp.vercel.app/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      const result = await response.json();

      if (result.request === true) {
        setUserID(result.userId);
        setuserName(result.name);
        setUser(true);
        document.cookie = `userId=${result.userId};path=/`;
        navigate("/");
      } else {
        setError("root", {
          message: "Email or password is not valid",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            validate: (value) =>
              value.includes("@") || "Email must include @",
          })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
          })}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Login"}
        </button>

        {errors.root && (
          <p className="error-text center">{errors.root.message}</p>
        )}

        <Link className="link-text" to="/sigin">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
