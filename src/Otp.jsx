import React from "react";
import { useForm } from "react-hook-form";
import "./otp.css"; // External CSS for styling

export const Otp = (props) => {
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
            email: props.emailId,
          }),
        }
      );
      const resjson = await dbres.json();
      if (resjson.states) {
        props.setState(props.state + 2);
      } else {
        setError("otp", {
          message: resjson.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Verify OTP</h2>

        <input
          type="text"
          maxLength={4}
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
        />
        {errors.otp && <p className="error-text">{errors.otp.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Verify OTP"}
        </button>

        {errors.root && (
          <p className="error-text link-style">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};
