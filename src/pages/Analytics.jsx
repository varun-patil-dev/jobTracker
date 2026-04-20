import { useApplicationContext } from '../context/ApplicationContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format } from 'date-fns'

const Analytics = () => {
  const { applications } = useApplicationContext()

  const stageCounts = {
    Applied: applications.filter(a => a.status === 'Applied').length,
    'Interview Scheduled': applications.filter(a => a.status === 'Interview Scheduled').length,
    'Offer Received': applications.filter(a => a.status === 'Offer Received').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length,
  }

  const pieData = Object.entries(stageCounts).map(([name, value]) => ({ name, value })).filter(d => d.value > 0)

  const monthlyApplications = applications.reduce((acc, app) => {
    if (app.appliedDate) {
      const month = format(new Date(app.appliedDate), 'MMM yyyy')
      acc[month] = (acc[month] || 0) + 1
    }
    return acc
  }, {})

  const barData = Object.entries(monthlyApplications).map(([month, count]) => ({ month, count }))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Analytics Hub</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Application Status Distribution</h2>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((_, idx) => <Cell key={idx} fill={['#3b82f6', '#8b5cf6', '#10b981', '#ef4444'][idx % 4]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-64 flex items-center justify-center text-gray-400">No data</div>}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
          {barData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="h-64 flex items-center justify-center text-gray-400">No applications yet</div>}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Platform Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(applications.reduce((acc, app) => {
            acc[app.platform] = (acc[app.platform] || 0) + 1
            return acc
          }, {})).map(([platform, count]) => (
            <div key={platform} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-semibold">{platform}</p>
              <p className="text-2xl font-bold text-blue-600">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics