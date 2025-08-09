import { auth } from '@/auth'
import ComplaintForm from '@/components/ComplaintForm'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
  const data = await auth()
  if(!data || !data.user || !data.user.id){
    return redirect('/signin')
  }
  
  return (
    <div>
      <ComplaintForm />
    </div>
  )
}

export default page