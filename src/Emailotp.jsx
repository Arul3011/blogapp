import React from "react";
import { useForm } from "react-hook-form";

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
            "Content-Type": "application/json",
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
        setError("otp", {
          message: resjson.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#fff",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Verify OTP
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          style={{
            padding: "10px",
            fontSize: "1em",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.9em" }}>
            {errors.email.message}
          </p>
        )}

        <input
          type="text"
          maxLength={4}
          placeholder="Enter 4-digit OTP"
          {...register("otp", {
            required: "OTP is required",
          })}
          style={{
            padding: "10px",
            fontSize: "1em",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        {errors.otp && (
          <p style={{ color: "red", fontSize: "0.9em" }}>
            {errors.otp.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1em",
            transition: "0.3s",
          }}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>

        {errors.root && (
          <p style={{ color: "red", fontSize: "0.9em" }}>
            {errors.root.message}
          </p>
        )}

        <p
          onClick={() => props.setState(props.state - 2)}
          style={{
            textAlign: "center",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "10px",
            fontSize: "0.95em",
          }}
        >
          ← Back to Email Verification
        </p>
      </form>
    </div>
  );
};
