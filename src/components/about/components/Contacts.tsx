import { ContactItemProps } from '@/components/about/types/about';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, title, content }) => (
  <div className='card-hover hover:bg-primaryLight/5 group flex items-center gap-6 rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-3 text-primary transition-all duration-300 group-hover:text-accent'>
      <Icon />
    </div>
    <div className='space-y-1'>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {title}
      </h3>
      <p className='text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
        {content}
      </p>
    </div>
  </div>
);

const CONTACT_ITEMS = [
  { icon: FiPhone, title: 'Phone', content: '+85 (85) 98992-4491' },
  { icon: FiMail, title: 'Email', content: 'leomeireles55@outlook.com' },
  { icon: FiMapPin, title: 'Address', content: '123 Lab Street, Science City, ST 12345' },
];

const Contacts: React.FC = () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>Get in Touch</h2>
      <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
        We&apos;re here to help and answer any questions you might have
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {CONTACT_ITEMS.map((item, index) => (
          <ContactItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
