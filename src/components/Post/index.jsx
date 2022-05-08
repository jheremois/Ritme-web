import { useState, useEffect } from "react";
import './styles.scss'
import {ReactComponent as ReactLogo} from '../../assets/vote_icon.svg';

function Post() {
    return(
        <div className="postCard r_bgGray rounded-md m-5 shadow-lg">
            <div className="cardHeader flex px-5 py-5">
                {/* <img className="r_rounded porfileImg w-12 h-12" src="https://storage.googleapis.com/ritme-posts/jheremois-ig-pic.jpg" alt="" /> */}
                <img className="r_rounded porfileImg w-12 h-12" src="https://storage.googleapis.com/ritme-profiles/3urktmhETseYCIgCQqqr.png" alt="" />
                <div className="postInfo px-3">
                    <div className="flex text-white">
                        <h4 className="text-white font-semibold">
                            Jheremy Castro
                        </h4>
                        <p className="mx-1 font-bold">
                            ◦
                        </p>
                        <p className="text-gray-400">
                            12 hours ago
                        </p>
                    </div>
                    <div className="tag flex my-2">
                        <div className="postTag border bg-gray-600 w-auto r_rounded text-white px-3">
                            Ciencia
                        </div>
                    </div>
                </div>
            </div>
            <div className="cardImg">
                <img className="w-full" src="https://storage.googleapis.com/ritme-profiles/3urktmhETseYCIgCQqqr.png" alt="" />
                {/* <img className="w-full" src="https://storage.googleapis.com/ritme-posts/jheremois-ig-pic.jpg" alt="" /> */}
            </div>
            <div className="cardFooter">
                <button className="upvote">
                    <ReactLogo className="upvote_icon"/>
                </button>
                <button className="downvote">
                    <ReactLogo className="downvote_icon"/>
                </button>
            </div>
        </div>
    )
}

export default Post