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
      {OVERVIEW.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  </div>
);

export default Overview;
