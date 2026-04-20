import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import useLocalStorage from '../hooks/useLocalStorage'
import { fetchDummyJobs } from '../services/api'

const ApplicationContext = createContext()

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplicationContext must be used within ApplicationProvider')
  }
  return context
}

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('jobApplications', [])
  const [loading, setLoading] = useState(false)

  // Load sample data from dummy API if storage empty
  useEffect(() => {
    const loadInitialData = async () => {
      if (applications.length === 0) {
        setLoading(true)
        try {
          const dummyJobs = await fetchDummyJobs()
          setApplications(dummyJobs)
          toast.info('Loaded sample job listings 🚀')
        } catch (error) {
          console.error('Failed to load dummy data:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadInitialData()
  }, [])

  const addApplication = useCallback((newApp) => {
    setApplications(prev => [{ ...newApp, id: Date.now().toString(), bookmarked: false }, ...prev])
    toast.success('Application added successfully!')
  }, [setApplications])

  const updateApplication = useCallback((id, updatedData) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedData } : app))
    toast.success('Application updated!')
  }, [setApplications])

  const deleteApplication = useCallback((id) => {
    setApplications(prev => prev.filter(app => app.id !== id))
    toast.success('Application deleted')
  }, [setApplications])

  const toggleBookmark = useCallback((id) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ))
  }, [setApplications])

  const value = {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
  }

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}
