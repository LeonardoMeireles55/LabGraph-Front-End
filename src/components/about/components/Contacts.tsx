import { ContactItemProps } from '@/components/about/types/about';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, title, content }) => (
  <div className='flex card-hover items-center gap-6 p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-borderColor group hover:bg-primaryLight/5'>
    <div className='p-3 rounded-lg bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300'>
      <Icon />
    </div>
    <div className='space-y-1'>
      <h3 className='font-semibold text-textPrimary group-hover:text-accent transition-colors duration-300 text-lg'>
        {title}
      </h3>
      <p className='text-textSecondary group-hover:text-textPrimary transition-colors duration-300'>
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
    <div className='w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl font-semibold text-textPrimary text-center mb-4'>Get in Touch</h2>
      <p className='text-textSecondary text-center mb-12 max-w-2xl mx-auto'>
        We're here to help and answer any questions you might have
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {CONTACT_ITEMS.map((item, index) => (
          <ContactItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
