// AuthGuard.jsx
import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const AuthGuard = ({ element }) => {
    // Check if the user is logged in (you can use localStorage or any authentication mechanism)
    const isLoggedIn = !!localStorage.getItem('user') // Adjust this based on your authentication logic
    console.log(element)
    return isLoggedIn ? element : <Navigate to="/login" replace />
}

export default AuthGuard
