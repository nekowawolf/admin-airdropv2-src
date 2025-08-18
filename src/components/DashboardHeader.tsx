'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { RxHamburgerMenu } from 'react-icons/rx'

type HeaderProps = {
	onToggleSidebar?: () => void
}

export default function DashboardHeader({ onToggleSidebar }: HeaderProps) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	const handleLogout = () => {
		localStorage.removeItem('token')
		toast.success('Logout successfully!')
		router.push('/login')
	}

	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', onClickOutside)
		return () => document.removeEventListener('mousedown', onClickOutside)
	}, [])

	return (
		<header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
			<div className="flex items-center gap-3">
				<button onClick={onToggleSidebar} className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100">
					<RxHamburgerMenu className="text-gray-700" size={20} />
				</button>
			</div>
			<div className="flex items-center gap-4">
				<button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50">
					<i className="fa-regular fa-moon text-gray-700" />
				</button>

				<div className="relative" ref={menuRef}>
					<button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2">
						<img src="https://avatars.githubusercontent.com/u/113094795?s=400&u=09f3e0e5f27350cd376caa27f7aa65cf46c9384c&v=4" alt="avatar" className="h-9 w-9 rounded-full object-cover" />
						<span className="hidden sm:block text-sm font-medium">admin</span>
						<i className={`fa-solid fa-caret-down text-gray-500 transition-transform duration-200 ${open ? 'rotate-0' : 'rotate-180'}`} />
					</button>
					{open && (
						<div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg p-2">
							<div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
								<i className="fa-regular fa-user text-gray-600" />
								<span className="text-sm cursor-pointer">Profile</span>
							</div>
							<button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-left">
								<i className="fa-solid fa-gear text-gray-600 cursor-pointer" />
								<span className="text-sm cursor-pointer">Account Settings</span>
							</button>
							<hr className="my-2" />
							<button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-left text-rose-600">
								<i className="fa-solid fa-arrow-right-from-bracket cursor-pointer" />
								<span className="text-sm cursor-pointer">Logout</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}


