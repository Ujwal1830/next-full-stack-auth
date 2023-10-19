'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [ data, setData] = useState("");

  const onLogout = async()=>{
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

    const getUserDetails = async()=>{
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setData(res.data.data._id)
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl text-slate-200">Profile</h1>
      <hr />
      <p>Profile Page</p>
      <p>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</p>      
      <hr />
      <button onClick={onLogout} className="bg-indigo-800 hover:bg-indigo-300 text-white hover:text-indigo-900 py-2 px-4 rounded-lg">Logout</button>
      <button onClick={getUserDetails} className="bg-indigo-800 hover:bg-indigo-300 text-white hover:text-indigo-900 py-2 px-4 rounded-lg">Get User daetails</button>
    </div>
  );
}
