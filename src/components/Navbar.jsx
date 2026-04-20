import { NavLink } from 'react-router-dom'
import { HiBriefcase, HiChartBar, HiHome, HiPlusCircle } from 'react-icons/hi'

const Navbar = () => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: HiHome },
    { to: '/applications', label: 'Applications', icon: HiBriefcase },
    { to: '/analytics', label: 'Analytics', icon: HiChartBar },
    { to: '/applications/new', label: 'Add Job', icon: HiPlusCircle },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <HiBriefcase className="text-blue-600 text-2xl" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobTrackr
            </span>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="text-lg" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar