import React from "react";
import { useForm } from "react-hook-form";
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
            type="text"
            maxLength={4}
            placeholder="otp"
            {...register("otp", {
              required: "otp is required",
            })}
          />

          <button>{isSubmitting ? "Loading..." : "verfiy OTP"}</button>
        </div>
        {errors.otp && <div className="error">{errors.otp.message}</div>}
        {errors.root && (
          <div
            className="error"
            style={{
              marginLeft: "50px",
              marginBottom: "20px",
              marginTop: "20px",
              cursor: "pointer",
              textDecoration: "underLine",
              color: "blue",
            }}
          >
            {errors.root.message}
          </div>
        )}
      </form>
    </div>
  );
};
