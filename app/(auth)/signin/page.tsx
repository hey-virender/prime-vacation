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
import { signinSchema } from "@/lib/validations";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import Link from "next/link";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      setIsLoading(true);
      setTimeout(() => {
        console.log(values);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md mx-auto flex flex-col gap-5 mt-14 px-4"
      >
        <h1 className="text-2xl font-semibold text-center ">Signin</h1>

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
            "Sign In"
          )}
        </Button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Signin;
