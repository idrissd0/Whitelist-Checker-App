import { useEffect, useState } from 'react'

export default function Dashboard() {
    const [userData, setUserData] = useState(null)

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
        <div className="p-4 text-white">
            {userData ? (
                <div className="flex flex-col justify-center items-center py-8 gap-5">
                    <p>Username: {userData.username}</p>
                    <p>User Credentials: {userData.credential}</p>
                    <p className='flex flex-col items-center'>
                        User avatar:
                        <img src={userData.avatar} alt="User Avatar" />
                    </p>
                </div>
            ) : (
                <p>No user data found in localStorage.</p>
            )}
        </div>
    )
}
