"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { deleteCookie } from "@/lib/server";

const SignOut = () => {
  const router = useRouter();
  const form = useForm();

  const handleSubmit = async () => {
    // localStorage.clear()
    axios.defaults.headers.common["Authorization"] = "";
    axios.defaults.headers.common["X-PrivateTenant"] = "";
    await deleteCookie();
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default SignOut;
