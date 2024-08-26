import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export const Emailotp = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const dbres = await fetch(
        "https://next-api-blogapp.vercel.app/api/otp/verfiyotp",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            otp: data.otp,
            email: data.email,
          }),
        }
      );
      const resjson = await dbres.json();
      if (resjson.states) {
        props.setState(props.state + 1);
        props.setEmailId(data.email);
      } else {
        console.log(resjson.message);
        setError("otp", {
          message: resjson.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logindiv">
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        <p>VERFIY OTP</p>
        <div className="">
          <input
            style={{
              margin: "10px auto",
            }}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "email is required",
            })}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
          <input
            style={{
              margin: "10px auto",
            }}
            type="text"
            maxLength={4}
            placeholder="otp"
            {...register("otp", {
              required: "otp is required",
            })}
          />
          {errors.otp && <div className="error">{errors.otp.message}</div>}
          <button>{isSubmitting ? "Loading..." : "verfiy OTP"}</button>
        </div>

        {errors.root && (
          <div
            className="error"
            style={{
              marginLeft: "50px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            {errors.root.message}
          </div>
        )}
        <p
          onClick={() => props.setState(props.state - 2)}
          style={{
            fontSize: "1em",
            cursor: "pointer",
            textDecoration: "underLine",
            color: "blue",
          }}
        >
          {" Verfiy Email"}
        </p>
      </form>
    </div>
  );
};
