import { useState, useEffect, useContext } from "react";
import './styles.scss'
import {ReactComponent as ReactLogo} from '../../assets/vote_icon.svg';
import { Link } from "react-router-dom";
import { sendVote } from "../../services/Posts.services";
import AuthContext from "../../context/AuthCotext/AuthProvider";
import { notify } from "../../helpers/const";

function Post(
{
    down_votes,
    i_voted,
    post_description,
    post_id,
    post_image,
    post_tag,
    profile_pic,
    up_votes,
    upload_time,
    user_id,
    user_name,
    updateFeed
}
) {

    const [authState, dispatch] = useContext(AuthContext)

    const upVotesPercent = (up_votes / (up_votes + down_votes)) * 100
    const downVotesPercent = (down_votes / (up_votes + down_votes)) * 100

    const vote = (type)=>{
        sendVote(authState.userToken, post_id, type).then((res)=>{
        }).catch((err)=>{
            notify("e", err.response.data.errMessage);
        }).finally(()=>{
            updateFeed()
        })
    }

    const upload_date = upload_time.slice(0,10)

    return(
        <div className="postCard r_bgGray rounded-md m-5 shadow-lg">
            <div className="cardHeader flex px-5 pt-5">
                <div className="option items-center flex">
                    <img className="r_rounded porfileImg w-12 h-12" src={profile_pic} alt={user_name} />
                </div>
                <div className="postInfo px-3">
                    <div className="flex text-white">
                        <Link to={`/user/${user_id}`} className="option items-center flex">
                            <h4 className="text-white font-semibold">
                                {user_name}
                            </h4>
                        </Link>
                        <p className="mx-1 font-bold">
                            ◦
                        </p>
                        <p className="text-gray-400">
                            {upload_date}
                        </p>
                    </div>
                    <div className="tag flex my-2">
                        <div className="postTag border bg-gray-600 w-auto r_rounded text-white px-3">
                            {post_tag}
                        </div>
                    </div>
                </div>
            </div>
            <div className="postDescription pb-2 mx-3">
                <p className="text-gray-100 w-full flex">
                    {post_description}
                </p>
            </div>
            <div className="cardImg">
                <Link to={`/post/${post_id}`} className="option items-center flex">
                    <img className="w-full" src={post_image} alt={user_name + " on " + post_tag} />
                </Link>
            </div>
            <div className="cardFooter">
                <button
                onClick={
                    ()=>(
                        i_voted == 0 &&
                        vote('p')
                    )
                } 
                style={
                    i_voted == 0
                    ?
                    {
                        width: "50%"
                    }
                    :
                    {
                        background: 'var(--indigo)',
                        width: `${upVotesPercent}%`
                    }
                }
                className="upvote text-gray-50">
                    <ReactLogo className="upvote_icon"/>
                </button>
                <button
                onClick={
                    ()=>(
                        i_voted == 0 &&
                        vote('n')
                    )
                } 
                style={
                    i_voted == 0
                    ?
                    {
                        width: "50%"
                    }
                    :
                    {
                        background: 'var(--red)',
                        width: `${downVotesPercent}%`
                    }
                }
                className="downvote text-gray-50">
                    <ReactLogo className="downvote_icon"/>
                </button>
            </div>
        </div>
    )
}

export default Post