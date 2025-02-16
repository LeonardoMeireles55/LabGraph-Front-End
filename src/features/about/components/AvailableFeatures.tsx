import { FeaturesList } from '@/features/about/components/FeatureList';
import { FeatureProps } from '@/features/about/types/about';

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className='card-hover group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='text-primary transition-colors duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textSecondary'>{title}</h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary'>{description}</p>
  </div>
);

const AvailableFeatures: React.FC = () => (
  <div className='py-12'>
    <h2 className='mb-12 text-center text-3xl font-semibold text-textSecondary'>
      Available Features
    </h2>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FeaturesList.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  </div>
);

export default AvailableFeatures;
