import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {profileData: {}, isDisplayed: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  successViewOfProfile = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-details-are">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-des">{shortBio}</p>
      </div>
    )
  }

  failureViewOfProfile = () => (
    <div className="error-details-are">
      <button
        className="error-retry-btn"
        type="button"
        onClick={this.retryingData}
      >
        Retry
      </button>
    </div>
  )

  retryingData = () => {
    this.getProfileDetails()
  }

  getProfile = () => {
    const {isDisplayed} = this.state
    return isDisplayed
      ? this.successViewOfProfile()
      : this.failureViewOfProfile()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: updatedData, isDisplayed: true})
    } else {
      this.setState({isDisplayed: false})
    }
  }

  render() {
    return this.getProfile()
  }
}
export default Profile
