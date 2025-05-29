import React, { useState } from 'react';
import TextInput from '../components/form/TextInput';
import SelectInput from '../components/form/SelectInput';
import MultiStepForm from '../components/form/MultiStepForm';

const SingleStepForm: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      setError('All fields are required');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', padding: 24, borderRadius: 8, marginBottom: 32 }}>
      <h2>Single Step Form</h2>
      <TextInput label="Name" name="name" value={form.name} onChange={handleChange} error={!form.name && error ? 'Required' : ''} />
      <SelectInput label="Role" name="role" value={form.role} onChange={handleChange} error={!form.role && error ? 'Required' : ''} options={[
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ]} />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

const Step1: React.FC<{ formData: any; onSubmit: (data: any) => void }> = ({ formData, onSubmit }) => {
  const [name, setName] = useState(formData.name || '');
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ name }); }}>
      <TextInput label="Name" name="name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Next</button>
    </form>
  );
};
const Step2: React.FC<{ formData: any; onSubmit: (data: any) => void }> = ({ formData, onSubmit }) => {
  const [role, setRole] = useState(formData.role || '');
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ role }); }}>
      <SelectInput label="Role" name="role" value={role} onChange={e => setRole(e.target.value)} options={[
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ]} />
      <button type="submit">Finish</button>
    </form>
  );
};

const FormDemo: React.FC = () => {
  const [singleResult, setSingleResult] = useState<any>(null);
  const [multiResult, setMultiResult] = useState<any>(null);

  return (
    <div style={{ padding: 24 }}>
      <h1>Form Demo</h1>
      <SingleStepForm onSubmit={setSingleResult} />
      {singleResult && <div style={{ color: 'green', marginBottom: 24 }}>Submitted: {JSON.stringify(singleResult)}</div>}
      <MultiStepForm
        steps={[
          { title: 'Step 1', component: Step1 },
          { title: 'Step 2', component: Step2 },
        ]}
        onComplete={setMultiResult}
      />
      {multiResult && <div style={{ color: 'green', marginTop: 24 }}>Multi-step Submitted: {JSON.stringify(multiResult)}</div>}
    </div>
  );
};

export default FormDemo; 