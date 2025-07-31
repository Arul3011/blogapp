import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./adddetails.css";

export const Adddetail = ({ emailId }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPass) {
      setError("confirmPass", {
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://next-api-blogapp.vercel.app/api/adduser",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            password: data.password,
            email: emailId,
          }),
        }
      );
      const res = await response.json();

      if (res.message === "added") {
        reset();
        dialogRef.current.showModal();
      } else {
        setError("root", {
          message: "Something went wrong",
        });
      }
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  const redirectToLogin = () => {
    navigate("/");
    dialogRef.current.close();
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}

        <input type="email" value={emailId} readOnly />

        <input
          type="password"
          placeholder="Password"
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

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPass", {
            required: "Confirmation password is required",
          })}
        />
        {errors.confirmPass && (
          <p className="error-text">{errors.confirmPass.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Create Account"}
        </button>

        {errors.root && <p className="error-text">{errors.root.message}</p>}
      </form>

      <dialog ref={dialogRef} className="dialog-box">
        <p>🎉 Account Created Successfully</p>
        <button onClick={redirectToLogin}>Go to Login</button>
      </dialog>
    </div>
  );
};
