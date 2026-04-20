import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../context/ApplicationContext'
import { getPlatformOptions, getLocationTypeOptions, getStatusOptions } from '../utils/helpers'

const schema = yup.object({
  company: yup.string().required('Company name required'),
  role: yup.string().required('Job role required'),
  location: yup.string(),
  salary: yup.number().typeError('Must be a number').positive().nullable(),
  platform: yup.string(),
  status: yup.string(),
  appliedDate: yup.string().required('Applied date required'),
  interviewDate: yup.string(),
  notes: yup.string(),
  locationType: yup.string(),
})

const AddApplication = () => {
  const navigate = useNavigate()
  const { addApplication } = useApplicationContext()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      platform: 'LinkedIn',
      locationType: 'Remote',
    }
  })

  const onSubmit = (data) => {
    const newApp = {
      ...data,
      id: Date.now().toString(),
      bookmarked: false,
      salary: data.salary ? Number(data.salary) : null,
    }
    addApplication(newApp)
    navigate('/applications')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium mb-1">Company *</label>
            <input {...register('company')} className="w-full border rounded-lg p-2.5" />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Role *</label>
            <input {...register('role')} className="w-full border rounded-lg p-2.5" />
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input {...register('location')} className="w-full border rounded-lg p-2.5" placeholder="e.g., New York" />
          </div>
          <div>
            <label className="block font-medium mb-1">Salary (USD)</label>
            <input type="number" {...register('salary')} className="w-full border rounded-lg p-2.5" placeholder="85000" />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Platform</label>
            <select {...register('platform')} className="w-full border rounded-lg p-2.5">
              {getPlatformOptions().map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Location Type</label>
            <select {...register('locationType')} className="w-full border rounded-lg p-2.5">
              {getLocationTypeOptions().map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select {...register('status')} className="w-full border rounded-lg p-2.5">
              {getStatusOptions().map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Applied Date *</label>
            <input type="date" {...register('appliedDate')} className="w-full border rounded-lg p-2.5" />
            {errors.appliedDate && <p className="text-red-500 text-sm">{errors.appliedDate.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Interview Date</label>
            <input type="date" {...register('interviewDate')} className="w-full border rounded-lg p-2.5" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Notes</label>
            <textarea rows={3} {...register('notes')} className="w-full border rounded-lg p-2.5" placeholder="Add any details..." />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">Save Application</button>
          <button type="button" onClick={() => navigate('/applications')} className="border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddApplication