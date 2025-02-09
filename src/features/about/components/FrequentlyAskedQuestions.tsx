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
  <div className='card-hover hover:bg-primaryLight/5 group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-2 text-primary transition-all duration-300 group-hover:text-accent'>
        <BiHelpCircle size={24} />
      </div>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {question}
      </h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
      {answer}
    </p>
  </div>
);

const FrequentlyAskedQuestions: FC = () => (
  <div id='faq' className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
    <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>
      Frequently Asked Questions
    </h2>
    <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
      Find answers to common questions about our quality control system
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FAQS.map((faq, index) => (
        <FAQCard key={index} {...faq} />
      ))}
    </div>
  </div>
);

export default FrequentlyAskedQuestions;
