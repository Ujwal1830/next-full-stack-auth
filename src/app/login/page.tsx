"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    } else{
      setButtonDisabled(true);
    }
  }, [user])

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-lg">{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="text-slate-700 p-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:border-slate-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="text-slate-700 p-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:border-slate-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button 
        onClick={onLogin}
        className="p-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:border-slate-600">
        Login
      </button>
      <Link href={"/signup"}><p>{`Don't have account ? `}</p><span className="underline">Register</span></Link>
    </div>
  );
}
