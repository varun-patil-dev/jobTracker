import { HiPencil, HiTrash, HiBookmark, HiOutlineBookmark } from 'react-icons/hi'
import { formatSalary, formatDate, getCompanyLogo, getStatusColor } from '../utils/helpers'
import { useApplicationContext } from '../context/ApplicationContext'

const JobCard = ({ job }) => {
  const { deleteApplication, toggleBookmark } = useApplicationContext()
  const statusColor = getStatusColor(job.status)

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(job.id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200">
              <img
                src={getCompanyLogo(job.company)}
                alt={job.company}
                className="w-8 h-8 object-contain"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/32?text=🏢')}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{job.role}</h3>
              <p className="text-gray-600 text-sm">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(job.id)}
              className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
              title={job.bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {job.bookmarked ? <HiBookmark className="text-yellow-500 text-xl" /> : <HiOutlineBookmark className="text-xl" />}
            </button>
            <button
              onClick={() => (window.location.href = `/applications/${job.id}`)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <HiPencil />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <HiTrash />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">📍 Location</span>
            <p className="font-medium text-gray-800">{job.location || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">💰 Salary</span>
            <p className="font-medium text-gray-800">{formatSalary(job.salary)}</p>
          </div>
          <div>
            <span className="text-gray-500">📅 Applied</span>
            <p className="font-medium text-gray-800">{formatDate(job.appliedDate)}</p>
          </div>
          <div>
            <span className="text-gray-500">📱 Platform</span>
            <p className="font-medium text-gray-800">{job.platform}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {job.status}
          </span>
          {job.interviewDate && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              🗓️ Interview: {formatDate(job.interviewDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobCard