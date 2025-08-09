'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  const handleLogout = async()=>{
    await signOut()
  }
  return (
    <Button variant='destructive' onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutButton