"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useEffect, useRef } from 'react'
import { FiUsers, FiGithub, FiLoader } from 'react-icons/fi'
import { getGithubRepos } from '@/services/github-repos/githubReposService'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { LiaTimesCircleSolid } from 'react-icons/lia'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useAddGithubRepo } from '@/hooks/github-repos/useAddGithubRepo'
import { GithubRepoRequest } from '@/types/github-repos'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'

export default function AddGithubReposForm() {
  useAuthGuard()
  const [formData, setFormData] = useState<GithubRepoRequest>({
    name: '',
    description: '',
    category: '',
    repo_url: '',
    owner: '',
    repo_name: '',
    website: '',
    twitter: '',
    instagram: '',
    discord: ''
  })

  const { isSubmitting, submitGithubRepo } = useAddGithubRepo()

  const [existingUrls, setExistingUrls] = useState<string[]>([])
  const [isCheckingUrl, setIsCheckingUrl] = useState(false)
  const [urlExists, setUrlExists] = useState<boolean | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const repos = await getGithubRepos()
        const urls = repos.map(r => (r.repo_url || '').toLowerCase().replace(/\/$/, ''))
        setExistingUrls(urls)
      } catch (err) {
        console.error("Failed to load existing repos for validation", err)
      }
    }
    loadRepos()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setShowTooltip(false)
    if (!formData.repo_url) {
      setUrlExists(null)
      setIsCheckingUrl(false)
      return
    }

    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+(\/.*)?$/
    if (!githubRegex.test(formData.repo_url)) {
      setUrlExists(null)
      setIsCheckingUrl(false)
      return
    }

    setIsCheckingUrl(true)
    const timer = setTimeout(() => {
      const cleanUrl = formData.repo_url.toLowerCase().replace(/\/$/, '')
      const exists = existingUrls.includes(cleanUrl)
      setUrlExists(exists)
      setIsCheckingUrl(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [formData.repo_url, existingUrls])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      description: '',
      category: '',
      repo_url: '',
      owner: '',
      repo_name: '',
      website: '',
      twitter: '',
      instagram: '',
      discord: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) { toast.error('Please fill out Project Name'); return; }
    if (!formData.description) { toast.error('Please fill out Description'); return; }
    if (!formData.category) { toast.error('Please fill out Category'); return; }
    if (!formData.repo_url) { toast.error('Please fill out GitHub Repo URL'); return; }
    if (urlExists === true) { toast.error('This repo is already listed.'); return; }
    if (formData.repo_url && !validateUrl(formData.repo_url, 'github')) { toast.error('Invalid GitHub URL format'); return; }
    if (formData.website && !validateUrl(formData.website, 'website')) { toast.error('Invalid Website URL format'); return; }
    if (formData.twitter && !validateUrl(formData.twitter, 'twitter')) { toast.error('Invalid Twitter URL format'); return; }
    if (formData.instagram && !validateUrl(formData.instagram, 'instagram')) { toast.error('Invalid Instagram URL format'); return; }
    if (formData.discord && !validateUrl(formData.discord, 'discord')) { toast.error('Invalid Discord URL format'); return; }


    let owner = formData.owner;
    let repo_name = formData.repo_name;
    
    try {
      const cleanUrl = formData.repo_url.replace(/\/$/, '');
      const urlParts = new URL(cleanUrl).pathname.split('/').filter(Boolean);
      if (urlParts.length >= 2) {
        owner = urlParts[0];
        let name = urlParts[1];
        if (name.endsWith('.git')) {
          name = name.slice(0, -4);
        }
        repo_name = name;
      }
    } catch (err) {
      console.error("Invalid URL format");
    }

    const payload = {
      ...formData,
      owner,
      repo_name,
      added_by: {
        name: 'nekowawolf',
        url: 'https://nekowawolf.xyz'
      }
    };

    await submitGithubRepo(payload)
    resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New GitHub Repo
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new GitHub Repo listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Project Name *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="category">
                  Category *
                </label>
                <CustomDropdown
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(value) => handleDropdownChange('category', value)}
                  options={[
                    { value: 'Automation', label: 'Automation' },
                    { value: 'Development', label: 'Development' },
                    { value: 'AI', label: 'AI' },
                    { value: 'Infrastructure', label: 'Infrastructure' },
                    { value: 'Data', label: 'Data' },
                    { value: 'Design', label: 'Design' },
                    { value: 'Image', label: 'Image' },
                    { value: 'Video', label: 'Video' },
                    { value: 'Audio', label: 'Audio' },
                    { value: 'Security', label: 'Security' },
                    { value: 'Document', label: 'Document' },
                    { value: 'Learning', label: 'Learning' }
                  ]}
                  placeholder="Select Category"
                />
              </div>

              {/* Repo URL */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="repo_url">
                    Repository URL *
                  </label>
                  {isCheckingUrl && <FiLoader className="w-3.5 h-3.5 text-blue-500 animate-spin" />}
                  {!isCheckingUrl && urlExists !== null && (
                    <div ref={tooltipRef} className="flex items-center gap-1.5 relative">
                      {urlExists ? (
                        <LiaTimesCircleSolid className="w-[17px] h-[17px] text-red-500" />
                      ) : (
                        <FaRegCircleCheck className="w-3.5 h-3.5 text-green-500" />
                      )}
                      <button 
                        type="button" 
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="text-secondary/50 hover:text-secondary cursor-pointer transition-colors outline-none"
                      >
                        <AiOutlineExclamationCircle className="w-4 h-4" />
                      </button>
                      
                      {showTooltip && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-max bg-[var(--fill-color)] border border-border-color px-3 py-2 rounded-lg shadow-lg z-50 text-xs font-medium text-primary animate-in fade-in zoom-in duration-200">
                          {urlExists ? "This repo is already listed." : "This repo is not listed yet."}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="repo_url"
                    name="repo_url"
                    value={formData.repo_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/owner/repo"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="website">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Twitter */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="twitter">
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="instagram">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Discord */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="discord">
                  Discord URL
                </label>
                <input
                  type="url"
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleInputChange}
                  placeholder="https://discord.gg/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  {isSubmitting ? 'Creating...' : 'Create Repo'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
