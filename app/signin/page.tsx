"use client";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    //window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
}
