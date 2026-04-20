import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export const fetchDummyJobs = async () => {
  try {
    const response = await api.get('/products?limit=8')
    const products = response.data.products
    
    // Transform dummy products into job applications
    const jobApps = products.map((product, idx) => ({
      id: `sample-${product.id}`,
      company: product.brand || product.category.split('-')[0] || 'Tech Corp',
      role: product.title,
      location: ['Remote', 'Hybrid', 'New York', 'San Francisco', 'London'][idx % 5],
      salary: Math.floor(product.price * 1000) + 50000,
      platform: ['LinkedIn', 'Indeed', 'Company Site', 'Referral'][idx % 4],
      status: ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected'][idx % 4],
      appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interviewDate: idx % 3 === 0 ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '',
      notes: `Great opportunity at ${product.brand || 'company'} with exciting tech stack.`,
      bookmarked: idx % 5 === 0,
      locationType: ['Remote', 'Onsite', 'Hybrid'][idx % 3],
    }))
    return jobApps
  } catch (error) {
    console.error('Error fetching dummy jobs:', error)
    return []
  }
}

export default api