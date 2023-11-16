import { MdAdd } from 'react-icons/md'
import { useState, useEffect } from 'react'
import User from '../models/user'
export default function Projects() {
    const API_URL = 'http://localhost:3020/api/user/projects/:credential'

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const user = []

    useEffect(() => {
        // Step 1: Retrieve user data from localStorage
        const storedUserData = localStorage.getItem('user')

        // Step 2: Parse the JSON string to convert it to a JavaScript object
        const user = JSON.parse(storedUserData)

        // Step 3: Create an array and add the user object to it
        const userArray = [user]

        // Now you can use the userArray in your component
        console.log(userArray)
    }, [])

    const fetchProjects = async () => {
        try {
            setLoading(true)

            // Simulate an API call or any asynchronous operation
            const response = await fetch(API_URL)
            const result = await response.json()

            setData(result)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    return (
        <div className="h-screen">
            <div className="min-h-full">
                <header className=" shadow-sm ">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-0">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-400">Projects</h1>
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
                        {/* <button onClick={fetchProjects} disabled={loading}>
                            {loading ? 'Loading...' : 'Fetch Data'}
                        </button> */}

                        {/* <!-- Content --> */}
                        {data ? (
                            <>
                                <div className="flex flex-wrap justify-center w-[100] p-2 gap-3">
                                    {data &&
                                        data.map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-md shadow-lg bg-gray-600 grid mt-5 w-[30%] relative"
                                            >
                                                <a href="#">
                                                    <span className="absolute inset-0"></span>
                                                </a>
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
                                                            Description: {item.description}
                                                        </p>
                                                    </div>
                                                    <div className="relative mt-8 flex items-center gap-x-4">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                            className="h-10 w-10 rounded-full bg-gray-50"
                                                        />
                                                        <div className="text-sm leading-6">
                                                            <p className="font-semibold text-sky-400">Owner:</p>
                                                            <p className="text-slate-400">{item.owner}</p>
                                                        </div>
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
                                    <div className="rounded-md shadow-lg bg-gray-600 grid mt-5 w-[30%] relative">
                                        <a href="#">
                                            <span className="absolute inset-0"></span>
                                        </a>
                                        <article className="flex max-w-xl flex-col items-start justify-between py-5 px-5">
                                            <div className="flex items-center gap-x-4 text-xs">
                                                <time
                                                    dateTime="2020-03-16"
                                                    className="text-gray-200 font-medium text-base"
                                                >
                                                    Title
                                                </time>
                                                {/* <button
                                            type="button"
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1 font-medium text-slate-800 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button> */}
                                            </div>
                                            <div className="">
                                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                                                    Description: Illo sint voluptas. Error voluptates culpa eligendi.
                                                    Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.
                                                    Sed exercitationem placeat consectetur nulla deserunt vel. Iusto
                                                    corrupti dicta.
                                                </p>
                                            </div>
                                            <div className="relative mt-8 flex items-center gap-x-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                    className="h-10 w-10 rounded-full bg-gray-50"
                                                />
                                                <div className="text-sm leading-6">
                                                    <p className="font-semibold text-sky-400">Owner:</p>
                                                    <p className="text-slate-400">Driss Daif</p>
                                                </div>
                                            </div>
                                        </article>
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

{
    /* 


<div>
<button onClick={fetchData} disabled={loading}>
    {loading ? 'Loading...' : 'Fetch Data'}
</button>
{data ? (
    <div>
        <h2>Fetched Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
) : (
    <div>
        <h2>No data available</h2>
    </div>
)}
</div> 


*/
}
