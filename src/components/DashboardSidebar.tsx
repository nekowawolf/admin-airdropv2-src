'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { RxDashboard } from 'react-icons/rx'
import { IoIosAddCircleOutline } from "react-icons/io"

type SidebarProps = {
	isOpen?: boolean
	onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
	const isActive = (href: string) => pathname.startsWith(href)
    const [openDropdown, setOpenDropdown] = useState(false)

    const handleDropdown = () => setOpenDropdown((v) => !v)

    const content = (
        <>
            <div className="h-16 flex items-center gap-3 px-6 sidebar-border border-b">
                <img src="https://nekowawolf.github.io/delete-later/assets/img/icon_w.png" alt="logo" className="h-9 w-9 rounded-md object-cover" />
                <span className="text-xl font-semibold text-primary">NekoAdmin</span>
            </div>

            <nav className="px-4 py-6 space-y-2 overflow-y-auto">
                <p className="px-2 text-xs font-semibold uppercase text-muted tracking-wider">Menu</p>
                {/* Dashboard with dropdown */}
                <div>
                    <button
                        type="button"
                        onClick={handleDropdown}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left ${
                            isActive('/dashboard')
                                ? 'hover-bg-accent text-accent'
                                : 'text-secondary hover:hover-bg'
                        }`}
                    >
                        <RxDashboard className={`${isActive('/dashboard') ? 'text-accent' : 'text-muted'}`} size={18} />
                        <span>Dashboard</span>
                        <i className={`fa-solid fa-caret-down ml-auto text-xs ${openDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown && (
                        <div className="pl-11 mt-1 space-y-1">
                            <Link
                                href="/dashboard"
                                className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                    pathname === '/dashboard'
                                        ? 'text-accent font-semibold'
                                        : 'text-secondary hover:text-accent'
                                }`}
                            >
                                Analytics
                            </Link>
                            <Link
                                href="/dashboard/airdrop-free"
                                className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                    isActive('/dashboard/airdrop-free')
                                        ? 'text-accent font-semibold'
                                        : 'text-secondary hover:text-accent'
                                }`}
                            >
                                Airdrop Free
                            </Link>
                            <Link
                                href="/dashboard/airdrop-paid"
                                className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                    isActive('/dashboard/airdrop-paid')
                                        ? 'text-accent font-semibold'
                                        : 'text-secondary hover:text-accent'
                                }`}
                            >
                                Airdrop Paid
                            </Link>
                            <Link
                                href="/dashboard/airdrop-ended"
                                className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                    isActive('/dashboard/airdrop-ended')
                                        ? 'text-accent font-semibold'
                                        : 'text-secondary hover:text-accent'
                                }`}
                            >
                                Airdrop Ended
                            </Link>
                        </div>
                    )}
                </div>
                {/* Add Airdrop */}
                <Link
                    href="/add-airdrop"
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive('/add-airdrop')
                            ? 'hover-bg-accent text-accent'
                            : 'text-secondary hover:hover-bg'
                    }`}
                >
                    <IoIosAddCircleOutline className={`${isActive('/add-airdrop') ? 'text-accent' : 'text-muted'}`} size={18} />
                    <span>Add Airdrop</span>
                </Link>
            </nav>
        </>
    )

	return (
		<>
			{/* Desktop sidebar */}
			<aside className="hidden md:flex md:flex-col md:h-screen w-64 shrink-0 sidebar-border border-r sidebar-bg">
				{content}
			</aside>

			{/* Mobile drawer */}
			{isOpen ? (
				<div className="md:hidden fixed inset-0 z-50">
					<div className="absolute inset-0 overlay-bg" onClick={onClose} />
					<div className="absolute inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r animate-[slideIn_.2s_ease-out]">
						{content}
					</div>
					<style jsx global>{`
						@keyframes slideIn { from { transform: translateX(-100%);} to { transform: translateX(0);} }
					`}</style>
				</div>
			) : null}
		</>
	)
}