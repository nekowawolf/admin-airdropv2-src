'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { getAirdropFree, deleteAirdropFree } from '@/services/airdropService'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { cn } from "@/lib/utils"
import { HiEllipsisVertical } from "react-icons/hi2"
import { FaTrash } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { createPortal } from "react-dom"
import { toast } from 'sonner'

export default function AirdropFreePage() {
  useAuthGuard()

  // ===== STATE =====
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  // ===== FETCH DATA =====
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getAirdropFree()
      setData(result.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch airdrops')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  // ===== HANDLE CLICK OUTSIDE DROPDOWN =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ===== FILTER & PAGINATION =====
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.task.toLowerCase().includes(search.toLowerCase()) ||
      item.level.toLowerCase().includes(search.toLowerCase()) ||
      item.backed.toLowerCase().includes(search.toLowerCase()) ||
      item.funds.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const getPaginationRange = () => {
    const range: (number | string)[] = []
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      range.push(1)
      if (currentPage > 3) range.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) range.push(i)
      if (currentPage < totalPages - 2) range.push('...')
      range.push(totalPages)
    }
    return range
  }

  // ===== DROPDOWN ACTION =====
  const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - 144
    })
    setOpenDropdownIndex(index)
  }

  const handleEdit = (item: any) => {
    console.log("Edit:", item)
    setOpenDropdownIndex(null)
  }

  const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this airdrop?")) return

  try {
    setOpenDropdownIndex(null)
    await deleteAirdropFree(id)
    toast.success("Airdrop deleted successfully!")
    setData(prev => prev.filter(item => item.id !== id))

  } catch (err: any) {
    toast.error(err.message || "Failed to delete airdrop.")
  }
}

  // ===== RENDER =====
  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">Airdrop Free</h2>
        <p className="text-xs sm:text-sm text-secondary">List of free airdrop campaigns</p>
      </div>

      <input
        type="text"
        placeholder="Search airdrops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-border-divider bg-transparent text-primary rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-text-accent"
      />

      {loading && (
        <div className="flex justify-center py-10">
          <Spinner variant="circle" size={40} className="text-blue-500" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}  

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-border-divider">
          <table className="w-full text-left">
            <thead className="bg-[var(--card-color3)]">
              <tr>
                <th className="px-6 py-2 min-w-[140px]">Name</th>
                <th className="px-6 py-2 min-w-[140px]">Task</th>
                <th className="px-6 py-2 min-w-[120px]">Link</th>
                <th className="px-6 py-2 min-w-[100px]">Level</th>
                <th className="px-6 py-2 min-w-[120px]">Status</th>
                <th className="px-6 py-2 min-w-[130px]">Backed</th>
                <th className="px-6 py-2 min-w-[120px]">Funds</th>
                <th className="px-6 py-2 min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-t border-border-divider">
                    <td className="px-6 py-2">{item.name}</td>
                    <td className="px-6 py-2">{item.task}</td>
                    <td className="px-6 py-2 text-accent">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Visit</a>
                    </td>
                    <td className="px-6 py-2">{item.level}</td>
                    <td className="px-6 py-2">{item.status}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.backed}</td>
                    <td className="px-6 py-2">{item.funds}</td>
                    <td className="px-6 py-2 relative">
                      <button onClick={(e) => handleOpenDropdown(e, index)} className="p-2">
                        <HiEllipsisVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {openDropdownIndex !== null &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-30 w-36 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            <ul className="py-2 text-sm text-primary">
              <li>
                <button
                  onClick={() => handleEdit(paginatedData[openDropdownIndex])}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <MdEdit size={16} /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDelete(paginatedData[openDropdownIndex].id)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600"
                >
                  <FaTrash size={16} /> Delete
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )
      }

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <Pagination className="flex justify-center mt-4">
          <PaginationContent className="flex flex-wrap justify-center gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {getPaginationRange().map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis className="text-xs sm:text-base" />
                ) : (
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(Number(page))}
                    className={cn(
                      "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm transition-none"
                    )}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}