'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState } from 'react'
import { FiUsers, FiLink } from 'react-icons/fi'
import { useAddSupporter } from '@/hooks/supporter/useAddSupporter'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'
import { AiOutlineDollar } from 'react-icons/ai'

export default function ClientAddSupporterPage() {
  useAuthGuard()
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    platform: '',
    amount: ''
  })

  const { isSubmitting, submitSupporter } = useAddSupporter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      platform: '',
      amount: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) { toast.error('Please fill out Name'); return; }
    if (!formData.platform) { toast.error('Please fill out Platform'); return; }
    
    if (formData.url && !validateUrl(formData.url, 'website')) { 
      toast.error('Invalid URL format'); 
      return; 
    }
    
    let parsedAmount = 0
    if (formData.amount) {
      parsedAmount = parseInt(formData.amount, 10)
      if (isNaN(parsedAmount)) {
        toast.error('Amount must be a number')
        return
      }
    }

    const payload = {
      name: formData.name,
      url: formData.url,
      platform: formData.platform,
      amount: parsedAmount
    }

    await submitSupporter(payload)
    resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Supporter
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new Supporter listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter supporter name"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="url">
                  Link / URL
                </label>
                <div className="relative">
                  <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Platform */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="platform">
                  Platform *
                </label>
                <CustomDropdown
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={(value) => handleDropdownChange('platform', value)}
                  options={[
                    { value: 'Ko-fi', label: 'Ko-fi' },
                    { value: 'Crypto', label: 'Crypto' }
                  ]}
                  placeholder="Select Platform"
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="amount">
                  Amount
                </label>
                <div className="relative">
                  <AiOutlineDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount (e.g. 100)"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? 'Creating...' : 'Create Supporter'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}