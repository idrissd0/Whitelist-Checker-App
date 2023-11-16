import { useEffect, useState } from 'react'

export default function Dashboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve user information from localStorage
        const storedUserData = localStorage.getItem('user')

        // Parse the JSON data
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData)
            setUserData(parsedUserData)
        }
    }, [])
    return (
        <div className="p-4">
            <h1>Dashboard page</h1>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>User ID: {userData.usercredentials}</p>
                    <img src={userData.avatar} alt="User Avatar" />
                </div>
            ) : (
                <p>No user data found in localStorage.</p>
            )}
        </div>
    )
}
