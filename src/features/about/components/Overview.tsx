import { OverviewProps } from '@/features/about/types/about';
import { OverViewList } from './OverviewList';

const FeatureCard: React.FC<OverviewProps> = ({ title, description, icon }) => (
  <div className='card-hover hover:bg-primaryLight/5 group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-2 text-primary transition-all duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {title}
      </h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
      {description}
    </p>
  </div>
);

const Overview: React.FC = () => (
  <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
    <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>Overview</h2>
    <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
      Discover how our platform revolutionizes laboratory quality control management
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {OverViewList.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  </div>
);

export default Overview;
