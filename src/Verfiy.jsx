import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./verfiy.css"; // 👈 Add this line to include external CSS

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
          body: JSON.stringify({ email: data.email }),
        }
      );
      const resjson = await dbres.json();
      if (resjson.states) {
        props.setState(props.state + 1);
        props.setEmailId(data.email);
      } else {
        setError("root", {
          message: resjson.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify-container">
      <form className="verify-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Enter Your Email</h2>

        <input
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Verify"}
        </button>
        {errors.root && <p className="error-text">{errors.root.message}</p>}

        <Link className="link-text" to="/login">
          Already have an account?
        </Link>

        <p className="link-text" onClick={() => props.setState(props.state + 2)}>
          Enter OTP directly
        </p>
      </form>
    </div>
  );
};
