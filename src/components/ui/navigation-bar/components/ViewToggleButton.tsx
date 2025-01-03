import { useGraph } from '@/components/charts/contexts/GraphContext';
import { TbChartAreaLine, TbChartLine } from 'react-icons/tb';

const ViewToggleButton = () => {
  const { viewMode, toggleView } = useGraph();

  return (
    <button
      onClick={toggleView}
      className='flex items-center gap-2 rounded-full p-2 text-textPrimary'
      title={`${viewMode === 'single' ? 'Mudar para' : 'Voltar para'} ${viewMode === 'single' ? 'visão dupla' : 'visão única'}`}
    >
      {viewMode === 'single' ? (
        <TbChartAreaLine className='h-6 w-6' />
      ) : (
        <TbChartLine className='h-6 w-6' />
      )}
    </button>
  );
};

export default ViewToggleButton;
