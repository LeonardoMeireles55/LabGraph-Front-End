import UpdateResults from '@/features/miscs/update-results';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { TestSelectorActionsProps } from '../types/SelectorProps';
import TestLevelSelector from './TestLevelSelector';
import TestNameSelector from './TestNameSelector';

const TestSelectorActions: React.FC<TestSelectorActionsProps> = ({
  testNameList: list,
  testName,
  setTestName,
  levelOptions,
  testLevel,
  setTestLevel,
  analyticsType,
  googleSheetUrl,
}) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <span className='text-sm font-medium'>Test:</span>
      <TestNameSelector testNameList={list} testName={testName} setTestName={setTestName} />
      {levelOptions && levelOptions.length > 0 && setTestLevel && (
        <>
          <span className='text-sm font-medium'>Level:</span>
          <TestLevelSelector
            levelOptions={levelOptions}
            testLevel={testLevel}
            setTestLevel={setTestLevel}
          />
        </>
      )}
      <span className='flex flex-row place-content-center items-center'>
        <Link
          className='hover:bg-background/90 focus:ring-borderColor/30 flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 text-sm font-medium text-textSecondary shadow-sm shadow-shadow transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
          target='_blank'
          href={googleSheetUrl || ''}
        >
          <span className='hidden p-0.5 md:inline'>
            <CheckCircle size={17} />
          </span>
          <span className='inline p-0.5 md:hidden'>
            <CheckCircle size={17} />
          </span>
        </Link>
      </span>
      <UpdateResults analyticsType={analyticsType} />
    </div>
  );
};

export default TestSelectorActions;
