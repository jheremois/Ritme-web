import react, {useContext, useState} from 'react'
import Post from '../../../components/Post'
import AuthContext from '../../../context/AuthCotext/AuthProvider'
import './styles.scss'

const Me = ()=>{

    const [authState, dispatch] = useContext(AuthContext)

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
                    <button className='editProfile'>
                        Edit profile
                    </button>
                </div>
            </div>
            <div className="miFeed">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </>
    )
}

export default Me