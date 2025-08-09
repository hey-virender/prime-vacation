import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate the request body
    if (!name || !email || !password) {
      return new Response("Invalid request", { status: 400 });
    }
    await connectDB();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response("User already exists", { status: 409 });
    }
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return new Response("User created", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
