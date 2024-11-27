// components/TestSelector.tsx
import Link from 'next/link';
import React from 'react';
import MeanAndDeviationDisplay from './MeanAndDeviationDisplay';

interface TestSelectorProps {
  testName: string;
  testLevel: number;
  setTestName: (testName: string) => void;
  setTestLevel: (testLevel: number) => void;
  mean: number;
  sd: number;
  ownMean: number;
  ownSd: number;
}

const TestSelector: React.FC<TestSelectorProps> = ({ testName, testLevel, setTestName, setTestLevel, sd, mean, ownMean, ownSd }) => {
  return (
    <div className="flex items-center gap-2 text-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Analíto:</span>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        >
          {[
            "ALB2", "ALP2S", "ALTL", "AMYL2", "ASTL", "BILD2",
            "BILT3", "CA2", "CHOL2", "CK2", "CKMB2", "CL-I",
            "CREJ2", "CRP4", "GGTI2", "GLUC3", "HDLC4", "K-I",
            "LDHI2", "LIP", "MG-2", "NA-I", "PHOS2", "TRIGL",
            "UA2", "UREL"
          ].map((test) => (
            <option key={test} value={test}>{test}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Nível:</span>
        <select 
          className="bg-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          value={testLevel}
          onChange={(e) => setTestLevel(+e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>
      <Link 
        className="bg-gray-600 hover:bg-gray-400 text-gray-200 rounded px-4 py-1 text-sm"
            target="_blank" href="https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit?userstoinvite=andersongomesbio@gmail.com&sharingaction=manageaccess&role=writer&pli=1#gid=1397277322"
            >&#10003;
        </Link>
        <MeanAndDeviationDisplay mean={mean} sd={sd} ownMean={ownMean} ownSd={ownSd} />
    </div>
  );
};

export default TestSelector;
