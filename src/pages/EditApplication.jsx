import { useParams, useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../context/ApplicationContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getPlatformOptions, getLocationTypeOptions, getStatusOptions } from '../utils/helpers'
import { useEffect } from 'react'

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

const EditApplication = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, updateApplication } = useApplicationContext()
  const application = applications.find(app => app.id === id)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (application) {
      reset({
        company: application.company,
        role: application.role,
        location: application.location || '',
        salary: application.salary || '',
        platform: application.platform,
        status: application.status,
        appliedDate: application.appliedDate,
        interviewDate: application.interviewDate || '',
        notes: application.notes || '',
        locationType: application.locationType || 'Remote',
      })
    }
  }, [application, reset])

  if (!application) {
    return <div className="text-center py-12">Application not found</div>
  }

  const onSubmit = (data) => {
    updateApplication(id, { ...data, salary: data.salary ? Number(data.salary) : null })
    navigate('/applications')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="block font-medium mb-1">Company *</label><input {...register('company')} className="w-full border rounded-lg p-2.5" />{errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}</div>
          <div><label className="block font-medium mb-1">Role *</label><input {...register('role')} className="w-full border rounded-lg p-2.5" />{errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}</div>
          <div><label className="block font-medium mb-1">Location</label><input {...register('location')} className="w-full border rounded-lg p-2.5" /></div>
          <div><label className="block font-medium mb-1">Salary (USD)</label><input type="number" {...register('salary')} className="w-full border rounded-lg p-2.5" /></div>
          <div><label className="block font-medium mb-1">Platform</label><select {...register('platform')} className="w-full border rounded-lg p-2.5">{getPlatformOptions().map(opt => <option key={opt}>{opt}</option>)}</select></div>
          <div><label className="block font-medium mb-1">Location Type</label><select {...register('locationType')} className="w-full border rounded-lg p-2.5">{getLocationTypeOptions().map(opt => <option key={opt}>{opt}</option>)}</select></div>
          <div><label className="block font-medium mb-1">Status</label><select {...register('status')} className="w-full border rounded-lg p-2.5">{getStatusOptions().map(opt => <option key={opt}>{opt}</option>)}</select></div>
          <div><label className="block font-medium mb-1">Applied Date *</label><input type="date" {...register('appliedDate')} className="w-full border rounded-lg p-2.5" /></div>
          <div><label className="block font-medium mb-1">Interview Date</label><input type="date" {...register('interviewDate')} className="w-full border rounded-lg p-2.5" /></div>
          <div className="md:col-span-2"><label className="block font-medium mb-1">Notes</label><textarea rows={3} {...register('notes')} className="w-full border rounded-lg p-2.5" /></div>
        </div>
        <div className="flex gap-3"><button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700">Update</button><button type="button" onClick={() => navigate('/applications')} className="border px-6 py-2.5 rounded-lg">Cancel</button></div>
      </form>
    </div>
  )
}

export default EditApplication