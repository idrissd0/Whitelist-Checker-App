import { MdAdd } from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
    const [userData, setUserData] = useState(null)
    const [userProjects, setUserProjects] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserData = localStorage.getItem('user')

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData)
            setUserData(parsedUserData)

            const fetchUserProjects = async () => {
                if (parsedUserData && parsedUserData.credential) {
                    const URL = `http://localhost:3020/api/user/projects/${parsedUserData.credential}`
                    try {
                        const response = await fetch(URL, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })

                        if (!response.ok) {
                            throw new Error(`Failed to fetch user projects: ${response.status}`)
                        }

                        const projectsData = await response.json()
                        console.log(projectsData[0])
                        setUserProjects(projectsData)
                    } catch (error) {
                        console.error('Error fetching user projects:', error.message)
                    }
                }
            }

            fetchUserProjects()
        }
    }, [])

    const handleProjectClick = (projectsArray) => {
        navigate('/displayProject', { state: { projects: projectsArray } })
    }
    return (
        <div className="h-screen">
            <div className="min-h-full">
                <header className=" shadow-sm ">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-0">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-400 pl-5">Projects</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="relative rounded-md bg-emerald-600 pl-6 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-emerald-700 ring-inset hover:bg-emerald-700"
                        >
                            <MdAdd fontSize={18} className="absolute top-1/2 -translate-y-1/2 left-1 " />
                            New Project
                        </button>
                        {userProjects ? (
                            <>
                                <div className="flex flex-wrap justify-center w-[100] p-2 gap-3">
                                    {userProjects.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-md shadow-lg bg-gray-600 grid mt-5 w-[60%] lg:w-[40%] relative"
                                        >
                                            <button onClick={() => handleProjectClick(userProjects)}>
                                                <span className="absolute inset-0"></span>
                                            </button>
                                            <article className="flex max-w-xl flex-col items-start justify-between py-5 px-5">
                                                <div className="flex items-center gap-x-4 text-xs">
                                                    <time
                                                        dateTime="2020-03-16"
                                                        className="text-gray-200 font-medium text-base"
                                                    >
                                                        {item.title}
                                                    </time>
                                                </div>
                                                <div className="">
                                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                                                        <p className="font-semibold text-sky-400">Description: </p>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="relative mt-8 flex justify-between items-center gap-x-4 w-full">
                                                    <div className="text-sm leading-6">
                                                        <p className="font-semibold text-sky-400">Owner:</p>
                                                        <p className="text-slate-400">{item.owner}</p>
                                                    </div>
                                                    <img
                                                        src={userData.avatar}
                                                        alt="User Avatar"
                                                        className="h-10 w-10 rounded-full bg-gray-50"
                                                    />
                                                </div>
                                            </article>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-wrap justify-center w-[100] p-2 gap-3">
                                    {/* Static project card */}
                                    <div className="rounded-md shadow-lg bg-gray-600 mt-5 w-[30%] relative flex flex-col items-center justify-center text-white p-5">
                                        <h1>EMPTY </h1>
                                        <p className="text-black">(no projects yet)</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
