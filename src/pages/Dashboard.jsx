import { useApplicationContext } from '../context/ApplicationContext'
import { HiBriefcase, HiCalendar, HiGift, HiXCircle } from 'react-icons/hi'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'

const Dashboard = () => {
  const { applications } = useApplicationContext()

  const totalApps = applications.length
  const interviews = applications.filter(app => app.status === 'Interview Scheduled').length
  const offers = applications.filter(app => app.status === 'Offer Received').length
  const rejections = applications.filter(app => app.status === 'Rejected').length

  const stageData = [
    { name: 'Applied', value: applications.filter(app => app.status === 'Applied').length },
    { name: 'Interview', value: interviews },
    { name: 'Offer', value: offers },
    { name: 'Rejected', value: rejections },
  ].filter(item => item.value > 0)

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#ef4444']

  const monthlyData = () => {
    const months = {}
    applications.forEach(app => {
      if (app.appliedDate) {
        const month = format(new Date(app.appliedDate), 'MMM yyyy')
        months[month] = (months[month] || 0) + 1
      }
    })
    return Object.entries(months).map(([month, count]) => ({ month, count })).slice(-6)
  }

  const stats = [
    { label: 'Total Applications', value: totalApps, icon: HiBriefcase, color: 'bg-blue-500' },
    { label: 'Interviews', value: interviews, icon: HiCalendar, color: 'bg-purple-500' },
    { label: 'Offers', value: offers, icon: HiGift, color: 'bg-green-500' },
    { label: 'Rejections', value: rejections, icon: HiXCircle, color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Application Stages</h2>
          {stageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stageData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">No data yet</div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Monthly Applications</h2>
          {monthlyData().length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData()}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">No applications yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard