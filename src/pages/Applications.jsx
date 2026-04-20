import { useState, useMemo } from 'react'
import { useApplicationContext } from '../context/ApplicationContext'
import JobCard from '../components/JobCard'
import SearchInput from '../components/SearchInput'
import JobFilters from '../components/JobFilters'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'

const Applications = () => {
  const { applications } = useApplicationContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: '', platform: '', locationType: '' })
  const [sortBy, setSortBy] = useState('appliedDate')
  const [sortOrder, setSortOrder] = useState('desc')
  const [activeTab, setActiveTab] = useState('Applied')
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)

  const tabs = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected']

  const filteredApps = useMemo(() => {
    let filtered = applications.filter(app => {
      const matchesTab = app.status === activeTab
      const matchesSearch = searchTerm === '' || 
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filters.status || app.status === filters.status
      const matchesPlatform = !filters.platform || app.platform === filters.platform
      const matchesLocationType = !filters.locationType || app.locationType === filters.locationType
      const matchesBookmark = !showBookmarkedOnly || app.bookmarked === true
      
      return matchesTab && matchesSearch && matchesStatus && matchesPlatform && matchesLocationType && matchesBookmark
    })

    filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (sortBy === 'salary') {
        aVal = a.salary || 0
        bVal = b.salary || 0
      } else if (sortBy === 'appliedDate') {
        aVal = new Date(a.appliedDate)
        bVal = new Date(b.appliedDate)
      } else if (sortBy === 'company') {
        aVal = a.company.toLowerCase()
        bVal = b.company.toLowerCase()
      }
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1
      return aVal < bVal ? 1 : -1
    })
    return filtered
  }, [applications, activeTab, searchTerm, filters, sortBy, sortOrder, showBookmarkedOnly])

  const handleResetFilters = () => {
    setFilters({ status: '', platform: '', locationType: '' })
    setSearchTerm('')
    setShowBookmarkedOnly(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${showBookmarkedOnly ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            ⭐ Bookmarked only
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 font-medium transition-all relative ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab} ({applications.filter(a => a.status === tab).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <JobFilters filters={filters} onFilterChange={setFilters} onReset={handleResetFilters} />
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full rounded-lg border-gray-300">
              <option value="appliedDate">Applied Date</option>
              <option value="salary">Salary</option>
              <option value="company">Company Name</option>
            </select>
            <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="mt-3 w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
              {sortOrder === 'asc' ? <HiSortAscending /> : <HiSortDescending />}
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {filteredApps.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-400 border">
              No applications found. Try adjusting filters or add a new job.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredApps.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applications