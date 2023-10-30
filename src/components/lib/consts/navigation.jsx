import {
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaDiagramProject } from 'react-icons/fa6';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <BiSolidDashboard />,
        bg: ''
    },
    {
        key: 'projects',
        label: 'Projects',
        path: '/projects',
        icon: <FaDiagramProject />,
        bg: ''
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />,
        bg: ''
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />,
        bg: ''
    }
]
