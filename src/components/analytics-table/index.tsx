import ListingTable from '@/components/analytics-table/listing-table';
import useDateSelector from '@/components/shared/date-selector/hooks/useDateSelector';
import Footer from '@/components/ui/footer';
import NavBar from '@/components/ui/navigation-bar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAnalyticsData } from '@/components/analytics-table/hooks/useAnalyticsData';
import useWindowDimensions from '@/components/ui/hooks/useWindowDimensions';
import AnalyticsFilters from './util/analytics-filters';
import AnalyticsPagination from './util/analytics-pagination';

const AnalyticsTableIndex = () => {
    const dateSelector = useDateSelector();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics');
    const [level, setLevel] = useState('0');
    const [isFiltered, setFiltered] = useState(false);


    const { width } = useWindowDimensions();



    const {
        data: dataFetched,
        links: _links,
        isLoading,
        error,
        fetchData,
        buildUrl,
        totalPages,
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
        itemsPerPage,
        currentPage,
        dateSelector.startDay,
        dateSelector.startMonth,
        dateSelector.startYear,
        dateSelector.endDay,
        dateSelector.endMonth,
        dateSelector.endYear,
    ]);

    const handlePageChange = async (url: string): Promise<void> => {
        await fetchData(url);
    };

    useEffect(() => {
        setItemsPerPage(width >= 1800 ? 12 : 8);
        console.log(width);
    }, [fetchData, width]);

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
                    <AnalyticsFilters
                        dateSelector={dateSelector}
                        analyticsOptions={analyticsOptions}
                        analyticsType={analyticsType}
                        setAnalyticsType={setAnalyticsType}
                        levelOptions={levelOptions}
                        level={level}
                        setLevel={setLevel}
                        setFiltered={setFiltered}
                    />
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
                <AnalyticsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    dataFetched={dataFetched}
                    setCurrentPage={setCurrentPage}
                />
                <div className='flex flex-col items-center justify-end'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTableIndex;
