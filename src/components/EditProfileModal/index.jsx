import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import { notify } from '../../helpers/const'
import { updateMe } from '../../services/User.services'
import ImageUploading from 'react-images-uploading';
import './styles.scss'

const  EditProfileModal = ({isOpen, children}) => {

  const [authState, dispatch] = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const [profileForm, setProfileForm] = useState({
    profile_pic: authState.user.profile_pic,
    user_name: authState.user.user_name,
    user_description: authState.user.user_description
  })

  const handleChange = (e, field) => {
    setProfileForm({ ...profileForm, [field]: e });
  };

  const updateProfile = ()=>{
    setLoading(true)
    updateMe(profileForm, authState.userToken).then((res)=>{
      notify("g", "Profile updated!")
    }).catch((err)=>{
      notify("e", err.response.data)
    }).finally(()=>{
      setLoading(false)
    })
  }

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setProfileForm({ ...profileForm, profile_pic: imageList[0]['data_url'] })
  };

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
                    <div className="mt-1 flex justify-center pt-2 pb-2">
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div 
                            className="
                              upload__image-wrapper w-full flex flex-col items-center text-gray-100
                              border-2 border-gray-300 border-dashed rounded-md
                            "
                          >
                            {
                              images.length === 0 
                              ?
                              <div className="w-full flex flex-col items-center">
                                <div className="image-item__btn-wrapper w-full flex flex-col items-center justify-center">
                                  <button className='w-full py-3'
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >
                                    <img className='uploadPic_ritme' src={profileForm.profile_pic} alt=""/>
                                    Update
                                  </button>
                                </div>
                              </div>
                              :
                              <div className="w-full flex flex-col items-center">
                                {imageList.map((image, index) => (
                                  <div key={index} className="image-item__btn-wrapper w-full flex flex-col items-center justify-center">
                                    <div className="image-item__btn-wrapper w-full">
                                      <button className='w-full py-3' onClick={() => onImageUpdate(index)}>
                                        <img className='uploadPic_ritme' src={image['data_url']} alt=""/>
                                        Update
                                      </button>
                                      {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            }
                            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                          </div>
                        )}
                      </ImageUploading>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="flex justify-start text-sm font-medium text-gray-100 items-start">
                        User name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          readOnly={loading}  
                          maxLength={16}
                          onChange={(e)=> handleChange(e.target.value, 'user_name')}
                          value={profileForm.user_name}
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 bg-black text-white"
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
                        readOnly={loading}
                        maxLength={150}
                        onChange={(e)=> handleChange(e.target.value, 'user_description')}
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block bg-black text-white w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="..."
                        value={profileForm.user_description}
                      />
                    </div>
                  </div>

                </div>
                <div className="px-4 py-3 flex flex-row-reverse justify-between sm:px-6"> 
                  {
                    loading
                    ?
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <div className="loaderButton">

                      </div>
                    </button>
                    :
                    <button
                      onClick={()=> updateProfile()}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  }
                  {!loading &&
                    children
                  }
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