import { ContactList } from '@/features/about/components/ContactList';
import React from 'react';
import ContactItem from './ContactItem';

const Contacts: React.FC = () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>Get in Touch</h2>
      <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
        We&apos;re here to help and answer any questions you might have
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {ContactList.map((item) => (
          <ContactItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
