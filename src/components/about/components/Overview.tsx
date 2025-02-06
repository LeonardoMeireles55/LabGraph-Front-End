import { OverviewProps } from '@/components/about/types/about';
import { AiOutlineSafety } from 'react-icons/ai';
import { BiTargetLock } from 'react-icons/bi';
import { MdOutlineAnalytics, MdOutlineHealthAndSafety } from 'react-icons/md';
import { RiToolsFill } from 'react-icons/ri';
import { TbClipboardData } from 'react-icons/tb';

const OVERVIEW: OverviewProps[] = [
  {
    title: 'Purpose',
    description:
      'Empowering clinical laboratories with advanced quality control monitoring to ensure accurate and reliable test results.',
    icon: <BiTargetLock size={24} />,
  },
  {
    title: 'Quality Assurance',
    description:
      'Maintaining high standards in laboratory testing through continuous monitoring and statistical analysis.',
    icon: <AiOutlineSafety size={24} />,
  },
  {
    title: 'Clinical Impact',
    description:
      'Supporting healthcare decision-making with reliable laboratory data and comprehensive quality metrics.',
    icon: <MdOutlineHealthAndSafety size={24} />,
  },
  {
    title: 'Data Management',
    description:
      'Streamlined organization and tracking of quality control data across multiple laboratory departments.',
    icon: <TbClipboardData size={24} />,
  },
  {
    title: 'Performance Monitoring',
    description:
      'Real-time tracking and analysis of laboratory performance indicators for optimal operation.',
    icon: <MdOutlineAnalytics size={24} />,
  },
  {
    title: 'Efficiency Tools',
    description:
      'Comprehensive suite of tools designed to simplify quality control processes and enhance workflow.',
    icon: <RiToolsFill size={24} />,
  },
];

const FeatureCard: React.FC<OverviewProps> = ({ title, description, icon }) => (
  <div className='card-hover p-6 bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-borderColor group hover:bg-primaryLight/5'>
    <div className='flex items-center mb-4 space-x-3'>
      <div className='p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textPrimary group-hover:text-accent transition-colors duration-300'>
        {title}
      </h3>
    </div>
    <p className='text-textSecondary text-sm leading-relaxed group-hover:text-textPrimary transition-colors duration-300'>
      {description}
    </p>
  </div>
);

const Overview: React.FC = () => (
  <div className='py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
    <h2 className='text-3xl font-semibold text-textPrimary text-center mb-4'>Overview</h2>
    <p className='text-textSecondary text-center mb-12 max-w-2xl mx-auto'>
      Discover how our platform revolutionizes laboratory quality control management
    </p>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {OVERVIEW.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </div>
);

export default Overview;
