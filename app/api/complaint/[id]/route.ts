import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/nodemailer";
import Complaint from "@/models/complaint.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await auth();

  if (!data || data.user.role !== 'admin') {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  const complaint = await Complaint.findById(id).populate('user', 'name email');

  if (!complaint) {
    return new Response("Complaint not found", { status: 404 });
  }

  return new Response(JSON.stringify(complaint), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await auth();

  if (!data || data.user.role !== 'admin') {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    return new Response("Complaint not found", { status: 404 });
  }

  await Complaint.findByIdAndDelete(id);

  return new Response("Complaint deleted successfully", { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await auth();

  if (!data || data.user.role !== 'admin') {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    return new Response("Complaint not found", { status: 404 });
  }

  const { title, description, category, priority, status } = await req.json();
  if (title && (title.length < 5 || title.length > 20)) {
    return new Response("Invalid title length", { status: 400 });
  }
  if (description && (description.length < 10 || description.length > 200)) {
    return new Response("Invalid description length", { status: 400 });
  }
  if (title) complaint.title = title;
  if (description) complaint.description = description;
  if (category) complaint.category = category;
  if (priority) complaint.priority = priority;
  if (status) complaint.status = status;
  if (status == "Resolved") complaint.dateResolved = new Date();

  await complaint.save();
  if (status) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "Complaint Updated",
      text: `Status of complaint with ID ${id} has been updated.`,
      html: `<div>
        <p>Status of complaint with ID ${id} has been updated.</p>
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>Status:</strong> ${complaint.status}</p>
      </div>`
    });
  }

  return new Response("Complaint updated successfully", { status: 200 });
}
