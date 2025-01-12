import { useGraph } from '@/components/charts/contexts/GraphContext';
import { TbChartAreaLine, TbChartLine } from 'react-icons/tb';

const ViewToggleButton = () => {
  const { viewMode, toggleView } = useGraph();

  return (
    <button
      onClick={toggleView}
      className='flex items-center gap-2 rounded-full p-2 text-textPrimary'
      title={`${viewMode === 'single' ? 'Switch to' : 'Back to'} ${viewMode === 'single' ? 'multi line' : 'line'}`}
    >
      {viewMode === 'single' ? (
        <TbChartAreaLine className='h-7 w-7' />
      ) : (
        <TbChartLine className='h-7 w-7' />
      )}
    </button>
  );
};

export default ViewToggleButton;
