interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What is Quality Control in Laboratory?',
    answer:
      'Laboratory Quality Control is a set of procedures designed to monitor and evaluate testing processes to ensure accurate and reliable test results.',
  },
  {
    id: 2,
    question: 'What are Westgard Rules?',
    answer:
      'Westgard Rules are a set of statistical rules used to validate quality control data in clinical laboratories, helping detect both random and systematic errors.',
  },
  {
    id: 3,
    question: 'How often should QC be performed?',
    answer:
      'QC should be performed at least once every 24 hours, before patient testing begins, after major maintenance, or when accuracy of results is questioned.',
  },
  {
    id: 4,
    question: 'What is a Levey-Jennings chart?',
    answer:
      'A Levey-Jennings chart is a graphical tool that plots quality control values over time, helping visualize trends and shifts in laboratory testing processes.',
  },
  {
    id: 5,
    question: 'How do I interpret control limits?',
    answer:
      'Control limits typically represent ±2SD and ±3SD from the mean. Values outside these limits may indicate problems with the testing process.',
  },
  {
    id: 6,
    question: 'Can I export my QC data?',
    answer:
      'Yes, our system allows you to export quality control data in various formats for further analysis or documentation purposes.',
  },
];
