import React, { useState } from "react";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form action="" className="min-h-[80vh] flex items-center">
      <div>
        <p>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
      </div>
    </form>
  );
}

export default Login;
