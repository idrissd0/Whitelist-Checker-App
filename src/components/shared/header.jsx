import React, { useEffect, useState } from 'react'
import { HiOutlineSearch, HiOutlineAnnotation } from 'react-icons/hi'
import { BiWallet } from 'react-icons/bi'
import { IoLogIn } from 'react-icons/io5'
import { Popover, Transition, Menu } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [user, setUser] = useState({
        credential: '',
        username: '',
        avatar: '',
        projects: []
    })

    useEffect(() => {
        // Step 1: Retrieve user data from localStorage
        const storedUserData = localStorage.getItem('user')

        // Step 2: Parse the JSON string to convert it to a JavaScript object
        const userData = JSON.parse(storedUserData)

        // Step 3: Update the state with user data, or use an empty object if userData is falsy
        setUser(userData || {})

        // Now you can use the user state in your component
        console.log(userData)
    }, [])

    return (
        <div className=" bg-gray-800 h-16 px-4 flex justify-end items-center shadow-lg rounded-b-lg">
            {/* <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-2 " />
                this element is absolute because the parent is relative and we want it to be inside the next child element 'input'
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-8 pr-4 rounded-md"
                />
            </div> */}

            <div className="flex items-center justify-between gap-2 ">
                {/* here I used Popover from Headless UI - npm install @headlessui/react */}

                {/* Notif Popover */}
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-300 text-gray-600',
                                    'p-1.5 rounded-sm inline-flex items-center text-gray-400 hover:text-gray-600 hover:text-opacity-500 focus:outline-none active:bg-gray-100 '
                                )}
                            >
                                <HiOutlineAnnotation fontSize={22} />
                            </Popover.Button>
                            <Transition
                                enter="transition duration-400 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Popover.Panel className="absolute z-10 right-0 mt-2.5 w-60">
                                    <div className="grid bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                        <strong className="text-gray-700 font-medium text-center border-gray-500 w-max m-auto">
                                            Messages
                                        </strong>
                                        <div className="grid font-thin mt-2 ml-2 ">No messages yet</div>
                                    </div>

                                    <img src="/solutions.jpg" alt="" />
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                {/* Wallet Popover */}
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-300 text-gray-600',
                                    'p-1.5 rounded-sm inline-flex items-center text-gray-400 hover:text-gray-600 hover:text-opacity-500 focus:outline-none active:bg-gray-100 '
                                )}
                            >
                                <BiWallet fontSize={22} />
                            </Popover.Button>
                            <Transition
                                enter="transition duration-400 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Popover.Panel className="absolute z-10 right-0 mt-2.5 ">
                                    <div className="grid bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                        <strong className="text-gray-700 font-medium text-center border-gray-500 w-max m-auto">
                                            Wallet
                                        </strong>
                                        <div className="grid ">
                                            <a href="/analytics">Analytics</a>
                                            <a href="/engagement">Engagement</a>
                                            <a href="/security">Security</a>
                                            <a href="/integrations">Integrations</a>
                                        </div>
                                    </div>

                                    <img src="/solutions.jpg" alt="" />
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                {/* User Menu item fron Headless UI */}
                {Object.keys(user).length > 0 ? (
                    <Menu as="div" className="relative">
                        <div className="flex justify-center items-center">
                            <Menu.Button className="">
                                {/* These Spans' is just for SEO purpose - search engines */}
                                <span className="sr-only">Open user menu</span>
                                {/* here I generated a random images form Splash API */}
                                <div className="flex justify-center items-center">
                                    <div
                                        className="w-10 h-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                                        style={{ backgroundImage: `url("${user.avatar}")` }}
                                    >
                                        <span className="userName sr-only">{user.username}</span>
                                    </div>
                                    <div className="w-auto h-auto text-white ps-2 font-normal text-xl">
                                        <span className="">{user.username}</span>
                                    </div>
                                </div>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-400"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-200 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => navigate('/profile')}
                                                className={classNames(
                                                    // active ? 'bg-gray-200' : '',
                                                    pathname === '/profile' ? 'bg-gray-200' : '',
                                                    'group flex w-full items-center rounded-sm px-2 py-2 text-sm text-gray-900 font-medium'
                                                )}
                                            >
                                                Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => navigate('/profSettings')}
                                                className={classNames(
                                                    // active ? 'bg-gray-200' : '',
                                                    pathname === '/profSettings' ? 'bg-gray-200' : '',
                                                    'group flex w-full items-center rounded-sm px-2 py-2 text-sm text-gray-900 font-medium'
                                                )}
                                            >
                                                Settings
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => navigate('/logout')}
                                                className={classNames(
                                                    // active ? 'bg-gray-200' : '',
                                                    pathname === '/logout' ? 'bg-gray-200' : '',
                                                    'group flex w-full items-center rounded-sm px-2 py-2 text-sm text-gray-900 font-medium'
                                                )}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                ) : (
                    <div className="flex justify-center items-center text-gray-400">
                        <a href="/login" key='login'>
                        <IoLogIn fontSize={26} />
                        <span className="userName sr-only">Driss Daif</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
// https://source.unsplash.com/80x80?face
