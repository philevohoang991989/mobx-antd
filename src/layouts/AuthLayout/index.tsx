import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.setProperty('--position-left-noti', '0')
  }, [])

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default AuthLayout
