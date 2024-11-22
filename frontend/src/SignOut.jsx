import React from 'react'
import { supabase } from './supabaseClient'  // Import your Supabase client setup

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      // Sign the user out using Supabase
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Error signing out:', error.message)
        alert('Error signing out, please try again!')
      } else {
        // Optionally, redirect the user after sign out
        window.location.href = '/'  // or use React Router: history.push('/login')
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
      alert('Unexpected error during sign out, please try again!')
    }
  }

  return (
    <div>
      <button onClick={handleSignOut} className="button block">
        Sign Out
      </button>
    </div>
  )
}

export default SignOut;
