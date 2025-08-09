"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/validations";
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/signup', values);
      if (response.status === 201) {
        toast.success("User created successfully");
        redirect("/signin");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md mx-auto flex flex-col gap-5 mt-14 px-4"
      >
        <h1 className="text-2xl font-semibold text-center">Signup</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <Button type="submit" disabled={isLoading} className="mx-5">
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin text-white " />
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 font-semibold">
            Signin
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Signup;
