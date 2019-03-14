import React from 'react';
import classnames from 'classnames';

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  type,
  onChange,
  options
}) => {
  const selectOptions = options.map((option) => {
    return (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    )
  })
  return (
    <div className="form-group">
      <select 
        type={type} 
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      > 
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
}


export default SelectListGroup