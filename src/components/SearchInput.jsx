import { HiSearch } from 'react-icons/hi'

const SearchInput = ({ value, onChange, placeholder = "Search by company or role..." }) => {
  return (
    <div className="relative">
      <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
    </div>
  )
}

export default SearchInput