import { FAQS } from '@/features/about/constants/faqConstants';
import { FC } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { FAQItem } from '../types/about';

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
      {FAQS.map((faq) => (
        <FAQCard key={faq.id} {...faq} />
      ))}
    </div>
  </div>
);

export default FrequentlyAskedQuestions;
