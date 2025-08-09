import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),

}

)


export const signinSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),

})

export const complaintSchema = z.object(
  {
    title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(20, { message: "Title must be at most 20 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(200, { message: "Description must be at most 200 characters." }),
    category: z.enum(["Product","Service","Support"]),
    priority: z.enum(["Low", "Medium", "High"])
  })