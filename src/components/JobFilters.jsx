import { getStatusOptions, getPlatformOptions, getLocationTypeOptions } from '../utils/helpers'

const JobFilters = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reset all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            {getStatusOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
          <select
            value={filters.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            {getPlatformOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
          <select
            value={filters.locationType}
            onChange={(e) => handleChange('locationType', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            {getLocationTypeOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default JobFilters