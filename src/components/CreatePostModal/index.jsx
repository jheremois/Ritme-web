import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import { notify } from '../../helpers/const'
import { updateMe } from '../../services/User.services'
import ImageUploading from 'react-images-uploading';
import './styles.scss'
import { createNewPost } from '../../services/Posts.services';
import { useHistory } from 'react-router-dom';

const  CreatePostModal = ({isOpen, setOpen}) => {

  const history = useHistory()

  const [authState, dispatch] = useContext(AuthContext)

  //const [isOpen, setOpen] = useState(true)

  const [loading, setLoading] = useState(false)

  const [postForm, setPostForm] = useState({
    post_image: "",
    post_description: "",
    post_tag: ""
  })

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const handleChange = (e, field) => {
    setPostForm({ ...postForm, [field]: e });
  };

  const updateProfile = ()=>{
    setLoading(true)
    createNewPost(postForm, authState.userToken).then((res)=>{
      notify("g", "Post uploaded!")
      setOpen(false)
      setPostForm({
        post_image: "",
        post_description: "",
        post_tag: ""
      })
      setImages([])
      history.replace(`/post/${res.data.insertId}`)
    }).catch((err)=>{
      notify("e", err.response.data)
    }).finally(()=>{
      setLoading(false)
    })
  }


  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setPostForm({ ...postForm, post_image: imageList[0]['data_url'] })
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
                    <div className='flex flex-col w-full'>
                        <label htmlFor="about" className="flex text-sm font-medium text-gray-100 items-start">
                          Post description
                        </label>
                        <div className="mt-1">
                        <textarea
                            readOnly={loading}
                            maxLength={150}
                            onChange={(e)=> handleChange(e.target.value, 'post_description')}
                            value={postForm.post_description}
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block bg-black text-white w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="..."
                        />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="flex justify-start text-sm font-medium text-gray-100 items-start">
                          Post tag
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            readOnly={loading}  
                            maxLength={16}
                            onChange={(e)=> handleChange(e.target.value, 'post_tag')}
                            value={postForm.post_tag}
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 bg-black text-white"
                            placeholder="User name"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                        <label className="flex text-sm font-medium text-gray-100 items-start">Post picture</label>
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
                            onImageUpdate,
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
                                    <button className='w-full py-3 h-44 flex justify-center items-center'
                                        style={isDragging ? { color: 'red' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                      <span className="optionIcon material-symbols-outlined items-center flex justify-center" style={{fontSize: 70}}>
                                        add_photo_alternate
                                      </span>
                                    </button>
                                    </div>
                                </div>
                                :
                                <div className="w-full flex flex-col items-center">
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item__btn-wrapper w-full flex flex-col items-center justify-center">
                                        <div className="image-item__btn-wrapper w-full">
                                        <button className='w-full py-3' onClick={() => onImageUpdate(index)}>
                                            <img className='uploadPic_ritme_post' src={image['data_url']} alt=""/>
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
                      Post
                    </button>
                  }
                  {!loading &&
                    <button
                      onClick={()=> setOpen(false)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
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

export default CreatePostModal