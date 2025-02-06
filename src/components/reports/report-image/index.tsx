import Image from 'next/image';

const ReportImage = () => {
  return (
    <span className='w-4/6 p-4 border border-borderColor shadow-md rounded-xl md:mt-4 xl:w-1/3 xl:p-6'>
      <Image
        className='object-cover rounded-xl'
        fetchPriority='high'
        src='/reports.jpg'
        style={{
          width: '100%',
          height: 'auto',
          opacity: 1.0,
        }}
        width={350}
        height={150}
        alt='Laboratory image'
        priority={true}
      />
    </span>
  );
};

export default ReportImage;
