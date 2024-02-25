import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import TypesOfEmployment from '../TypesOfEmployment'
import SalaryRange from '../SalaryRange'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiConstantsStatus.initial,
    searchInput: '',
    employmentType: [],
    salaryRangeIs: 0,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchInput, employmentType, salaryRangeIs} = this.state
    this.setState({apiStatus: apiConstantsStatus.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRangeIs}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedList = data.jobs.map(eachItem => ({
        id: eachItem.id,
        rating: eachItem.rating,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        location: eachItem.location,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
        packagePerAnnum: eachItem.package_per_annum,
      }))
      this.setState({
        jobsList: updatedList,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length >= 1) {
      return jobsList.map(each => <JobItem jobDetails={each} key={each.id} />)
    }
    return this.renderNoJobsView()
  }

  renderNoJobsView = () => (
    <div className="no-jobs-failure-view-card">
      <img
        className="no-jobs-failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-failure-view-name">No Jobs Found</h1>
      <p className="no-jobs-view-description">
        We could not find any jobs. Try other filters
      </p>
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
        data-testid="button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickSearchInput = () => {
    this.getJobsList()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      case apiConstantsStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  filterEmploymentType = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJobsList,
    )
  }

  filterSalaryRange = id => {
    this.setState({salaryRangeIs: id}, this.getJobsList)
  }

  //   onEnterSearchInput = event => {
  //     if (event.key === 'Enter') {
  //       this.getJobs()
  //     }
  //   }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-filters-container">
          <div className="filtered-group">
            <div className="input-card">
              <input
                type="search"
                className="input"
                onChange={this.onChangeSearch}
                value={searchInput}
                placeholder="Search"
                // onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchInput}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-card">
              <Profile />
            </div>
            <ul className="employ-types-card">
              <h1 className="Headers-are">Type of Employment</h1>
              {employmentTypesList.map(eachObject => (
                <TypesOfEmployment
                  key={eachObject.employmentTypeId}
                  employDetails={eachObject}
                  filterEmploymentType={this.filterEmploymentType}
                />
              ))}
            </ul>
            <ul className="employ-salary-card">
              <h1 className="Headers-are">Salary Range</h1>
              {salaryRangesList.map(eachObject => (
                <SalaryRange
                  key={eachObject.salaryRangeId}
                  employDetails={eachObject}
                  filterSalaryRange={this.filterSalaryRange}
                />
              ))}
            </ul>
          </div>

          <ul className="job-Lists">
            <div className="input-card-lg">
              <input
                type="search"
                className="input"
                onChange={this.onChangeSearch}
                value={searchInput}
                placeholder="Search"
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchInput}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
