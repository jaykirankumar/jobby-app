import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {IoMdMail} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link-card">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="icons-card">
        <li className="list-item">
          <Link to="/" className="link-card">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="link-card">
            <IoMdMail className="icon" />
          </Link>
        </li>
        <FiLogOut className="icon" onClick={onClickLogout} />
      </ul>
      <div className="headers-nav-card">
        <ul className="headers-card">
          <li className="list-item">
            <Link to="/" className="link-card">
              <p className="names">Home</p>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/jobs" className="link-card">
              <p className="names">Jobs</p>
            </Link>
          </li>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
