import React, { useState, useMemo } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { MultipleLineChartProps } from '../../../../types/chartInterfaces';
import customFormatDate from '../../../commons/date-selector/constants/customFormatDate';
import { TbMathFunction, TbFileDescription } from 'react-icons/tb';

const filter = (value: number, mean: number, sd: number) => {
    if (value > mean + 3 * sd) return mean + 3 * sd + sd / 3;
    if (value < mean - 3 * sd) return mean - 3 * sd - sd / 3;
    return value;
};

const normalizeValue = (value: number, mean: number, sd: number) => {
    return (value - mean) / (sd || 1);
};

const CustomDot: React.FC<any> = ({ cx, cy, payload, dataKey, color }) => {
    const value = payload[`raw${dataKey}`];

    return (
        <g>
            <circle cx={cx} cy={cy} r={2} fill={color} />
            <text
                x={cx}
                y={cy - 10}
                fill="var(--color-text-primary)"
                className="text-[0.5rem] md:text-xs"
                textAnchor="end"
            >
                {value?.toFixed(2)}
            </text>
        </g>
    );
};

const MultipleLineControlChart: React.FC<MultipleLineChartProps> = ({ listings, colors }) => {
    const [useOwnValues, setUseOwnValues] = useState(false);

    const defaultColors = useMemo(() =>
        ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"],
        []
    );

    const lineColors = colors || defaultColors;
    const firstDataset = listings[0];
    const dataPoints = firstDataset[0];

    const activeValues = useMemo(() =>
        listings.map((listing) => ({
            mean: useOwnValues ? listing[0].ownMeanValue : listing[0].mean,
            sd: useOwnValues ? listing[0].ownSdValue : listing[0].sd
        })),
        [listings, useOwnValues]
    );

    const chartData = useMemo(() =>
        firstDataset.map((_, index) => {
            const entry: any = {
                date: customFormatDate(firstDataset[index].date),
            };

            listings.forEach((listing, listingIndex) => {
                const currentValue = listing[index]?.value;
                const { mean, sd } = activeValues[listingIndex];

                if (currentValue !== undefined) {
                    const normalizedValue = normalizeValue(currentValue, mean, sd);
                    const filteredValue = filter(normalizedValue, 0, 1);

                    entry[`value${listingIndex + 1}`] = filteredValue;
                    entry[`rawValue${listingIndex + 1}`] = currentValue;
                    entry[`levelLot${listingIndex + 1}`] = listing[index].level_lot;
                    entry[`name${listingIndex + 1}`] = listing[index].name;
                    entry[`description${listingIndex + 1}`] = listing[index].description;
                    entry[`rules${listingIndex + 1}`] = listing[index].rules;
                    entry[`mean${listingIndex + 1}`] = mean;
                    entry[`sd${listingIndex + 1}`] = sd;
                }
            });

            return entry;
        }),
        [firstDataset, listings, activeValues]
    );

    const yAxisValues = [
        { value: -3, label: '-3s', color: 'var(--color-sd3)' },
        { value: -2, label: '-2s', color: 'var(--color-sd2)' },
        { value: -1, label: '-1s', color: 'var(--color-sd1)' },
        { value: 0, label: 'Média', color: 'var(--color-mean-line)' },
        { value: 1, label: '+1s', color: 'var(--color-sd1)' },
        { value: 2, label: '+2s', color: 'var(--color-sd2)' },
        { value: 3, label: '+3s', color: 'var(--color-sd3)' },
    ];

    const renderLegend = (props: any) => {
        const { payload } = props;

        return (
            <div className="flex justify-center gap-4 mt-2 text-xs md:text-sm">
                {payload.map((entry: any, index: number) => (
                    <div
                        key={`legend-${index}`}
                        className="flex items-center gap-2"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-textPrimary">
                            {`Nível ${index + 1}`}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-[98%] md:w-[90%] min-h-min mb-2">
            <div className="rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow">
                <div className="relative flex flex-col items-center">
                    <h2 className="mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl">
                        {dataPoints.name}
                    </h2>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
                        <button
                            onClick={() => setUseOwnValues(!useOwnValues)}
                            className="group flex flex-col items-center transition-all duration-300"
                        >
                            <div className={`rounded-full p-2 transition-all duration-300 ${useOwnValues
                                ? 'text-textPrimary hover:bg-textPrimary/20'
                                : 'text-textSecondary hover:bg-textSecondary/20'
                                }`}>
                                {useOwnValues ? (
                                    <TbFileDescription className="h-4 w-4 md:h-6 md:w-6" />
                                ) : (
                                    <TbMathFunction className="h-4 w-4 md:h-6 md:w-6" />
                                )}
                            </div>
                            <span className={`text-[8px] font-medium md:text-xs ${useOwnValues
                                ? 'text-textPrimary'
                                : 'text-textSecondary'
                                }`}>
                                {useOwnValues ? 'Valor Bula' : 'Calculada'}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex h-[225px] w-[100%] content-center items-center justify-center  md:min-h-[250px] xl:min-h-[325px] 2xl:min-h-[350px] 3xl:min-h-[500px]">
                    <ResponsiveContainer
                        className="flex content-center items-center justify-center bg-surface"
                        width="99%"
                        height="95%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                            <CartesianGrid stroke="false" />
                            <XAxis
                                className="text-[0.3rem] text-textPrimary md:text-xs"
                                dataKey="date"
                                angle={-55}
                                textAnchor="end"
                                tickFormatter={(date) => date}
                                height={50}
                                width={50}
                                tickMargin={5}
                                axisLine={false}
                                tickLine={false}
                                stroke="var(--color-text-primary)"
                            />
                            <YAxis
                                className="text-[0.5rem] text-textPrimary md:text-xs"
                                domain={[0 - 3 * 1, 0 + 3 * 1]}
                                textAnchor="end"
                                ticks={yAxisValues.map((v) => v.value)}
                                width={50}
                                height={50}
                                tickMargin={5}
                                axisLine={false}
                                tickLine={false}
                                stroke="var(--color-text-primary)"
                                tickFormatter={(value) => {
                                    const matchingValue = yAxisValues.find((v) => Math.abs(v.value - value) < 0.0001);
                                    return matchingValue ? matchingValue.label : '';
                                }}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        const date = data.date;

                                        return (
                                            <div className="rounded border border-border bg-background p-2 text-xs text-textPrimary shadow-md shadow-shadow">
                                                <p className="font-semibold border-b border-border pb-1 mb-2">Data: {date}</p>
                                                {payload.map((entry, index) => {
                                                    const valueKey = `value${index + 1}`;
                                                    const rawValueKey = `rawValue${index + 1}`;
                                                    const levelLotKey = `levelLot${index + 1}`;
                                                    const nameKey = `name${index + 1}`;
                                                    const descriptionKey = `description${index + 1}`;
                                                    const rulesKey = `rules${index + 1}`;

                                                    if (data[valueKey]) {
                                                        const rawValue = data[rawValueKey];
                                                        return (
                                                            <div key={index} className={index > 0 ? "mt-2 border-t border-border pt-2" : ""}>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <div
                                                                        className="w-3 h-3 rounded-full"
                                                                        style={{ backgroundColor: entry.stroke }}
                                                                    />
                                                                    <span className="font-medium">Nível {index + 1}</span>
                                                                </div>
                                                                <p>Teste: {data[nameKey]}</p>
                                                                <p>Valor: {rawValue?.toFixed(2)}</p>
                                                                <p>Lote: {data[levelLotKey]}</p>
                                                                <p>Descrição: {data[descriptionKey]}</p>
                                                                {data[rulesKey] && <p>Regras: {data[rulesKey]}</p>}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {listings.map((_, index) => (
                                <Line
                                    key={index}
                                    type="linear"
                                    dataKey={`value${index + 1}`}
                                    name={`Nível ${index + 1}`}
                                    stroke={lineColors[index]}
                                    strokeWidth={1.2}
                                    activeDot={{ r: 4 }}
                                    dot={<CustomDot color={lineColors[index]} />}
                                    animationDuration={500}
                                />
                            ))}
                            {yAxisValues.map((line, index) => (
                                <ReferenceLine
                                    key={index}
                                    y={line.value}
                                    stroke={line.color}
                                    strokeDasharray="5 5"
                                    strokeWidth={1.1}
                                    strokeOpacity={1.0}
                                />
                            ))}
                            <Legend
                                content={renderLegend}
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ paddingTop: '10px' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MultipleLineControlChart);