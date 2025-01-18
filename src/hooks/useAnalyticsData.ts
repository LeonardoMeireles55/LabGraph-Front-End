import { ListingItem } from '@/components/charts/types/Chart';
import { formatDateWithTime, formatEndDateWithTime } from '@/components/shared/date-selector/constants/formatDateWithTime';
import { useState } from 'react';

interface Links {
  'last'?: { href: string };
  'next'?: { href: string };
  'prev'?: { href: string };
  'current-page'?: { href: string };
}

interface UseAnalyticsDataProps {
  analyticsType: string;
  level: string;
  startDate: { day: number; month: number; year: number };
  endDate: { day: number; month: number; year: number };
  itemsPerPage: number;
  currentPage: number;
}

export const useAnalyticsData = ({
  analyticsType,
  level,
  startDate,
  endDate,
  itemsPerPage,
  currentPage,
}: UseAnalyticsDataProps) => {
  const [data, setData] = useState<ListingItem[]>([]);
  const [links, setLinks] = useState<Links>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tokenResponse = await fetch('/api/get-token');
      const { token } = await tokenResponse.json();

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result._embedded.analyticsRecordList);
      setLinks(result._links);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const buildUrl = (isFiltered: boolean) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}`;
    const startDateFormatted = formatDateWithTime(startDate.year, startDate.month, startDate.day);
    const endDateFormatted = formatEndDateWithTime(endDate.year, endDate.month, endDate.day);

    if (isFiltered) {
      return `${baseUrl}/level-date-range?level=${level}&startDate=${startDateFormatted}&endDate=${endDateFormatted}&page=${currentPage}&sort=date,desc`;
    }
    
    return `${baseUrl}/date-range?startDate=${startDateFormatted}&endDate=${endDateFormatted}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`;
  };

  return {
    data,
    links,
    isLoading,
    error,
    fetchData,
    buildUrl,
  };
};
