import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import Post from '../../components/Post'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import { getFeed, getPost } from '../../services/Posts.services'
import './styles.scss'

const OpenPost = ()=>{

    const [authState, dispatch] = useContext(AuthContext)
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [noPost, setNoPost] = useState(false)

    const { id } = useParams()
    const history = useHistory()

    useEffect(()=>{
        getPost(authState.userToken, id).then((res)=>{
            setPost(res.data[0])
            console.log("bien");
        }).catch(()=>{
            console.log("mal");
            setNoPost(true)
        }).finally(()=>{
            setLoading(false)
        })
    }, [])

    return(
        <>
            {
                loading
                ?
                    <Loader/>
                :
                    noPost
                    ?
                        <h1 className='text-gray-200 font-semibold text-4xl my-12'> 
                            No post
                        </h1>
                    :
                        <div className="">
                            <Post
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
                            />
                        </div>
            }
        </>
    )
}

export default OpenPost