import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, error, options, ...props }) => {
  return (
    <div className="form-field" style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: 4 }}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        style={{ width: '100%', padding: 8, borderRadius: 4, border: error ? '1px solid red' : '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
        {...props}
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <div className="error-message" style={{ color: 'red', fontSize: 12 }}>{error}</div>}
    </div>
  );
};

export default SelectInput; 