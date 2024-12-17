import React, { useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ControlChartProps } from '../types/chartInterfaces';
import customFormatDate from '../utils/customFormatDate';
import { TbMathFunction, TbFileDescription } from 'react-icons/tb';

const filter = (value: number, mean: number, sd: number) => {
    if (value > mean + 3 * sd) return mean + 3 * sd + sd / 3;
    if (value < mean - 3 * sd) return mean - 3 * sd - sd / 3;
    return value;
};

const CustomDot: React.FC<any> = ({ cx, cy, payload }) => {
    return (
        <g>
            <circle cx={cx} cy={cy} r={2} fill="var(--color-primary)" />
            <text
                x={cx}
                y={cy - 10}
                fill="var(--color-text-primary)"
                className="text-[0.5rem] md:text-xs"
                textAnchor="end"
            >
                {payload.rawValue.toFixed(2)}
            </text>
        </g>
    );
};

const ControlChart: React.FC<ControlChartProps> = ({ listing }) => {

    const [useOwnValues, setUseOwnValues] = useState(false);

    const data = listing;
    const { level_lot, mean, sd, name, level, unit_value, description, ownMeanValue, ownSdValue } = data[0];

    const activeMean = useOwnValues ? ownMeanValue : mean;
    const activeSd = useOwnValues ? ownSdValue : sd;

    const chartData = data.map((entry) => ({
        date: customFormatDate(entry.date),
        levelLot: level_lot,
        name: entry.name,
        value: filter(entry.value, activeMean, activeSd),
        unitValue: unit_value,
        rawValue: entry.value,
        description: description,
    }));

    const yAxisValues = [
        { value: activeMean - 3 * activeSd, label: '-3s', color: 'var(--color-sd3)' },
        { value: activeMean - 2 * activeSd, label: '-2s', color: 'var(--color-sd2)' },
        { value: activeMean - activeSd, label: '-1s', color: 'var(--color-sd1)' },
        { value: activeMean, label: 'Média', color: 'var(--color-mean-line)' },
        { value: activeMean + activeSd, label: '+1s', color: 'var(--color-sd1)' },
        { value: activeMean + 2 * activeSd, label: '+2s', color: 'var(--color-sd2)' },
        { value: activeMean + 3 * activeSd, label: '+3s', color: 'var(--color-sd3)' },
    ];

    return (
        <div className="w-[98%] md:w-[75%]">
            <div className="rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow">
                <div className="relative flex flex-col items-center">
                    <h2 className="mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl">
                        {name} - Level {level.toString().toUpperCase()}
                    </h2>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
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

                <div className="m-0 flex h-[300px] w-[100%] content-center items-center justify-center p-0 md:min-h-[375px]">
                    <ResponsiveContainer
                        className="flex content-center items-center justify-center bg-surface"
                        width="99%"
                        height="95%"
                    >
                        <LineChart data={chartData} margin={{ top: 40, right: 25, bottom: 40, left: 0 }}>
                            <CartesianGrid stroke="false" />
                            <XAxis
                                className="text-[0.5rem] text-white md:text-xs"
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
                                className="text-[0.5rem] text-textPrimary md:text-sm"
                                domain={[activeMean - 3 * activeSd, activeMean + 3 * activeSd]}
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
                                        return (
                                            <div className="rounded border border-border bg-background p-2 text-xs text-textPrimary shadow-md shadow-shadow">
                                                <p className="">{`${payload[0].payload.name}`}</p>
                                                <p className="">{`${payload[0].payload.rawValue.toFixed(2)} ${payload[0].payload.unitValue}`}</p>
                                                <p className="">{`${payload[0].payload.levelLot}`}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="linear"
                                dataKey="value"
                                stroke="var(--color-primary)"
                                strokeWidth={1.2}
                                activeDot={{ r: 4 }}
                                dot={<CustomDot />}
                            />

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
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ControlChart;
