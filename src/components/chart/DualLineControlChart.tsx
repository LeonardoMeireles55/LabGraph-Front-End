import React, { useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DualLineControlChartProps } from '../../types/chartInterfaces';
import customFormatDate from '../utils/customFormatDate';
import { TbMathFunction, TbFileDescription } from 'react-icons/tb';

const filter = (value: number, mean: number, sd: number) => {
    if (value > mean + 3 * sd) return mean + 3 * sd + sd / 3;
    if (value < mean - 3 * sd) return mean - 3 * sd - sd / 3;
    return value;
};

const normalizeValue = (value: number, mean: number, sd: number) => {
    return (value - mean) / (sd || 1);
};

const CustomDot: React.FC<any> = ({ cx, cy, payload, dataKey }) => {
    const color = dataKey === 'valueOne' ? "var(--color-primary)" : "var(--color-secondary)";
    const value = dataKey === 'valueOne' ? payload.rawValueOne : payload.rawValueTwo;

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
            </text>
        </g>
    );
};

const DualLineControlChart: React.FC<DualLineControlChartProps> = ({ listingOne, listingTwo }) => {
    const [useOwnValues, setUseOwnValues] = useState(false);

    const dataOne = listingOne[0];
    const dataTwo = listingTwo[0];

    const activeMeanOne = useOwnValues ? dataOne.ownMeanValue : dataOne.mean;
    const activeSdOne = useOwnValues ? dataOne.ownSdValue : dataOne.sd;
    const activeMeanTwo = useOwnValues ? dataTwo.ownMeanValue : dataTwo.mean;
    const activeSdTwo = useOwnValues ? dataTwo.ownSdValue : dataTwo.sd;

    const chartData = listingOne.map((entry, index) => {
        const normalizedValueOne = normalizeValue(entry.value, activeMeanOne, activeSdOne);
        const filteredValueOne = filter(normalizedValueOne, 0, 1);

        const valueTwo = listingTwo[index]?.value;
        const normalizedValueTwo = normalizeValue(valueTwo, activeMeanTwo, activeSdTwo);
        const filteredValueTwo = filter(normalizedValueTwo, 0, 1);

        return {
            date: customFormatDate(entry.date),
            levelLotOne: entry.level_lot,
            nameOne: entry.name,
            valueOne: filteredValueOne,
            rawValueOne: entry.value,
            meanOne: activeMeanOne,
            sdOne: activeSdOne,
            descriptionOne: entry.description,
            rulesOne: entry.rules,
            levelLotTwo: listingTwo[index]?.level_lot,
            nameTwo: listingTwo[index]?.name,
            valueTwo: filteredValueTwo,
            rawValueTwo: valueTwo,
            meanTwo: activeMeanTwo,
            sdTwo: activeSdTwo,
            descriptionTwo: listingTwo[index]?.description,
            rulesTwo: listingTwo[index]?.rules,
        };
    });

    // Valores fixos para o eixo Y em desvios padrão
    const yAxisValues = [
        { value: -3, label: '-3s', color: 'var(--color-sd3)' },
        { value: -2, label: '-2s', color: 'var(--color-sd2)' },
        { value: -1, label: '-1s', color: 'var(--color-sd1)' },
        { value: 0, label: 'Média', color: 'var(--color-mean-line)' },
        { value: 1, label: '+1s', color: 'var(--color-sd1)' },
        { value: 2, label: '+2s', color: 'var(--color-sd2)' },
        { value: 3, label: '+3s', color: 'var(--color-sd3)' },
    ];

    return (
        <div className="w-[98%] md:w-[90%] min-h-min mb-2">
            <div className="rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow">
                <div className="relative flex flex-col items-center">
                <h2 className="mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl">
                        {dataOne.name}
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
                        <LineChart data={chartData} margin={{ top: 40, right: 25, bottom: 40, left: 0 }}>
                            <CartesianGrid stroke="false" />
                            <XAxis
                                className="text-[0.5rem] text-textPrimary md:text-xs"
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
                                        return (
                                            <div className="rounded border border-border bg-background p-2 text-xs text-textPrimary shadow-md shadow-shadow">
                                                <div className="mb-2 border-b border-border pb-2">
                                                    <p>Teste 1: {data.nameOne}</p>
                                                    <p>Valor: {data.rawValueOne?.toFixed(2)}</p>
                                                    <p>Desvios da média: {data.valueOne?.toFixed(2)}s</p>
                                                    <p>Lote: {data.levelLotOne}</p>
                                                    <p>Descrição: {data.descriptionOne}</p>
                                                    <p>Regras: {data.rulesOne}</p>
                                                </div>
                                                {data.valueTwo && (
                                                    <div>
                                                        <p>Teste 2: {data.nameTwo}</p>
                                                        <p>Valor: {data.rawValueTwo?.toFixed(2)}</p>
                                                        <p>Desvios da média: {data.valueTwo?.toFixed(2)}s</p>
                                                        <p>Lote: {data.levelLotTwo}</p>
                                                        <p>Descrição: {data.descriptionTwo}</p>
                                                        <p>Regras: {data.rulesTwo}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="linear"
                                dataKey="valueOne"
                                stroke="var(--color-primary)"
                                strokeWidth={1.2}
                                activeDot={{ r: 4 }}
                                dot={<CustomDot />}
                                animationDuration={500}
                            />
                            <Line
                                type="linear"
                                dataKey="valueTwo"
                                stroke="var(--color-secondary)"
                                strokeWidth={1.2}
                                activeDot={{ r: 4 }}
                                dot={<CustomDot />}
                                animationDuration={500}
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

export default DualLineControlChart;
