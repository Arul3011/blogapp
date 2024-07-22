import React, { useContext, useEffect, useState } from "react";
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
  const { setUser, setUserID } = useContext(DataContext);
  const onSubmit = async (data) => {
    try {
      const dbresponse = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const dbres = await dbresponse.json();
      if (dbres.request === true) {
        setUserID(dbres.userId);
        setUser(true);
        navigate("/");
        document.cookie = `userId=${dbres.userId};path=/`;
      } else {
        setError("root", {
          message: "email or password not valid",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logindiv">
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        <p>LOGIN</p>
        <input
          type="email"
          placeholder="email.."
          {...register("email", {
            required: "email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "email must includes @";
              }
              return true;
            },
          })}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
        <input
          type="password"
          placeholder="Password..."
          {...register("password", {
            minLength: {
              value: 8,
              message: "minimum 8 character required",
            },
            required: "password is required",
          })}
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}

        <div className="btncon">
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Looding..." : "LOGIN"}
          </button>
          {errors.root && (
            <div className="errorroot">{errors.root.message}</div>
          )}
          <Link className="linkp" to={"/sigin"}>
            createa account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
