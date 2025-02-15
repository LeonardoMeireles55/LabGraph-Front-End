import { useToken } from '@/features/authentication/contexts/TokenContext';
import { ListingItem } from '@/features/charts/types/Chart';
import {
  formatDateWithTime,
  formatEndDateWithTime,
} from '@/features/shared/date-selector/constants/formatDateWithTime';
import { useState } from 'react';
import { PaginatedResponse, UseAnalyticsDataProps } from '../types/AnalyticsTable';


export const useAnalyticsData = ({
  analyticsType,
  level,
  startDate,
  endDate,
  itemsPerPage,
  currentPage,
}: UseAnalyticsDataProps) => {
  const [data, setData] = useState<ListingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { token, loading } = useToken();

  const fetchData = async (url: string) => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    if (!token) {
      setError('No authentication token available');
      return;
    }

    setError(null);
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaginatedResponse = await response.json();
      setData(result.content);
      setTotalPages(result.page.totalPages);
      setTotalElements(result.page.totalElements);
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
      return `${baseUrl}/level-date-range?level=${level}&startDate=${startDateFormatted}&endDate=${endDateFormatted}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`;
    }

    return `${baseUrl}/date-range?startDate=${startDateFormatted}&endDate=${endDateFormatted}&size=${itemsPerPage}&page=${currentPage}&sort=date,desc`;
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
    buildUrl,
    totalPages,
    totalElements,
  };
};
