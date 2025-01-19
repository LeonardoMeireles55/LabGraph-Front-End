import ListingTable from '@/components/features/listing-table';
import DateSelector from '@/components/shared/date-selector';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import Footer from '@/components/ui/footer';
import NavBar from '@/components/ui/navigation-bar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const AnalyticsTable = () => {
  const dateSelector = useDateSelector();
  const [currentPage] = useState(0);
  const [itemsPerPage] = useState(7);
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics');
  const [level, setLevel] = useState('0');
  const [isFiltered, setFiltered] = useState(false);

  const {
    data: dataFetched,
    links: _links,
    isLoading,
    error,
    fetchData,
    buildUrl
  } = useAnalyticsData({
    analyticsType,
    level,
    startDate: {
      day: dateSelector.startDay,
      month: dateSelector.startMonth,
      year: dateSelector.startYear,
    },
    endDate: {
      day: dateSelector.endDay,
      month: dateSelector.endMonth,
      year: dateSelector.endYear,
    },
    itemsPerPage,
    currentPage,
  });

  useEffect(() => {
    const url = buildUrl(isFiltered);
    fetchData(url);
  }, [
    isFiltered,
    analyticsType,
    level,
    dateSelector.startDay,
    dateSelector.startMonth,
    dateSelector.startYear,
    dateSelector.endDay,
    dateSelector.endMonth,
    dateSelector.endYear,
    itemsPerPage,
    currentPage
  ]);

  // Helper functions
  const getPageNumberFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1]);
    return parseInt(params.get('page') || '0');
  };

  const getCurrentPageNumber = () => _links?.['current-page']?.href ?
    getPageNumberFromUrl(_links['current-page'].href) : 0;

  const getLastPageNumber = () => _links?.['last']?.href ?
    getPageNumberFromUrl(_links['last'].href) : 0;

  const handlePageChange = async (url: string): Promise<void> => {
    await fetchData(url);
  };

  const handleNavigation = (url: string | undefined) => {
    if (url) {
      handlePageChange(url);
    }
  };

  const analyticsOptions = [
    { value: 'biochemistry-analytics', label: 'BIOCHEMISTRY' },
    { value: 'hematology-analytics', label: 'HEMATOLOGY' },
    { value: 'coagulation-analytics', label: 'COAGULATION' },
  ];

  const levelOptions = [
    { value: '0', label: '-' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ]

  return (
    <div className='min-h bg-background'>
      <div className='min-h flex flex-col content-center items-center justify-center'>
        <Head>
          <title>{`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}</title>
        </Head>
        <NavBar jsonData={dataFetched} fileName={analyticsType} />
        <div className='w-full max-w-7xl'>
          <div className=''>
            <div className='mb-4 mt-16 grid grid-cols-2 content-center items-center justify-start md:mb-6 md:flex'>
              <div className='mt-4 w-full md:mt-16 md:w-auto'>
                <DateSelector {...dateSelector} />

                <div className='flex w-full flex-row gap-1 py-1'>
                  <label htmlFor='tests' className='text-textSecondary'>
                    Test:
                  </label>
                  <select
                    id='tests'
                    className='mt-1 rounded border border-borderColor bg-background text-textSecondary md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 focus:ring-borderColor/30'
                    value={analyticsType}
                    onChange={(e) => setAnalyticsType(e.target.value)}
                  >
                    {analyticsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor='level' className='text-textSecondary'>
                    <select
                      id='level'
                      className='mt-1 rounded border border-borderColor bg-background text-textSecondary md:px-2 md:py-1 md:text-sm focus:outline-none focus:ring-2 focus:ring-borderColor/30'
                      value={level}
                      onChange={(e) => {
                        setLevel(e.target.value);
                        setFiltered(e.target.value !== '0');
                      }}>
                      {levelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className='flex content-center items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-t-2 border-primary'></div>
            </div>
          ) : error ? (
            <div className='mtrelative rounded bg-danger px-4 py-3 text-white' role='alert'>
              {error}
            </div>
          ) : (
            <ListingTable
              items={dataFetched}
              pageInfos={_links}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <div className='flex items-center justify-center py-4 space-x-2'>
          <button
            onClick={() => handleNavigation(_links?.['prev']?.href)}
            disabled={!_links?.['prev']?.href}
            className='px-4 py-2 text-xs text-white transition-colors bg-opacity-100 rounded-md hover:bg-primaryDark bg-muted disabled:cursor-not-allowed disabled:opacity-25 md:text-base'
          >
            &larr;
          </button>
          <span className='text-xs text-textSecondary'>
            Page {getCurrentPageNumber() + 1} of {getLastPageNumber() + 1}
          </span>
          <button
            onClick={() => handleNavigation(_links?.['next']?.href)}
            disabled={!_links?.['next']?.href}
            className='px-4 py-2 text-xs text-white transition-colors bg-opacity-100 rounded-md hover:bg-primaryDark bg-border disabled:cursor-not-allowed disabled:opacity-25 md:text-base'
          >
            &rarr;
          </button>
        </div>
        <div className='flex flex-col items-center justify-end'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTable;
