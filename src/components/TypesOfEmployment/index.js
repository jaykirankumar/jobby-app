import './index.css'

const TypesOfEmployment = props => {
  const {employDetails, filterEmploymentType} = props
  const {label, employmentTypeId} = employDetails
  const onClickEmployType = () => {
    filterEmploymentType(employmentTypeId)
  }
  return (
    <li className="employ-label-names-card">
      <input
        id={employmentTypeId}
        type="checkbox"
        onClick={onClickEmployType}
      />
      <label htmlFor={employmentTypeId} className="label-name">
        {label}
      </label>
    </li>
  )
}

export default TypesOfEmployment
