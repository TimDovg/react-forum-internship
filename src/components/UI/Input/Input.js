import React from 'react'

export const Input = ({
  label,
  value = '',
  placeholder = '',
  type = 'text',
  onChange,
  matchCount,
}) => (
  <>
    <label className="w-35">
      <div className="d-inline pl-35 font-weight-bold">{label}</div>
      <input
        className="d-inline form-control w-50 m-3"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <small className="font-italic">{matchCount}</small>
    </label>
  </>
)
