import { FeatureProps } from '@/components/about/types/about';
import { BiLineChart, BiMailSend, BiTable, BiTestTube } from 'react-icons/bi';
import { MdDarkMode, MdOutlineRule } from 'react-icons/md';

const FEATURES: FeatureProps[] = [
  {
    title: 'Westgard Rules',
    description:
      'Automated quality control validation with real-time violation detection and statistical process control monitoring.',
    icon: <MdOutlineRule size={24} />,
  },
  {
    title: 'Interactive Charts',
    description:
      'Levey-Jennings charts with dynamic visualizations for trend analysis and control limit calculations.',
    icon: <BiLineChart size={24} />,
  },
  {
    title: 'Test Categories',
    description: 'Comprehensive support for Hematology, Coagulation, and Biochemistry QC analysis.',
    icon: <BiTestTube size={24} />,
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Advanced filtering, statistical metrics, and performance tracking for quality control data.',
    icon: <BiTable size={24} />,
  },
  {
    title: 'Email Alerts',
    description:
      'Automated warning system for immediate notification of quality control violations.',
    icon: <BiMailSend size={24} />,
  },
  {
    title: 'Theme Support',
    description: 'Dark and light mode options for comfortable viewing in any environment.',
    icon: <MdDarkMode size={24} />,
  },
];

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className='card-hover p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-borderColor group'>
    <div className='flex items-center mb-4 space-x-3'>
      <div className='text-primary group-hover:text-accent transition-colors duration-300'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textSecondary'>{title}</h3>
    </div>
    <p className='text-textSecondary text-sm leading-relaxed'>{description}</p>
  </div>
);

const AvailableFeatures: React.FC = () => (
  <div className='py-12'>
    <h2 className='text-3xl font-semibold text-textSecondary text-center mb-12'>
      Available Features
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {FEATURES.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </div>
);

export default AvailableFeatures;
