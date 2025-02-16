import { ContactItemProps } from '@/features/about/types/about';
const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content }) => (
  <div className='card-hover hover:bg-primaryLight/5 group flex items-center gap-6 rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-3 text-primary transition-all duration-300 group-hover:text-accent'>
      {icon}
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

export default ContactItem;
