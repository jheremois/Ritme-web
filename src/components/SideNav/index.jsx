import { useEffect, useState } from "react"
import './styles.scss'


import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import './styles.scss'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import { types } from '../../context/AuthCotext/AuthReducer'
import { Link } from "react-router-dom"
import CreatePostModal from "../CreatePostModal"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SideNav() {

    const [authState, dispatch] = useContext(AuthContext)
    const [isOpen, setOpen] = useState(false)

    const navigation = [
        { name: 'Home', icon: 'home', link: '/', current: true },
        // { name: 'Trending', icon: 'trending_up', link: '/trending', current: false },
        { name: 'Profile', icon: 'person', link: '/me', current: false },
    ]

    const logOut = ()=>{
        dispatch({
            type: types.authLogout
        })
        
        localStorage.removeItem('ritme-user')
    }

    useEffect(()=>{})

    return(
        <>
            <CreatePostModal isOpen={isOpen} setOpen={setOpen} />
            <div className="nav">
                <aside className="r_flexColumn r_dFlex">
                    <nav className="r_flexColumn r_dFlex ritme_nav">
                        {
                            navigation.map((res)=>(
                                <Link
                                    key={res.link + "-" + res.icon}
                                    to={res.link} className="option items-center flex"
                                >
                                    <span className="optionIcon material-symbols-outlined w-10 items-center flex justify-center">
                                        {res.icon}
                                    </span>
                                    <h3 className="optionText">
                                        {res.name}
                                    </h3>
                                </Link>
                            ))
                        }
                        {/* <div className="option addPostBoton items-center flex">
                            <span className="optionIcon material-symbols-outlined w-10 items-center flex justify-center">
                                add_circle
                            </span>
                            <h3 className="optionText">
                                Add post
                            </h3>
                        </div> */}
                        <button onClick={()=> setOpen(true)} className="my-3 option addPostBoton items-center flex">
                            <span className="optionIcon material-symbols-outlined w-10 items-center flex justify-center">
                                add
                            </span>
                            <h3 className="optionText">
                                New post
                            </h3>
                        </button>
                        <a href="https://play.google.com/store/apps/details?id=ritme.app" target='_blank' className="my-3 option getAppBoton items-center flex">
                            <span className="optionIcon material-symbols-outlined w-10 items-center flex justify-center">
                                file_download
                            </span>
                            <h3 className="optionText">
                                Get app
                            </h3>
                        </a>
                    </nav>
                    <div className="options">
                        <div className="userOptions">
                            <span className="r_dFlex items-center text-gray-100 justify-between">
                                <div className="userPres r_dFlex items-center">
                                    <img className="userPic r_rounded w-9" src={authState.user.profile_pic} alt={authState.user.user_name} />
                                    <div className="userName">
                                        {authState.user.user_name}
                                    </div>
                                </div>
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="openMenuBot w-10 h-5 justify-center items-center flex">
                                            <span className="material-symbols-outlined w-10 text-4xl">
                                                more_horiz
                                            </span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100 -translate-x-16 translate-y-12"
                                        enterFrom="transform opacity-0 scale-95 -translate-x-16 translate-y-12"
                                        enterTo="transform opacity-100 scale-100 -translate-x-16 translate-y-12"
                                        leave="transition ease-in duration-75 -translate-x-16 translate-y-12"
                                        leaveFrom="transform opacity-100 scale-100 -translate-x-16 translate-y-12"
                                        leaveTo="transform opacity-0 scale-95 -translate-x-16 translate-y-12"
                                    >
                                        <Menu.Items className="userMenuBot origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <Link 
                                                to={'/me'} 
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Your Profile
                                            </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <a 
                                                href="https://play.google.com/store/apps/details?id=ritme.app" 
                                                target='_blank'
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Download app
                                            </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                onClick={()=>{logOut()}}
                                                className={classNames(active ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Sign out
                                            </button>
                                            )}
                                        </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SideNav