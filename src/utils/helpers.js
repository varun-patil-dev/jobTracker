import { format } from 'date-fns'

export const formatSalary = (salary) => {
  if (!salary) return 'Not specified'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary)
}

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return format(new Date(dateString), 'MMM dd, yyyy')
  } catch {
    return dateString
  }
}

export const getCompanyLogo = (companyName) => {
  if (!companyName) return ''
  const domain = companyName.toLowerCase().replace(/\s+/g, '') + '.com'
  return `https://logo.clearbit.com/${domain}`
}

export const getStatusColor = (status) => {
  const colors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interview Scheduled': 'bg-purple-100 text-purple-800',
    'Offer Received': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export const getPlatformOptions = () => ['LinkedIn', 'Indeed', 'Company Site', 'Referral', 'Other']
export const getLocationTypeOptions = () => ['Remote', 'Onsite', 'Hybrid']
export const getStatusOptions = () => ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected']