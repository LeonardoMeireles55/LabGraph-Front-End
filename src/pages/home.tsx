import formatarData from '@/components/FormatDate';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { useEffect, useState } from "react";
import Footer from '@/components/Footer';
import DateSelector from '@/components/DateSelector';
import TestSelector from '@/components/TestSelector';
import colors from '../styles/colors';
import NavBar from '@/components/NavBar';



interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

interface ListingCollection extends Array<ListingItem> {}

export default function GetLineCharts() {
    
    const defaultDate = new Date();

    const { width = 800, height = 600 } = useWindowDimensions();

    const [testName, setTestName] = useState<string>('ALB2');
    const [testLevel, setTestLevel] = useState<number>(1);
    const [ownMean, setOwnMean] = useState<number>(0);
    const [ownSd, setOwnSd] = useState<number>(0);
    const [unitValue, setUnitValue] = useState<string>('');

    const [initialMonth, setInitialMonth] = useState<number>(defaultDate.getMonth());
    const [secondMonth, setSecondMonth] = useState<number>(defaultDate.getMonth() + 1);
    const [initialDay, setInitialDay] = useState<number>(10);
    const [secondDay, setSecondDay] = useState<number>(defaultDate.getDate());
    const [initialYear, setInitialYear] = useState<number>(defaultDate.getFullYear());
    const [secondYear, setSecondYear] = useState<number>(defaultDate.getFullYear());    

    const baseUrl = "http://localhost/api/biochemistry-analytics/results/search/date-range?name=";
    const meanAndDeviationUrl = "http://localhost/api/biochemistry-analytics/results/mean-standard-deviation?name="
    const url = `${baseUrl}${testName}&level=${testLevel}&dateStart=${initialYear}-${initialMonth}-${initialDay}&dateEnd=${secondYear}-${secondMonth}-${secondDay}`;
    const urlMeanAndDeviation = `${meanAndDeviationUrl}${testName}&level=${testLevel}&dateStart=${initialYear}-${initialMonth}-${initialDay}&dateEnd=${secondYear}-${secondMonth}-${secondDay}`;



    const [listing, setListing] = useState<ListingCollection>([]);

    const filter = (value: number, mean: number, sd: number) => {
        if (value > mean + 3 * sd) return (mean + 3 * sd) + sd/3;
        if (value < mean - 3 * sd) return (mean - 3 * sd) - sd/3;
        return value;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const responseMeanAndDeviation = await fetch(urlMeanAndDeviation, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!responseMeanAndDeviation.ok) throw new Error('Network response was not ok');

                const jsonMeanAndDeviation = await responseMeanAndDeviation.json();
                setOwnMean(jsonMeanAndDeviation.mean);
                setOwnSd(jsonMeanAndDeviation.standardDeviation);

                if (!response.ok) throw new Error('Network response was not ok');

                const json = await response.json();
                setUnitValue(json[0].unit_value);

                setListing(json);

                if (!listing.length) {
                    setInitialYear(initialYear);
                    setInitialMonth(initialMonth);
                    setSecondYear(secondYear);
                    setSecondMonth(secondMonth);
                    setSecondDay(secondDay);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [testName, testLevel, initialYear, initialMonth, initialDay, secondYear, secondMonth, secondDay, url]);

    if (!listing.length) return null;

    const data = listing;
    const dates = data.map(entry => formatarData(entry.date));
    const values = data.map(entry => entry.value);
    const { mean, sd, name, level } = data[0];

    const yaxisRange = [mean - (3 * 1.2) * sd, mean + (3 * 1.2) * sd];
    const yTickValues = [mean - 3 * sd, mean - 2 * sd, mean - sd, mean, mean + sd, mean + 2 * sd, mean + 3 * sd];
    const yTickText = ['-3s ', '-2s ', '-1s ', 'Média ', '+1s ', '+2s ', '+3s '];

    const plotData: any = [{
        x: dates,
        y: values.map(value => 
            value < mean - 3 * sd || value > mean + 3 * sd 
                ? filter(value, mean, sd) 
                : value),
        type: 'scatter',
        mode: 'lines+markers+text',
        text: values.map(value => value.toFixed(2)),
        textposition: 'top center',
        textfont: { 
            size: 12, 
            color: colors.textSecondary // Gray-200
        },
        marker: { 
            color: colors.primary, // Blue-400
            size: 8,
            line: {
                color: colors.border,
                width: 1
            }
        },
        line: {
            color: colors.primary, // Blue-400
            width: 2
        },
        name: 'Valores',
    }];
    
    const lines = [
        { multiple: 3, color: colors.sd3, legend: '3x SD' },
        { multiple: 2, color: colors.sd2, legend: '2x SD' },
        { multiple: 1, color: colors.sd1, legend: '1x SD' },
        { multiple: 0, color: colors.meanLine, legend: 'mean' },
        { multiple: -1, color: colors.sd1, legend: '-1x SD' },
        { multiple: -2, color: colors.sd2, legend: '-2x SD' },
        { multiple: -3, color: colors.sd3, legend: '-3x SD' },
    ];
    
    const shapes = lines.map(line => ({
        type: 'line',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: mean + line.multiple * sd,
        y1: mean + line.multiple * sd,
        line: { 
            color: line.color, 
            width: 1.5, 
            dash: 'dash' 
        },
        name: line.legend,
    }));
    
    const layout: any = {

        width: width < 640 ? width * 1.1 : // mobile
        width < 1024 ? width * 0.85 : // tablet
        Math.max(width * 0.80, 800), // desktop
        height: height < 400 ? height * 0.8 : // telas muito pequenas
        height < 600 ? height * 0.7 : // telas médias
        Math.max(height * 0.7, 500), // telas grandes

        plot_bgcolor: colors.surface, // Gray-800 
        paper_bgcolor: colors.surface, // Gray-800 
        font: { 
            family: 'Inter, system-ui, sans-serif', 
            size:  width < 640 ? 8 : 14 , 
            color: colors.textPrimary // Gray-100 
        },
        title: {
            text: `${name} - Nível ${level}`,
            font: {
                size:  width < 640 ? 14 : 24,
                color: colors.textPrimary // Gray-100 
            },
            y: 0.95
        },
        showgrid: true,
        gridwidth: 1,
        gridcolor: colors.gridLines, // Gray-100
        showlegend: false,
        displayModeBar: false,
        margin: {
            l: 80,
            r: 50,
            t: 80,
            b: 80,
            pad: 5
        },
        xaxis: {
            tickangle: -45,
            type: 'category',
            color: colors.textPrimary, // Gray-100
            tickfont: { size: width < 640 ? 8 : 12 },
            gridcolor: colors.gridLines,
            zeroline: false,
            title: {
                text: 'Data',
                font: { size: width < 640 ? 10 : 16 }
            }
        },
        yaxis: {
            title: 'Valores',
            titlefont: { size: width < 640 ? 10 : 16 },
            range: yaxisRange,
            color: colors.textPrimary, // Gray-100
            tickvals: yTickValues,
            ticktext: yTickText,
            tickfont: { size: width < 640 ? 10 : 12 },
            gridcolor: colors.gridLines,
            zeroline: false
        },
        shapes: shapes,
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-background p-2 sm:p-4 md:p-6">
        <NavBar />
        <Head>
            <title>LabGraph - {name}</title>
        </Head>
        <div className="flex flex-col w-full mx-auto md:w-5/6 lg:w-3/4 xl:max-w-7xl">
            <div className="flex  justify-center bg-background p-2 sm:p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-0 mt-16">
                    <DateSelector 
                    initialDay={initialDay}
                    initialMonth={initialMonth}
                    initialYear={initialYear}
                    secondDay={secondDay}
                    secondMonth={secondMonth}
                    secondYear={secondYear}
                    setInitialDay={setInitialDay}
                    setInitialMonth={setInitialMonth}
                    setInitialYear={setInitialYear}
                    setSecondDay={setSecondDay}
                    setSecondMonth={setSecondMonth}
                    setSecondYear={setSecondYear}/>
                    <div className="flex">
                        <TestSelector 
                        testName={testName} setTestName={setTestName} testLevel={testLevel} 
                        setTestLevel={setTestLevel} 
                        mean={mean} sd={sd} ownMean={ownMean} ownSd={ownSd} unitValue={unitValue} />
                        </div>
                    </div>
                </div>
                <div className="bg-surface w-full flex justify-center content-center p-6 rounded-lg shadow-md mt-1">
                    <Plot
                        data={plotData}
                        layout={layout}
                        config={{ responsive: true }}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}