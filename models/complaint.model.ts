import mongoose from "mongoose";

interface IComplaint {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  dateSubmitted: Date;
  dateResolved: Date | null;

}

const ComplaintSchema = new mongoose.Schema<IComplaint>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true, default: "Medium" },
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], required: true, default: "Pending" },
  dateSubmitted: { type: Date, default: Date.now },
  dateResolved: { type: Date, default: null }
});

const Complaint = mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
