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
}

const generateUrlByNameAndDate = (props: GenerateUrlAnalyticsByNameAndDate) => {
    const { analyticsType, name, date } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/search/date-range?name=`;
    const meanAndDeviationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/results/mean-standard-deviation?name=`;

    const startDate = formatDateWithTime(date.initialYear, date.initialMonth, date.initialDay);
    const endDate = formatDateWithTime(date.secondYear, date.secondMonth, date.secondDay);

    const url = `${baseUrl}${testFormatFix(name)}&level=${1}&startDate=${startDate}&endDate=${endDate}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testFormatFix(name)}&level=${1}&startDate=${startDate}&endDate=${endDate}`;

    const url2 = `${baseUrl}${testFormatFix(name)}&level=${2}&startDate=${startDate}&endDate=${endDate}`;
    const urlMeanAndDeviation2 = `${meanAndDeviationUrl}${testFormatFix(name)}&level=${2}&startDate=${startDate}&endDate=${endDate}`;

    return { url, urlMeanAndDeviation, url2, urlMeanAndDeviation2 };
};

export default generateUrlByNameAndDate;