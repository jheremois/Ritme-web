import SideNav from "../SideNav"
import './styles.scss'

const Dashboard = ({children})=>{
    return(
        <div className="">
            <div id="appDash">
                <SideNav/>
                <div className="appContent">
                    {children}
                </div>
                <div className="leftspacer"/>
            </div>
        </div>
    )
}


export default Dashboard