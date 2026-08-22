'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useImageData } from '@/hooks/images-resources/useImageData'
import StatCard from '@/components/airdrops/chart/StatCard'
import { VscFileMedia } from 'react-icons/vsc'
import { FaHdd, FaSort } from 'react-icons/fa'
import { useMemo, useState } from 'react'

const formatSize = (bytes: number) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useImageData()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const totalMedia = data.length

  const totalSize = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.size || 0), 0)
  }, [data])

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const sizeA = a.size || 0
      const sizeB = b.size || 0
      return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA
    })
  }, [data, sortOrder])

  const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Media Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your media resources
        </p>
      </div>

      {/* Media Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Media"
          value={totalMedia}
          icon={<VscFileMedia />}
          loading={loading}
        />
        <StatCard
          title="Total Size"
          value={formatSize(totalSize)}
          icon={<FaHdd />}
          loading={loading}
        />
      </section>

      {/* Sizes Section */}
      <section className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg font-semibold text-primary">Media Sizes</h3>
          <button 
            onClick={toggleSort}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[var(--hover-bg)] hover:bg-[var(--card-color2)] rounded-lg transition-colors text-sm font-medium text-primary border border-border-divider"
          >
            <FaSort />
            <span>Sort by Size ({sortOrder === 'desc' ? 'Largest First' : 'Smallest First'})</span>
          </button>
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-sm text-secondary">
            <thead className="text-xs text-muted uppercase bg-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">Filename</th>
                <th className="px-6 py-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center">No media found</td>
                </tr>
              ) : (
                sortedData.map((item, index) => (
                  <tr key={index} className="border-b border-border-divider hover:bg-[var(--hover-bg)] transition-colors">
                    <td className="px-6 py-4 font-medium text-primary break-all">
                      {item.filename || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatSize(item.size || 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}