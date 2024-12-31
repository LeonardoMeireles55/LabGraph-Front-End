import React, { useState, useMemo } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { MeanStdDevValue, MultipleLineChartProps } from '../../types/Chart';
import customFormatDate from '../../../shared/date-selector/constants/customFormatDate';
import { TbMathFunction, TbFileDescription } from 'react-icons/tb';

const filter = (value: number, mean: number, sd: number) => {
    if (value > mean + 3 * sd) return mean + 3 * sd;
    if (value < mean - 3 * sd) return mean - 3 * sd;
    return value;
};


const normalizeValue = (value: number, mean: number, sd: number) => {
 
    return (filter(value, mean, sd) - mean) / (sd || 1);
};

const CustomDot: React.FC<any> = ({ cx, cy, color }) => {

    return (
        <g>
            <circle cx={cx} cy={cy} r={2.5} fill={color} />
        </g>
    );
};


const MultipleLineControlChart: React.FC<MultipleLineChartProps> = ({ listings }) => {

    const [useOwnValues, setUseOwnValues] = useState(false);
    
    const lineColors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];

    const chartData = useMemo(() => {
        if (!listings || listings.length === 0) return [];

        const maxLength = Math.max(
            ...listings.map(level => level.genericValuesGroupByLevel.values.length)
        );

        return Array.from({ length: maxLength }).map((_, index) => {
            const entry: any = {};

            listings.forEach((level, levelIndex) => {
                const values = level.genericValuesGroupByLevel.values[index];
                const ownValues = level.genericValuesGroupByLevel.values[index];
                if (values) {
                    if (levelIndex === 0) {
                        entry.date = customFormatDate(values.date);
                    }

                    const { mean, standardDeviation }: MeanStdDevValue = { mean: values.mean, standardDeviation: values.sd };

                    const levelNum = levelIndex + 1;
                    entry[`value${levelNum}`] = normalizeValue(values.value, mean, standardDeviation);
                    entry[`rawValue${levelNum}`] = values.value.toFixed(2)
                    entry[`levelLot${levelNum}`] = values.level_lot;
                    entry[`name${levelNum}`] = values.name;
                    entry[`description${levelNum}`] = values.description;
                    entry[`rules${levelNum}`] = values.rules;
                    entry[`mean${levelNum}`] = useOwnValues? ownValues.mean : mean;
                    entry[`sd${levelNum}`] = useOwnValues? ownValues.sd : standardDeviation;
                }
            });

            return entry;
        });
    }, [listings, useOwnValues]);
    
        const yAxisValues = useMemo(() => [
            { value: -3, label: '-3s', color: 'var(--color-sd3)' },
            { value: -2, label: '-2s', color: 'var(--color-sd2)' },
            { value: -1, label: '-1s', color: 'var(--color-sd1)' },
            { value: 0, label: 'Média', color: 'var(--color-mean-line)' },
            { value: 1, label: '+1s', color: 'var(--color-sd1)' },
            { value: 2, label: '+2s', color: 'var(--color-sd2)' },
            { value: 3, label: '+3s', color: 'var(--color-sd3)' },
        ], []);

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
                        {listings[0].genericValuesGroupByLevel.values[0].name}
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
                        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
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
                                domain={[0 - 3.5 * 1, 0 + 3.5* 1]}
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
                                            <div className="rounded border border-border bg-background p-2 text-[0.5rem] md:text-[0.65rem] text-textPrimary shadow-md shadow-shadow">
                                                <p className="font-semibold border-b border-border pb-1 mb-2">Data: {date}</p>
                                                {payload.map((entry, index) => {
                                                    const valueKey = `value${index + 1}`;
                                                    const rawValueKey = `rawValue${index + 1}`;
                                                    const levelLotKey = `levelLot${index + 1}`;
                                                    const nameKey = `name${index + 1}`;
                                                    const descriptionKey = `description${index + 1}`;
                                                    const rulesKey = `rules${index + 1}`;

                                                    if (data[valueKey]) {
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
                                                                <p>Valor: {data[rawValueKey]}</p>
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
                                    dataKey={`value${index +1}`}
                                    name={`Nível ${index}`}
                                    stroke={lineColors[index]}
                                    strokeWidth={1.0}
                                    connectNulls={true}
                                    activeDot={{ color: lineColors[index], r: 3 }}
                                    dot={<CustomDot color={lineColors[index]} />}
                                    animationDuration={250}
                                />
                            ))}
                            {yAxisValues.map((line, index) => (
                                <ReferenceLine
                                    key={index}
                                    y={line.value}
                                    stroke={line.color}
                                    strokeDasharray="5 5"
                                    strokeWidth={1.0}
                                    strokeOpacity={1.0}
                                />
                            ))}
                            <Legend
                                content={renderLegend}
                                verticalAlign="bottom"
                                wrapperStyle={{ paddingTop: '10px' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MultipleLineControlChart;
