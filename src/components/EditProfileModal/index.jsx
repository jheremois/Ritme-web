import { useContext } from 'react'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import './styles.scss'

const  EditProfileModal = ({isOpen, children}) => {

  const [authState, dispatch] = useContext(AuthContext)

  return (
    isOpen &&
    <div className="ModalHolder">
      <div className="modal r_bgGray rounded-md">
      <div>
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2 flex justify-start w-full">
            <div className='w-full'>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 sm:p-6">
                  <div>
                    <label className="flex text-sm font-medium text-gray-100 items-start">Profile picture</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white px-1 mx-1 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1 text-gray-100">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-300">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="flex justify-start text-sm font-medium text-gray-100 items-start">
                        User name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          defaultValue={authState.user.user_name}
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="User name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col w-full'>
                    <label htmlFor="about" className="flex text-sm font-medium text-gray-100 items-start">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="..."
                        defaultValue={authState.user.user_description}
                      />
                    </div>
                    <p className="mt-2 text-sm flex text-gray-200">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                </div>
                <div className="px-4 py-3 flex justify-between sm:px-6">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default EditProfileModal