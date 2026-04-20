"use client";

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from '@/lib/schema';
import StepPersonal from '@/components/form/StepPersonal';
import StepAcademic from '@/components/form/StepAcademic';
import StepEmployment from '@/components/form/StepEmployment';
import StepOFW from '@/components/form/StepOFW';
import StepFurtherStudies from '@/components/form/StepFurtherStudies';
import StepSocial from '@/components/form/StepSocial';
import SuccessScreen from '@/components/form/SuccessScreen';

const steps = [
  { id: 'Personal', title: 'Personal Information', fields: ['firstName', 'middleName', 'lastName', 'sex', 'dateOfBirth', 'civilStatus', 'contactNumber', 'personalEmail', 'homeAddress'] },
  { id: 'Academic', title: 'Academic Information', fields: ['studentId', 'course', 'batchYear', 'latinHonors'] },
  { id: 'Employment', title: 'Employment Information', fields: ['employmentStatus', 'employmentType', 'jobRelatedToCourse', 'currentCompany', 'companyLocation', 'jobTitle', 'yearsInCompany', 'officeEmail', 'officeContact'] },
  { id: 'OFW', title: 'OFW Details', fields: ['countryBased', 'visaType'] },
  { id: 'Studies', title: 'Further Studies', fields: ['pursuedFurtherEducation', 'degreeCourseTaken', 'schoolAttended'] },
  { id: 'Social', title: 'Social & Extras', fields: ['linkedinUrl', 'facebookUrl', 'willingToBeSpeaker'] },
];

import Image from 'next/image';

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const employmentStatus = methods.watch('employmentStatus');

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields as any[];
    const isValid = await methods.trigger(fieldsToValidate);
    
    if (isValid) {
      if (currentStep === 2 && employmentStatus !== 'OFW') {
        setCurrentStep(currentStep + 2); // Skip OFW
      } else {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      }
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep === 4 && employmentStatus !== 'OFW') {
      setCurrentStep(currentStep - 2);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    }
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-6 md:py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#2D332F]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 md:mb-6 flex flex-row items-center gap-4 md:gap-6">
          <Image src="/logo_cics.png" alt="CICS Logo" width={80} height={80} className="rounded-md object-contain" />
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A3626] leading-tight">Alumni Registration</h1>
            <p className="text-gray-600 mt-0.5 text-xs md:text-sm font-medium">Fill in your details — one section at a time.</p>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex border-b border-gray-300 mb-4 overflow-x-auto hide-scrollbar scroll-smooth">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isSkipped = index === 3 && employmentStatus !== 'OFW' && currentStep > 2;

            if (isSkipped) return null;

            return (
              <div 
                key={step.id} 
                className={`flex-none w-24 md:flex-1 text-center pb-2 text-[10px] md:text-sm font-medium transition-colors ${
                  isActive ? 'border-b-2 border-[#1A3626] text-[#1A3626]' : 
                  isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step.id}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-[#F5F2EB] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8E4D9] p-6 md:p-10">
          <div className="mb-6 md:mb-10">
            <p className="text-[10px] font-bold text-[#1A3626]/60 uppercase tracking-[0.2em] mb-2">
              STEP {currentStep + 1} OF {steps.length}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A3626]">{steps[currentStep].title}</h2>
            {currentStep === 3 && (
              <p className="text-gray-500 text-xs md:text-sm mt-2">Since you indicated you are currently working abroad, please provide the following details.</p>
            )}
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="form-content">
                {currentStep === 0 && <StepPersonal />}
                {currentStep === 1 && <StepAcademic />}
                {currentStep === 2 && <StepEmployment />}
                {currentStep === 3 && <StepOFW />}
                {currentStep === 4 && <StepFurtherStudies />}
                {currentStep === 5 && <StepSocial />}
              </div>

              <div className="pt-10 flex flex-row items-center justify-between border-t border-[#E8E4D9] mt-10">
                {currentStep > 0 ? (
                  <button type="button" onClick={prevStep} className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-[#2D332F] shadow-sm">
                    &larr; Back
                  </button>
                ) : (
                  <button type="button" onClick={() => window.location.href='/'} className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-[#2D332F] shadow-sm">
                    &larr; Back to Home
                  </button>
                )}
                
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-gray-400 tracking-widest">{currentStep + 1} / {steps.length}</span>
                  {currentStep === steps.length - 1 ? (
                    <button type="submit" disabled={isSubmitting} className="bg-[#1A3626] text-white px-10 py-2.5 rounded-xl font-bold hover:bg-[#12261a] transition-all shadow-md disabled:opacity-70">
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  ) : (
                    <button type="button" onClick={nextStep} className="bg-white border border-gray-200 px-10 py-2.5 rounded-xl font-bold text-[#2D332F] hover:bg-gray-50 transition-all shadow-sm">
                      Next &rarr;
                    </button>
                  )}
                </div>
              </div>

            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
