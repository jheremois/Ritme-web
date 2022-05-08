import { useState } from "react"
import './styles.scss'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Trending', href: '#', current: false },
  { name: 'Profile', href: '#', current: false },
]

function SideNav() {

    const [active, setActve] = useState()

    return(
        <>
            <div className="nav r_bgGray">
                <aside className="r_flexColumn r_dFlex r_bgGray">
                    {
                        navigation.map((res)=>(
                            <a href="/" className="option">
                                {res.name}
                            </a>
                        ))
                    }
                </aside>
            </div>
        </>
    )
}

export default SideNav