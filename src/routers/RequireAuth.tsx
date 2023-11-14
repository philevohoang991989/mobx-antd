import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { storageKeys } from 'constants/storage-keys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RequireAuth = ({ children }: any) => {
  const location = useLocation()
  const isAuthenticated = !!localStorage.getItem(storageKeys.USER_ACCESS_TOKEN)
  
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />
  } else {
    return children
  }
}

export default RequireAuth
