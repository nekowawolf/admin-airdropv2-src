"use client"

import type { ReactNode } from 'react'
import { useState } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<div className="flex">
				<DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
				<div className="flex-1 flex flex-col min-w-0">
					<DashboardHeader onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
					<main className="p-4 md:p-6">{children}</main>
				</div>
			</div>
		</div>
	)
}


