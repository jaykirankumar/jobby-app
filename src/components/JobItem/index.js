import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {HiMail} from 'react-icons/hi'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-card-is">
      <li className="job-item-card">
        <div className="logo-card">
          <img className="logo-img" src={companyLogoUrl} alt="company logo" />
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
          <h1 className="description-header">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
