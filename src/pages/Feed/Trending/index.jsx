import { useContext, useEffect, useState } from 'react'
import Post from '../../../components/Post'
import AuthContext from '../../../context/AuthCotext/AuthProvider'
import { getFeed } from '../../../services/Posts.services'
import LazyLoad from 'react-lazyload';
import Loader from '../../../components/Loader'
import './styles.scss'

function Trending() {
  
    const [authState, dispatch] = useContext(AuthContext)
    const [posts, setPosts] = useState([{}])
    const [loading, setLoading]  = useState(true)
  
    const getMyFeed = () => {
      setLoading(true)
      getFeed(authState.userToken).then((posts)=>{
        setPosts(posts.data)
      }).catch((err)=>{
        
      }).finally(()=>{
        setLoading(false)
      })
    }
  
    useEffect(()=>{
      getMyFeed()
    }, [])
  
    if(loading){
      return(
        <Loader/>
      )
    }
  
    return (
      <>
         {
            posts.map((post, index)=>{
                return(
                  <LazyLoad
                    key={post.post_id}
                    height={300} offset={100}
                  >
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
                  </LazyLoad>
                )
            })
        }
      </>
    )
  }

export default Trending