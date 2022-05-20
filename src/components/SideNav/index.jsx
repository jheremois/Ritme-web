import { useState } from "react"
import './styles.scss'


import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import './styles.scss'
import AuthContext from '../../context/AuthCotext/AuthProvider'
import LoadContext from '../../context/LoadContext/LoadContext'
import { types } from '../../context/AuthCotext/AuthReducer'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SideNav() {

    const [authState, dispatch] = useContext(AuthContext)
    //const [authStates, dispatchs] = useContext(LoadContext)

    const navigation = [
        { name: 'Home', icon: 'home', href: '#', current: true },
        { name: 'Trending', icon: 'trending_up', href: '#', current: false },
        { name: 'Profile', icon: 'person', href: '#', current: false },
    ]

    return(
        <>
            <div className="nav">
                <aside className="r_flexColumn r_dFlex">
                    <nav className="r_flexColumn r_dFlex">
                        {
                            navigation.map((res)=>(
                                <a href="/" className="option items-center flex">
                                    <span class="optionIcon material-symbols-outlined w-10 items-center flex justify-center">
                                        {res.icon}
                                    </span>
                                    <h3 className="optionText">
                                        {res.name}
                                    </h3>
                                </a>
                            ))
                        }
                    </nav>
                    <div className="options">
                        <div className="userOptions">
                            <span className="r_dFlex items-center text-gray-100 justify-between">
                                <div className="userPres r_dFlex items-center">
                                    <img className="userPic r_rounded w-9" src="https://storage.googleapis.com/ritme-posts/jheremois-ig-pic.jpg" alt="" />
                                    <div className="userName">
                                        Jheremois
                                    </div>
                                </div>
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="openMenuBot w-10 h-5 justify-center items-center flex">
                                            <span class="material-symbols-outlined w-10 text-4xl">
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
                                            <a
                                                href="#"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Your Profile
                                            </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Settings
                                            </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                onClick={()=>{
                                                dispatch({
                                                    type: types.authLogout
                                                })
                                                window.location.reload()
                                                }}
                                                href="#"
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