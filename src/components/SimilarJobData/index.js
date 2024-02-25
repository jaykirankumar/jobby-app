import {HiMail} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobData = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    jobDescription,
  } = similarJobDetails
  return (
    <li className="similar-job-item-card">
      <div className="similar-job-logo-card">
        <img
          className="similar-job-logo-img"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-logo-details">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-logo-star-card">
            <AiFillStar className="similar-job-icon-is" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-job-description-card">
        <h1 className="similar-job-description-header">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
      </div>
      <div className="similar-job-locations-salary-card-details-is">
        <div className="similar-job-location-internship-card">
          <div className="similar-job-cards">
            <MdLocationOn className="similar-job-icon-card" />
            <p className="similar-job-headers">{location}</p>
          </div>
          <div className="similar-job-cards">
            <HiMail className="similar-job-icon-card" />
            <p className="similar-job-headers">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobData
