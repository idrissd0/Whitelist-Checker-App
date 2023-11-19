import React from 'react'
import { useLocation } from 'react-router-dom'

export default function DisplayProject(props) {
    const location = useLocation()
    const projectsArray = location.state ? location.state.projects : []

    return (
        <div className="w-full max-h-full ">
            <div className="m-5 bg-gray-600 rounded-lg p-1">
                {projectsArray.map((item, key) => (
                    <h2 className="w-fit m-auto text-white uppercase">{item.title}</h2>
                ))}
            </div>

            <div className="text-white p-5 m-5 flex justify-between bg-gray-600 rounded-lg lg:w-[800px] lg:mx-auto">
                <div className=" w-[30%]">
                    <p className="w-fit m-auto text-xl font-semibold font-mono text-sky-400">DETAILS</p>
                    {projectsArray.map((item) => (
                        <>
                            <span>
                                <p className=" text-gray-400">Description:</p>
                                <h2 className="pb-2">{item.description}</h2>
                            </span>
                        </>
                    ))}
                </div>
                <span className=" w-0.5 h-100 bg-white rounded-full opacity-10"></span>
                <div className=" w-[58%] break-words text-base font-extralight">
                    <p className="w-fit m-auto text-xl font-semibold font-mono text-sky-400">WALLETS</p>
                    {projectsArray.map((item, key) => (
                        <>
                            {item.whitelistedWallets.map((wallet) => (
                                <div className="pb-1 px-1 border-b bg-gray-700 rounded-md mb-3">
                                    <h2 className="">{wallet}</h2>
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
