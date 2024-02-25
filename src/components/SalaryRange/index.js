import './index.css'

const SalaryRange = props => {
  const {employDetails, filterSalaryRange} = props
  const {label, salaryRangeId} = employDetails
  const onClickSalary = () => {
    filterSalaryRange(salaryRangeId)
  }
  return (
    <li className="employ-label-names-card">
      <input
        id={salaryRangeId}
        type="radio"
        className="checkbox"
        onClick={onClickSalary}
      />
      <label htmlFor={salaryRangeId} className="label-name">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
