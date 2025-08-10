import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
}

interface ComplaintTableProps {
  complaints: Complaint[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const ComplaintTable = ({
  complaints,
  onStatusChange,
  onDelete,
}: ComplaintTableProps) => {
  if (complaints.length === 0)
    return (
      <div className="flex justify-center items-center h-96 text-sm sm:text-base">
        No complaints found
      </div>
    );

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableCaption className="text-xs sm:text-sm">Complaints</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint._id}>
              <TableCell className="font-medium text-xs sm:text-sm max-w-[150px] truncate">
                {complaint._id}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                {complaint.title}
              </TableCell>
              <TableCell className="text-xs sm:text-sm max-w-[200px] truncate">
                {complaint.description}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                {complaint.category}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                {complaint.priority}
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    onStatusChange(complaint._id, value)
                  }
                  value={complaint.status}
                >
                  <SelectTrigger className="w-[140px] sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(complaint._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplaintTable;
