import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {RiShareBoxLine} from 'react-icons/ri'
import {HiMail} from 'react-icons/hi'
import SimilarJobData from '../SimilarJobData'

import Header from '../Header'
import './index.css'

const apiConstantsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    similarJobsList: [],
    jobsDetails: {},
    apiStatus: apiConstantsStatus.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiConstantsStatus.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        title: each.title,
        id: each.id,
      }))
      const updatedSimilarJobsList = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        similarJobsList: updatedSimilarJobsList,
        jobsDetails: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  getSimilarJobs = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="similar-items-cards">
        <h1 className="similar-job-card-name">Similar Jobs</h1>
        <div className="similar-jobs-Details-list-card">
          {similarJobsList.map(eachJob => (
            <SimilarJobData key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </div>
      </ul>
    )
  }

  getSpecificJobDetails = () => {
    const {jobsDetails} = this.state
    if (jobsDetails.length >= 1) {
      const {
        companyLogoUrl,
        employmentType,
        jobDescription,
        location,
        packagePerAnnum,
        companyWebsiteUrl,
        lifeAtCompany,
        rating,
        title,
        skills,
      } = jobsDetails[0]
      return (
        <div className="job-item-card">
          <div className="logo-card">
            <img
              className="logo-img"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="logo-details">
              <h1 className="job-title">{title}</h1>
              <div className="logo-star-card">
                <AiFillStar className="icon-is" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locations-salary-card-details">
            <div className="location-internship-card">
              <div className="cards">
                <MdLocationOn className="icon-card" />
                <p className="headers">{location}</p>
              </div>
              <div className="cards">
                <HiMail className="icon-card" />
                <p className="headers">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <div className="description-card">
            <div className="description-headers-card">
              <h1 className="description-header">Description</h1>
              <div className="visit-link-card">
                <a className="visit-link-name" href={companyWebsiteUrl}>
                  Visit
                </a>
                <RiShareBoxLine className="visit-link" />
              </div>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div className="skills-details-card">
            <h1 className="description-header">Skills</h1>
            <ul className="skills-cards">
              {skills.map(eachItem => (
                <li className="skill-Item" key={eachItem.name}>
                  <img
                    className="skill-icon"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="description-header">Life at company</h1>
          <div className="life-at-company">
            <p className="skills-description">{lifeAtCompany.description}</p>
            <img
              className="life-at-company-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
      )
    }
    return null
  }

  renderSuccessView = () => (
    <div className="specific-details-card">
      {this.getSpecificJobDetails()}
      {this.getSimilarJobs()}
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-card">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="description-headers">Oops! Something Went Wrong</h1>
      <p className="description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="error-retry-btn"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  onClickRetry = () => {
    this.getJobsDetails()
  }

  renderLoadingView = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      case apiConstantsStatus.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        <div className="jobs-details-card">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
