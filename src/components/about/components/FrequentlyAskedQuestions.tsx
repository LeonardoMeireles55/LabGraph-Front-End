import { FC } from 'react';
import { BiHelpCircle } from 'react-icons/bi';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is Quality Control in Laboratory?',
    answer:
      'Laboratory Quality Control is a set of procedures designed to monitor and evaluate testing processes to ensure accurate and reliable test results.',
  },
  {
    question: 'What are Westgard Rules?',
    answer:
      'Westgard Rules are a set of statistical rules used to validate quality control data in clinical laboratories, helping detect both random and systematic errors.',
  },
  {
    question: 'How often should QC be performed?',
    answer:
      'QC should be performed at least once every 24 hours, before patient testing begins, after major maintenance, or when accuracy of results is questioned.',
  },
  {
    question: 'What is a Levey-Jennings chart?',
    answer:
      'A Levey-Jennings chart is a graphical tool that plots quality control values over time, helping visualize trends and shifts in laboratory testing processes.',
  },
  {
    question: 'How do I interpret control limits?',
    answer:
      'Control limits typically represent ±2SD and ±3SD from the mean. Values outside these limits may indicate problems with the testing process.',
  },
  {
    question: 'Can I export my QC data?',
    answer:
      'Yes, our system allows you to export quality control data in various formats for further analysis or documentation purposes.',
  },
];

const FAQCard: FC<FAQItem> = ({ question, answer }) => (
  <div className='card-hover p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-borderColor group'>
    <div className='flex items-center mb-4 space-x-3'>
      <div className='text-primary group-hover:text-accent transition-colors duration-300'>
        <BiHelpCircle size={24} />
      </div>
      <h3 className='text-lg font-semibold text-textPrimary'>{question}</h3>
    </div>
    <p className='text-textSecondary text-sm leading-relaxed'>{answer}</p>
  </div>
);

const FrequentlyAskedQuestions: FC = () => (
  <div id='faq' className='py-12'>
    <h2 className='text-3xl font-semibold text-textPrimary text-center mb-12'>
      Frequently Asked Questions
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {FAQS.map((faq, index) => (
        <FAQCard key={index} {...faq} />
      ))}
    </div>
  </div>
);

export default FrequentlyAskedQuestions;
