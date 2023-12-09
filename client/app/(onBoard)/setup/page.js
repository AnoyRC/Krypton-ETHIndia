'use client';
import React from 'react';
import { Stepper, Step } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import Step1 from '@/components/layout/onBoard/setup/Step1';
import Step2 from '@/components/layout/onBoard/setup/Step2';
import Step3 from '@/components/layout/onBoard/setup/Step3';
import Step4 from '@/components/layout/onBoard/setup/Step4';

export default function Setup() {
  const activeStep = useSelector((state) => state.setup.activeStep);

  return (
    <div className="w-full py-4 px-8">
      {activeStep < 3 && (
        <Stepper activeStep={activeStep}>
          <Step>1</Step>
          <Step>2</Step>
          <Step>3</Step>
        </Stepper>
      )}
      <div className="flex w-full mt-7">
        {activeStep === 0 && <Step1 />}
        {activeStep === 1 && <Step2 />}
        {activeStep === 2 && <Step3 />}
        {activeStep === 3 && <Step4 />}
      </div>
    </div>
  );
}
