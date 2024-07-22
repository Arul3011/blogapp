import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Sigin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();
  const onsubmit = async (data) => {
    if (data.password !== data.conformpass) {
      setError("conformpass", {
        message: "above password not match",
      });
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/adduser", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            password: data.password,
            email: data.email,
          }),
        });
        const dbres = await response.json();
        if (dbres.message === "added") {
          reset({ name: "" });
          reset({ email: "" });
          reset({ password: "" });
          reset({ conformpass: "" });
          navigate("/");
        } else {
          setError("root", {
            message: "somthing went wrong",
          });
        }
      } catch (error) {
        setError("root", {
          message: error.message,
        });
      }
    }
  };

  return (
    <div className="logindiv">
      <form className="loginform" onSubmit={handleSubmit(onsubmit)}>
        <p>SIGIN</p>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "name is required",
          })}
        />
        {errors.name && <div className="error">{errors.name.message}</div>}
        <input
          type="email"
          placeholder="email"
          {...register("email", {
            required: "email is required",
          })}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "mininum 8 characters required",
            },
          })}
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
        <input
          type="password"
          placeholder="conform Password"
          {...register("conformpass", {
            required: "Password is required",
          })}
        />
        {errors.conformpass && (
          <div className="error">{errors.conformpass.message}</div>
        )}
        <div className="btncon">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "CREATE ACCOUNT"}
          </button>
          {errors.root && (
            <div className="errorroot">{errors.root.message}</div>
          )}
          <Link className="linkp" to={"/login"}>
            already have account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Sigin;
