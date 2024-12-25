import formatDateWithTime from '../utils/formatDateWithTime';
import testFormatFix from '../utils/testFormatFix';

interface Dates {
    initialDay: number;
    initialMonth: number;
    initialYear: number;
    secondDay: number;
    secondMonth: number;
    secondYear: number;
}

interface GenerateUrlAnalyticsByNameAndDate {
    analyticsType: string;
    name: string;
    date: Dates;
    levelSize: number;
}

const generateUrlByNameAndDate = (props: GenerateUrlAnalyticsByNameAndDate) => {
    const { analyticsType, name, date, levelSize } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const urls: string[] = [];
    const meanDeviationUrls: string[] = [];

    for (let level = 1; level <= levelSize; level++) {
        urls.push(`${baseUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`);
        meanDeviationUrls.push(`${meanAndDeviationUrl}${testFormatFix(name)}&level=${level}&startDate=${startDate}&endDate=${endDate}`);
    }

    return { urls, meanDeviationUrls };
};

export default generateUrlByNameAndDate;