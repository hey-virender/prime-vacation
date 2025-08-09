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
import { complaintSchema} from "@/lib/validations";
import {  Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const ComplaintForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
     title:"",
     description:"",
     category:"Product",
     priority:"Low"
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof complaintSchema>) {
    try {
      setIsLoading(true);
      // await Complaint.create(values);
      toast.success("Complaint submitted successfully");
      console.log("Complaint submitted:", values);

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
        <h1 className="text-2xl font-semibold text-center ">Submit Complaint</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Enter description" {...field}  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="Product" onValueChange={field.onChange} value={field.value}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Product" id="Product" />
    <Label htmlFor="Product">Product</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Service" id="Service" />
    <Label htmlFor="Service">Service</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Support" id="Support" />
    <Label htmlFor="Support">Support</Label>
  </div>
</RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                 <Select onValueChange={field.onChange} value={field.value}>
  <SelectTrigger className="w-[180px]" >
    <SelectValue placeholder="Priority" />
  </SelectTrigger>
  <SelectContent >
    <SelectItem value="Low">Low</SelectItem>
    <SelectItem value="Medium">Medium</SelectItem>
    <SelectItem  value="High">High</SelectItem>
  </SelectContent>
</Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          
        
        <Button type="submit" disabled={isLoading} className="mx-5">
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin text-white " />
          ) : (
            "Submit Complaint"
          )}
        </Button>

        
      </form>
    </Form>
  );
};

export default ComplaintForm;
