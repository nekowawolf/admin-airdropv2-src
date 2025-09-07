'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useState, useRef, useEffect } from 'react'
import { FiGift } from 'react-icons/fi'
import { IoIosArrowUp } from "react-icons/io"
import { useEditAirdrop } from '@/hooks/useEditAirdrop'
import { AirdropFormData } from '@/types/airdrop'
import { useRouter } from 'next/navigation'

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={value ? "text-primary" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoIosArrowUp 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform rotate-180'
          }`}
        />
      </button>

      <div 
        id={id}
        className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-2 text-sm text-primary" aria-labelledby={`${id}-button`}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 hover:hover-bg ${
                  value === option.value ? 'hover-bg-accent text-accent' : ''
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
    </div>
  )
}

interface EditAirdropFormProps {
  airdropData: any
  type: 'paid' | 'free'
  onSuccess?: () => void
}

export default function EditAirdropForm({ airdropData, type, onSuccess }: EditAirdropFormProps) {
  useAuthGuard()
  const router = useRouter()
  const [formData, setFormData] = useState<AirdropFormData>({
    name: airdropData?.name || '',
    task: airdropData?.task || '',
    link: airdropData?.link || '',
    level: airdropData?.level || '',
    status: airdropData?.status || 'active',
    backed: airdropData?.backed || '',
    funds: airdropData?.funds || '',
    supply: airdropData?.supply || '',
    market_cap: airdropData?.market_cap || '',
    price: airdropData?.price?.toString() || '',
    vesting: airdropData?.vesting || '',
    usd_income: airdropData?.usd_income?.toString() || '',
    claim: airdropData?.link_claim || '',
  })

  const { isSubmitting, editAirdrop } = useEditAirdrop(type)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      price: Number(formData.price),
      usd_income: Number(formData.usd_income),
      link_claim: formData.claim
    }

    const success = await editAirdrop(airdropData.id, payload)
    if (success && onSuccess) {
      onSuccess()
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Edit {type === 'free' ? 'Free Airdrop' : 'Paid Airdrop'}
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update {type === 'free' ? 'free airdrop' : 'paid airdrop'} campaign information
        </p>
      </div>

      <div className="bg-card-color border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 bg-card-color2 rounded-lg p-3 border border-border-divider">
              <FiGift className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-primary">
                {type === 'free' ? 'Free Airdrop' : 'Paid Airdrop'}
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="name">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    required
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="task">
                    Task Type *
                  </label>
                  <input
                    type="text"
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleInputChange}
                    placeholder="e.g., daily, quest, testnet"
                    required
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="link">
                  Project Link *
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  required
                  className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="level">
                    Difficulty Level *
                  </label>
                  <CustomDropdown
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={(value) => handleDropdownChange('level', value)}
                    options={[
                      { value: 'easy', label: 'Easy' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'hard', label: 'Hard' }
                    ]}
                    placeholder="Select difficulty level"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="status">
                    Status *
                  </label>
                  <CustomDropdown
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(value) => handleDropdownChange('status', value)}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'ended', label: 'Ended' }
                    ]}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="backed">
                  Backed By *
                </label>
                <input
                  type="text"
                  id="backed"
                  name="backed"
                  value={formData.backed}
                  onChange={handleInputChange}
                  placeholder="e.g., HashKey Capital, ConsenSys"
                  required
                  className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="funds">
                    Funds Raised *
                  </label>
                  <input
                    type="text"
                    id="funds"
                    name="funds"
                    value={formData.funds}
                    onChange={handleInputChange}
                    placeholder="e.g., 53.37M"
                    required
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="supply">
                    Total Supply *
                  </label>
                  <input
                    type="text"
                    id="supply"
                    name="supply"
                    value={formData.supply}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.00B"
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="market_cap">
                    Market Cap *
                  </label>
                  <input
                    type="text"
                    id="market_cap"
                    name="market_cap"
                    value={formData.market_cap}
                    onChange={handleInputChange}
                    placeholder="e.g., 270M"
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="price">
                    Price *
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.01"
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="vesting">
                    Vesting *
                  </label>
                  <CustomDropdown
                    id="vesting"
                    name="vesting"
                    value={formData.vesting}
                    onChange={(value) => handleDropdownChange('vesting', value)}
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ]}
                    placeholder="Select vesting option"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="usd_income">
                    USD income *
                  </label>
                  <input
                    type="text"
                    id="usd_income"
                    name="usd_income"
                    value={formData.usd_income}
                    onChange={handleInputChange}
                    placeholder="e.g., $100 usd"
                    className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="claim">
                  Claim *
                </label>
                <input
                  type="text"
                  id="claim"
                  name="claim"
                  value={formData.claim}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Airdrop'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}