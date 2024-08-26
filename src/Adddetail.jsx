import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export const Adddetail = ({ emailId }) => {
  const navigate = useNavigate();
  const dilogref = useRef(null);

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
        const dbres = await response.json();
        if (dbres.message === "addedd") {
          reset({ name: "" });
          reset({ password: "" });
          reset({ conformpass: "" });

          dilogref.current.showModal();
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
  const drictLogin = () => {
    navigate("/");
    dilogref.current.close();
  };
  return (
    <div className="logindiv">
      <form className="loginform" onSubmit={handleSubmit(onsubmit)}>
        <p>SIGIN</p>
        <input
          style={{
            margin: "10px auto",
          }}
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "name is required",
          })}
        />
        {errors.name && <div className="error">{errors.name.message}</div>}
        <input
          type="email"
          placeholder="emailId"
          value={emailId}
          readOnly
          style={{
            margin: "10px auto",
          }}
        />
        <input
          style={{
            margin: "10px auto",
          }}
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
          style={{
            margin: "10px auto",
          }}
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
        </div>
      </form>
      <dialog ref={dilogref}>
        <div className="dilogbtn">
          <p>Account Created</p>
        </div>
        <div className="dilogbtn">
          <button style={{ background: "blue" }} onClick={() => drictLogin()}>
            Move to Login
          </button>
        </div>
      </dialog>
    </div>
  );
};
