import React from 'react'
import {BsFillClipboard2CheckFill} from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="flex flex-col bg-gray-900 w-60 p-3 text-white rounded-br-lg">
            <div className="flex items-center px-1 py-3 ">
                <BsFillClipboard2CheckFill color={'blue'} fontSize={30} />
                <span className="text-neutral-100 text-lg px-2">Checker App</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5 ">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-500">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div className={classNames('text-red-500 rounded-lg cursor-pointer ', linkClass)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Log Out
                </div>
            </div>
        </div>
    )
}

function CustomColoredIcon({ icon, color }) {
    // Assuming 'icon' is a React component for an icon
    const IconComponent = React.cloneElement(icon, { color })
    return IconComponent
}

function SidebarLink({ item }) {
    // track which link location or which route is corrently active
    const { pathname } = useLocation()
    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? `text-white bg-slate-700 hover:bg-slate-700 ${item.bg = 'blue'}` : `text-neutral-400 ${item.bg = ''}`,
                'rounded-lg',
                linkClass
            )}
        >
            <span className="text-xl">
                <CustomColoredIcon icon={item.icon} color={item.bg} />
            </span>
            {item.label}
        </Link>
    )
}
// classNamse to combine classnames of a tag, and have multiple classNames.
// lib/constants/navigation, this helps to create multiple links with it's own label and icons. gathering links in one constants
