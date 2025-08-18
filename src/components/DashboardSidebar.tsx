'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RxDashboard } from 'react-icons/rx'

type SidebarProps = {
	isOpen?: boolean
	onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
	const pathname = usePathname()

	const isActive = (href: string) => pathname.startsWith(href)

	const content = (
		<>
			<div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
				<img src="https://nekowawolf.github.io/delete-later/assets/img/icon_w.png" alt="logo" className="h-9 w-9 rounded-md object-cover" />
				<span className="text-xl font-semibold">NekoAdmin</span>
			</div>

			<nav className="px-4 py-6 space-y-2 overflow-y-auto">
				<p className="px-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">Menu</p>
				<Link
					href="/dashboard"
					className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
						isActive('/dashboard')
							? 'bg-indigo-50 text-indigo-600'
							: 'text-gray-700 hover:bg-gray-50'
					}`}
				>
					<RxDashboard className={`${isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-400'}`} size={18} />
					<span>Dashboard</span>
				</Link>
			</nav>
		</>
	)

	return (
		<>
			{/* Desktop sidebar */}
			<aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-gray-200 bg-white">
				{content}
			</aside>

			{/* Mobile drawer */}
			{isOpen ? (
				<div className="md:hidden fixed inset-0 z-50">
					<div className="absolute inset-0 bg-black/40" onClick={onClose} />
					<div className="absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-200 animate-[slideIn_.2s_ease-out]">
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


