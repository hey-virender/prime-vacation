"use client"


import ComplaintTable from '@/components/ComplaintTable'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import {  useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const page = () => {
  const {data,status} = useSession()
  const router = useRouter()
  const [complaints,setComplaints] = useState<Complaint[]>([])
  const fetchComplaints = async () => {
    const data = await axios.get('/api/complaint')
    if(data){
      console.log(data)
      setComplaints(data.data)
    }
    }

  useEffect(() => {
    fetchComplaints()
  }, [data])
  if(status === "loading"){
    return <div className='flex justify-center items-center h-screen'>Loading...</div>
  }

  if(status === "unauthenticated"){
    return router.push('/signin')
  }

  if(data?.user?.role !== 'admin'){
    return router.push('/')
  }

  const handleStatusChange =async (id:string,status:string) => {
    try {
      await axios.patch(`/api/complaint/${id}`, { status });
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status } : complaint
        )
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  }

const handleComplaintDelete = async (id: string) => {
  try {
    await axios.delete(`/api/complaint/${id}`);
    setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
    toast.success("Complaint deleted successfully");
  } catch (error) {
    toast.error("Failed to delete complaint");
  }
};

console.log(complaints)
  return (
    <div>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <p className='text-sm text-muted-foreground'>Welcome {data?.user?.name}</p>

    <div>
      <ComplaintTable complaints={complaints} onStatusChange={handleStatusChange} onDelete={handleComplaintDelete} />
    </div>
    
    </div>
  )
}

export default page