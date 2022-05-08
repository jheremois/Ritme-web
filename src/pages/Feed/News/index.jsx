import Header from '../../../components/Header'
import Post from '../../../components/Post'
import SideNav from '../../../components/SideNav'
import './styles.scss'

function News() {
  return (
    <>
        <Header></Header>
        <div id="appDash">
          <SideNav/>
          <div className="appFeed">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
          </div>
          <SideNav/>
        </div>
    </>
  )
}

export default News