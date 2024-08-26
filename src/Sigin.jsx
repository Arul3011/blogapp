import { useState } from "react";
import { Adddetail } from "./Adddetail";
import { Otp } from "./Otp";
import { Verfiy } from "./Verfiy";
import { Emailotp } from "./Emailotp";
const Sigin = () => {
  const [state, setState] = useState(0);
  const [emailId, setEmailId] = useState("");

  return (
    <div>
      <div className="" style={{ display: state === 0 ? "block" : "none" }}>
        <Verfiy state={state} setState={setState} setEmailId={setEmailId} />
      </div>
      <div className="" style={{ display: state === 1 ? "block" : "none" }}>
        <Otp state={state} setState={setState} emailId={emailId} />
      </div>
      <div className="" style={{ display: state === 3 ? "block" : "none" }}>
        <Adddetail state={state} setState={setState} emailId={emailId} />
      </div>
      <div className="" style={{ display: state === 2 ? "block" : "none" }}>
        <Emailotp state={state} setState={setState} setEmailId={setEmailId} />
      </div>
    </div>
  );
};

export default Sigin;
