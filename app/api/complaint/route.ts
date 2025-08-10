import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/nodemailer";
import Complaint from "@/models/complaint.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await auth();

    if (!data || !data.user || !data.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { title, description, category, priority } = await req.json();

    if (!title || !description || !category || !priority) {
      return new Response("Missing fields", { status: 400 });
    }
    if (title.length < 5 || description.length < 10) {
      return new Response("Invalid fields", { status: 400 });
    }
    if (title.length > 20 || description.length > 200) {
      return new Response("Too long fields", { status: 400 });
    }
    await connectDB();
    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      user: data.user.id,
    })
    await complaint.save();

    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "New Complaint Submitted",
      text: `A new complaint has been submitted by ${data.user.name}.`,
      html: `<div>
        <p>A new complaint has been submitted by ${data.user.name}.</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Priority:</strong> ${priority}</p>
      </div>`
    });

    return new Response("Complaint submitted successfully", { status: 201 });

  } catch (error) {
    console.error("Error submitting complaint: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const data = await auth();

  if (!data || data.user.role !== 'admin') {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();


  const complaints = await Complaint.find().populate('user', 'name email');

  return new Response(JSON.stringify(complaints), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}