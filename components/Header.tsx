import React from 'react'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div>
        <h1>Prime Vacations</h1>
      </div>
      <LogoutButton />
    </nav>
  )
}

export default Header