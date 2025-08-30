'use client'

import { useState, useMemo } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useFetchAirdropFree } from '@/hooks/useFetchAirdrop'
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

export default function AirdropFreePage() {
  useAuthGuard()

  const { data, loading, error } = useFetchAirdropFree()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.task.toLowerCase().includes(search.toLowerCase()) ||
      item.level.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPaginationRange = () => {
    const range: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      range.push(1)
      if (currentPage > 3) range.push('ellipsis')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) range.push(i)
      if (currentPage < totalPages - 2) range.push('ellipsis')
      range.push(totalPages)
    }
    return range
  }

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Airdrop Free
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          List of free airdrop campaigns
        </p>
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

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-border-divider">
          <table className="w-full text-left">
            <thead className="bg-[var(--card-color3)]">
              <tr>
                <th className="px-6 py-2 min-w-[140px] whitespace-nowrap">Name</th>
                <th className="px-6 py-2 min-w-[140px] whitespace-nowrap">Task</th>
                <th className="px-6 py-2 min-w-[120px] whitespace-nowrap">Link</th>
                <th className="px-6 py-2 min-w-[100px] whitespace-nowrap">Level</th>
                <th className="px-6 py-2 min-w-[120px] whitespace-nowrap">Status</th>
                <th className="px-6 py-2 min-w-[130px] whitespace-nowrap">Backed</th>
                <th className="px-6 py-2 min-w-[120px] whitespace-nowrap">Funds</th>
                <th className="px-6 py-2 min-w-[150px] whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-t border-border-divider">
                    <td className="px-6 py-2">{item.name}</td>
                    <td className="px-6 py-2">{item.task}</td>
                    <td className="px-6 py-2 text-accent">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className='text-blue-500'>Visit</a>
                    </td>
                    <td className="px-6 py-2">{item.level}</td>
                    <td className="px-6 py-2">{item.status}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.backed}</td>
                    <td className="px-6 py-2">{item.funds}</td>
                    <td className="px-6 py-2 flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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

      {!loading && !error && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {getPaginationRange().map((page, index) =>
              page === 'ellipsis' ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(Number(page))}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
