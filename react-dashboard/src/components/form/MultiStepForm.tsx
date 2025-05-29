import React, { useState } from 'react';

interface Step {
  title: string;
  component: React.FC<{ formData: any; onSubmit: (data: any) => void }>;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [stepData, setStepData] = useState<any>({});

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = (data: any) => {
    const newStepData = { ...stepData, [currentStep]: data };
    setStepData(newStepData);
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newFormData);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="multi-step-form" style={{ background: 'var(--card-bg)', padding: 24, borderRadius: 8, maxWidth: 500, margin: '0 auto' }}>
      {/* Stepper Bar */}
      <div className="stepper-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }} aria-label="Stepper" role="list">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }} role="listitem">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: completed ? 'var(--primary)' : active ? '#646cff' : 'var(--border)',
                  color: completed || active ? 'var(--bg)' : 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  border: active ? '2px solid #646cff' : '2px solid var(--border)',
                  transition: 'background 0.2s, color 0.2s',
                }}
                aria-current={active ? 'step' : undefined}
              >
                {completed ? '✓' : index + 1}
              </div>
              <div style={{ marginLeft: 8, marginRight: 8, minWidth: 80, textAlign: 'center', color: active ? '#646cff' : completed ? 'var(--primary)' : 'var(--text)', fontWeight: active ? 700 : 400 }}>
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div style={{ width: 32, height: 2, background: completed ? 'var(--primary)' : 'var(--border)' }} />
              )}
            </div>
          );
        })}
      </div>
      {/* Step Content */}
      <div style={{ marginBottom: 24 }}>
        <CurrentStepComponent formData={formData} onSubmit={handleNext} />
      </div>
      {/* Navigation Buttons */}
      <div className="form-navigation" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {!isFirstStep && (
          <button type="button" onClick={handleBack} style={{ background: 'var(--border)', color: 'var(--text)' }}>Back</button>
        )}
        <button type="button" onClick={() => {
          // Simulate form submit for current step
          const form = document.querySelector('.multi-step-form form') as HTMLFormElement;
          if (form) form.requestSubmit();
        }} style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
          {isLastStep ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm; 