'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const handleLogout = async()=>{
    setIsLoading(true)
    await signOut()
    router.push('/signin')
    setIsLoading(false)
  }
  return (
    <Button variant='destructive' onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}

export default LogoutButton