import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export const Verfiy = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const dbres = await fetch(
        "https://next-api-blogapp.vercel.app/api/otp/sendotp",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );
      const resjson = await dbres.json();
      if (resjson.states) {
        props.setState(props.state + 1);
        props.setEmailId(data.email);
      } else {
        setError("root", {
          message: resjson.messege,
        });
        // console.log(resjson.messege);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logindiv">
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        <p>ENTER YOUR EMAIL</p>
        <div className="">
          <input
            style={{
              margin: "10px auto",
            }}
            type="text"
            placeholder="Enter your email"
            {...register("email", {
              required: "requered",
            })}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}

          <button>{isSubmitting ? "Loading..." : "verfiy "}</button>
          {errors.root && <div className="error">{errors.root.message}</div>}
        </div>
        <Link
          className="linkp"
          to={"/login"}
          style={{ textAlign: "center", width: "100%" }}
        >
          <p
            style={{
              fontSize: "1em",
              cursor: "pointer",
              textDecoration: "underLine",
              color: "blue",
              marginBottom: "-10px",
            }}
          >
            already have account
          </p>
        </Link>
        <p
          onClick={() => props.setState(props.state + 2)}
          style={{
            fontSize: "1em",
            cursor: "pointer",
            textDecoration: "underLine",
            color: "blue",
          }}
        >
          {" Enter otp "}
        </p>
      </form>
    </div>
  );
};
