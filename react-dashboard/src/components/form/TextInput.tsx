import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange, error, ...props }) => {
  return (
    <div className="form-field" style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: 4 }}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        style={{ width: '100%', padding: 8, borderRadius: 4, border: error ? '1px solid red' : '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)' }}
        {...props}
      />
      {error && <div className="error-message" style={{ color: 'red', fontSize: 12 }}>{error}</div>}
    </div>
  );
};

export default TextInput; 