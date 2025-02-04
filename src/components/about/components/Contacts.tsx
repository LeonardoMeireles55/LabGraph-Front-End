import { ContactItemProps } from '@/components/about/types/about';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, title, content }) => (
  <div className='flex  card-hover items-center gap-6 p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-borderColor group'>
    <div className='text-primary group-hover:text-accent transition-colors duration-300 text-2xl'>
      <Icon />
    </div>
    <div className='space-y-1'>
      <h3 className='font-semibold text-textPrimary text-lg'>{title}</h3>
      <p className='text-textSecondary'>{content}</p>
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
    <div id='contact' className='w-full max-w-5xl mx-auto py-12'>
      <h2 className='text-3xl font-semibold text-textPrimary text-center mb-12'>Contacts</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {CONTACT_ITEMS.map((item, index) => (
          <ContactItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
