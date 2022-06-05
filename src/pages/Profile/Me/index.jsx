import react, {useContext, useEffect, useState} from 'react'
import Post from '../../../components/Post'
import AuthContext from '../../../context/AuthCotext/AuthProvider'
import { getMyFeed } from '../../../services/Posts.services'
import './styles.scss'
import LazyLoad from 'react-lazyload';
import Loader from '../../../components/Loader'
import EditProfileModal from '../../../components/EditProfileModal'

const Me = ()=>{

    const [authState, dispatch] = useContext(AuthContext)
    const [posts, setPosts] = useState(
        [
            {
                down_votes: 0,
                i_voted: 0,
                post_description: "Tpa",
                post_id: 65,
                post_image: "https://storage.googleapis.com/ritme-posts/3%2F9Lmrziq1SmImyeQQMy.png",
                post_tag: "Sports",
                profile_pic: "https://storage.googleapis.com/ritme-profiles/%2FQX%2BkL52G0pKOlmbPIGX.png",
                up_votes: 0,
                upload_time: "2022-05-23T00:34:10.000Z",
                user_id: 49,
                user_name: "dalia"
            },
        ]
    )

    const [loading, setLoading]  = useState(true)
    const [isOpen, setOpen] = useState(false)

    const getPosts = ()=>{
        getMyFeed(authState.userToken).then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
            
        })
    }

    const getMyPosts = ()=>{
        setLoading(true)
        getMyFeed(authState.userToken).then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
            
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        getMyPosts()
    }, [])

    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <>
            <div className="profile flex text-gray-200">
                <div className="userInfo flex">
                    <div className="">
                        <img className='r_rounded' src={authState.user.profile_pic} alt={authState.user.user_name} />
                    </div>
                    <div className="userMainInfo text-gray-100">
                        <h3>
                            {authState.user.user_name}
                        </h3>
                        <p>
                            {authState.user.user_description}
                        </p>
                    </div>
                </div>
                <div className="">
                    <button 
                        onClick={()=> setOpen(true)}
                        className='editProfile'>
                        Edit profile
                    </button>
                </div>
            </div>
            <div className="miFeed">
                {
                    posts.map((post, index)=>{
                        return(
                            <LazyLoad
                                key={post.post_id}
                                height={300} offset={100}
                            >
                                <Post
                                    key={post.post_id}
                                    down_votes={post.down_votes}
                                    i_voted={post.i_voted}
                                    post_description={post.post_description}
                                    post_id={post.post_id}
                                    post_image={post.post_image}
                                    post_tag={post.post_tag}
                                    profile_pic={post.profile_pic}
                                    up_votes={post.up_votes}
                                    upload_time={post.upload_time}
                                    user_id={post.user_id}
                                    user_name={post.user_name}
                                    updateFeed={getPosts}
                                />
                            </LazyLoad>
                        )
                    })
                }
            </div>
            <EditProfileModal isOpen={isOpen}>
                <button
                    onClick={()=> setOpen(false)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    Cancel
                </button>
            </EditProfileModal>
        </>
    )
}

export default Me