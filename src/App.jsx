import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/layout'
import Dashboard from './components/dashboard'
import Projects from './components/projects'
import Login from './components/Auth/Login'
import AuthGuard from './AuthGuard' // Adjust the path based on your project structure

function App() {
    
    useEffect(() => {
        // Function to extract URL parameters
        const getUrlParameter = (name) => {
            name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
            const results = regex.exec(window.location.search)
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
        }

        // Extracting user data from URL parameters
        const username = getUrlParameter('username')
        const credential = getUrlParameter('credential')
        const avatar = getUrlParameter('avatar')

        // Check if all required parameters are present
        if (username && credential && avatar) {
            // Store user data in localStorage
            const user = { username, credential, avatar }
            localStorage.setItem('user', JSON.stringify(user))

            // Optionally, you can redirect the user to another page after storing the data
            // Example: window.location.href = '/dashboard';
        }
        console.log('localstorage data',localStorage.getItem('user'))

    }, []) // The empty dependency array ensures that this effect runs only once on component mount

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}
export default App
