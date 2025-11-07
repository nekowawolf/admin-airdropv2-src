'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RxDashboard } from 'react-icons/rx'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { HiMiniRocketLaunch } from 'react-icons/hi2'
import { FaLayerGroup } from 'react-icons/fa'

type SidebarProps = {
    isOpen?: boolean
    onClose?: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    const [openAirdrop, setOpenAirdrop] = useState(false)
    const [openDashboard, setOpenDashboard] = useState(false)
    const [openCommunity, setOpenCommunity] = useState(false)
    const [openCommunityDashboard, setOpenCommunityDashboard] = useState(false)

    // === HANDLE ACTIVE SECTIONS ===
    useEffect(() => {
        setOpenAirdrop(false)
        setOpenDashboard(false)
        setOpenCommunity(false)
        setOpenCommunityDashboard(false)

        // === AIRDROP PATH ===
        if (pathname.startsWith('/airdrop-menu/dashboard')) {
            setOpenAirdrop(true)
            if (!pathname.includes('/add-airdrop')) {
                setOpenDashboard(true)
            }
        }

        // === COMMUNITY PATH ===
        if (pathname.startsWith('/community-menu/dashboard')) {
            setOpenCommunity(true)
            if (!pathname.includes('/add-community')) {
                setOpenCommunityDashboard(true)
            }
        }
    }, [pathname])

    // === HANDLERS ===
    const handleAirdropDropdown = () => {
        setOpenAirdrop((prev) => {
            const next = !prev
            if (next) {
                setOpenCommunity(false)
                setOpenCommunityDashboard(false)
            }
            return next
        })
    }

    const handleDashboardDropdown = () => setOpenDashboard((v) => !v)

    const handleCommunityDropdown = () => {
        setOpenCommunity((prev) => {
            const next = !prev
            if (next) {
                setOpenAirdrop(false)
                setOpenDashboard(false)
            }
            return next
        })
    }

    const handleCommunityDashboardDropdown = () =>
        setOpenCommunityDashboard((v) => !v)

    // === ACTIVE PATH DETECTION ===
    const isAnalyticsActive = pathname === '/airdrop-menu/dashboard'
    const isFreeActive = pathname === '/airdrop-menu/dashboard/airdrop/free'
    const isPaidActive = pathname === '/airdrop-menu/dashboard/airdrop/paid'
    const isEndedActive = pathname === '/airdrop-menu/dashboard/airdrop/ended'
    const isAddAirdropActive =
        pathname === '/airdrop-menu/dashboard/add-airdrop'
    const isDashboardPathActive =
        pathname.startsWith('/airdrop-menu/dashboard') &&
        !pathname.includes('/add-airdrop')

    const isCommunityAnalyticActive = pathname === '/community-menu/dashboard'
    const isAddCommunityActive =
        pathname === '/community-menu/dashboard/add-community'
    const isCommunityDashboardPathActive =
        pathname.startsWith('/community-menu/dashboard') &&
        !pathname.includes('/add-community')

    // === SIDEBAR CONTENT ===
    const content = (
        <>
            {/* Sidebar Header */}
            <div className="h-16 flex items-center gap-3 px-6 sidebar-border border-b">
                <img
                    src="https://nekowawolf.github.io/delete-later/assets/img/icon_w.png"
                    alt="logo"
                    className="h-9 w-9 rounded-md object-cover"
                />
                <span className="text-xl font-semibold text-primary">
                    NekoAdmin
                </span>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2 overflow-y-auto">
                <p className="px-2 text-xs font-semibold uppercase text-muted tracking-wider">
                    Menu
                </p>

                {/* === Airdrop Group === */}
                <div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/airdrop-menu/dashboard"
                            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                pathname.startsWith('/airdrop-menu/dashboard')
                                    ? 'border-accent text-accent bg-accent/10'
                                    : openAirdrop
                                    ? 'border-accent text-accent bg-accent/10'
                                    : 'border-transparent text-secondary hover:hover-bg'
                            }`}
                        >
                            <HiMiniRocketLaunch
                                className={`${
                                    pathname.startsWith('/airdrop-menu/dashboard')
                                        ? 'text-accent'
                                        : openAirdrop
                                        ? 'text-accent'
                                        : 'text-muted'
                                }`}
                                size={18}
                            />
                            <span>Airdrop</span>
                        </Link>
                        <button
                            type="button"
                            onClick={handleAirdropDropdown}
                            aria-expanded={openAirdrop}
                            className="p-2 rounded-md text-muted hover:text-accent"
                            title="Toggle Airdrop menu"
                        >
                            <i
                                className={`fa-solid fa-caret-down text-xs transition-transform ${
                                    openAirdrop ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    </div>

                    {openAirdrop && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openDashboard ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/airdrop-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isAnalyticsActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytics
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/free"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isFreeActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Free
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/paid"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isPaidActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Paid
                                    </Link>
                                    <Link
                                        href="/airdrop-menu/dashboard/airdrop/ended"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isEndedActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Airdrop Ended
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/airdrop-menu/dashboard/add-airdrop"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddAirdropActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddAirdropActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Airdrop</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* === Community Group === */}
                <div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/community-menu/dashboard"
                            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                pathname.startsWith('/community-menu/dashboard')
                                    ? 'border-accent text-accent bg-accent/10'
                                    : openCommunity
                                    ? 'border-accent text-accent bg-accent/10'
                                    : 'border-transparent text-secondary hover:hover-bg'
                            }`}
                        >
                            <FaLayerGroup
                                className={`${
                                    pathname.startsWith('/community-menu/dashboard')
                                        ? 'text-accent'
                                        : openCommunity
                                        ? 'text-accent'
                                        : 'text-muted'
                                }`}
                                size={18}
                            />
                            <span>Community</span>
                        </Link>
                        <button
                            type="button"
                            onClick={handleCommunityDropdown}
                            aria-expanded={openCommunity}
                            className="p-2 rounded-md text-muted hover:text-accent"
                            title="Toggle Community menu"
                        >
                            <i
                                className={`fa-solid fa-caret-down text-xs transition-transform ${
                                    openCommunity ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    </div>

                    {openCommunity && (
                        <div className="pl-8 mt-2 space-y-1">
                            <button
                                type="button"
                                onClick={handleCommunityDashboardDropdown}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-left border-l-4 ${
                                    isCommunityDashboardPathActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <RxDashboard
                                    className={`${
                                        isCommunityDashboardPathActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Dashboard</span>
                                <i
                                    className={`fa-solid fa-caret-down ml-auto text-xs transition-transform ${
                                        openCommunityDashboard
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                />
                            </button>

                            {openCommunityDashboard && (
                                <div className="pl-8 mt-1 space-y-1">
                                    <Link
                                        href="/community-menu/dashboard"
                                        className={`block rounded-lg px-0 py-2 text-sm transition-colors ${
                                            isCommunityAnalyticActive
                                                ? 'text-accent font-semibold'
                                                : 'text-secondary hover:text-accent'
                                        }`}
                                    >
                                        Analytic
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/community-menu/dashboard/add-community"
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${
                                    isAddCommunityActive
                                        ? 'border-accent text-accent bg-accent/10'
                                        : 'border-transparent text-secondary hover:hover-bg'
                                }`}
                            >
                                <IoIosAddCircleOutline
                                    className={`${
                                        isAddCommunityActive
                                            ? 'text-accent'
                                            : 'text-muted'
                                    }`}
                                    size={18}
                                />
                                <span>Add Community</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r">
                {content}
            </aside>

            {/* Mobile drawer */}
            {isOpen ? (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 overlay-bg"
                        onClick={onClose}
                    />
                    <div className="absolute inset-y-0 left-0 w-64 sidebar-bg sidebar-border border-r animate-[slideIn_.2s_ease-out]">
                        {content}
                    </div>
                    <style jsx global>{`
                        @keyframes slideIn {
                            from {
                                transform: translateX(-100%);
                            }
                            to {
                                transform: translateX(0);
                            }
                        }
                    `}</style>
                </div>
            ) : null}
        </>
    )
}