import useWindowDimensions from '@/components/shared/ui/hooks/useWindowDimensions';
import React, { useMemo, useState } from 'react';
import { TbFileDescription, TbMathFunction } from 'react-icons/tb';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts';
import customFormatDate from '../../../shared/date-selector/constants/customFormatDate';
import normalizeValue from '../../constants/normalizeValue';
import { MeanStdDevValue, MultipleLineChartProps } from '../../types/Chart';

const MultipleLineControlChart: React.FC<MultipleLineChartProps> = ({ listings }) => {
  const [useOwnValues, setUseOwnValues] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const lineColors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)'];

  const levels = useMemo(() => {
    if (!listings || listings.length === 0) return [];
    return listings.map((level) => level.groupedValuesByLevelDTO.level);
  }, [listings]);

  const chartData = useMemo(() => {
    if (!listings || listings.length === 0) return [];

    const maxLength = Math.max(
      ...listings.map((level) => level.groupedValuesByLevelDTO.values.length)
    );

    return Array.from({ length: maxLength }).map((_, index) => {
      const entry: any = {};

      for (let levelIndex = 0; levelIndex < listings.length; levelIndex++) {
        const data = listings[levelIndex];
        const values = data.groupedValuesByLevelDTO.values[index];
        const ownMean = data.groupedMeanAndStdByLevelDTO.values[0].mean;
        const ownSd = data.groupedMeanAndStdByLevelDTO.values[0].standardDeviation;

        if (values) {
          const { mean, standardDeviation }: MeanStdDevValue = useOwnValues
            ? { mean: ownMean, standardDeviation: ownSd }
            : {
                mean: values.mean,
                standardDeviation: values.sd,
              };

          entry.date = customFormatDate(values.date);

          const levelNum = levelIndex + 1;

          entry[`value${levelNum}`] = normalizeValue(values.value, mean, standardDeviation);
          entry[`date${levelNum}`] = customFormatDate(values.date);
          entry[`level${levelNum}`] = values.level;
          entry[`rawValue${levelNum}`] = values.value.toFixed(2);
          entry[`levelLot${levelNum}`] = values.level_lot;
          entry[`name${levelNum}`] = values.name;
          entry[`description${levelNum}`] = values.description;
          entry[`rules${levelNum}`] = values.rules;
          entry[`mean${levelNum}`] = useOwnValues ? ownMean : mean;
          entry[`sd${levelNum}`] = useOwnValues ? ownSd : standardDeviation;
        }
      }

      return entry;
    });
  }, [listings, useOwnValues]);

  const yAxisValues = useMemo(
    () => [
      { value: -3, label: '-3s', color: 'var(--color-sd3)' },
      { value: -2, label: '-2s', color: 'var(--color-sd2)' },
      { value: -1, label: '-1s', color: 'var(--color-sd1)' },
      { value: 0, label: 'Mean', color: 'var(--color-mean-line)' },
      { value: 1, label: '+1s', color: 'var(--color-sd1)' },
      { value: 2, label: '+2s', color: 'var(--color-sd2)' },
      { value: 3, label: '+3s', color: 'var(--color-sd3)' },
    ],
    []
  );

  if (!listings || listings.length === 0) return null;

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded-full' style={{ backgroundColor: entry.color }} />
            <span className='text-textPrimary'>{`${levels[index].toUpperCase()}`}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='mb-2 min-h-min w-[98%] md:w-[90%]'>
      <div className='rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h2 className='mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl'>
            {listings[0].groupedValuesByLevelDTO.values[0].name}
          </h2>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 transform'>
            <button
              onClick={() => setUseOwnValues(!useOwnValues)}
              className='group flex flex-col items-center transition-all duration-300'
            >
              <div
                className={`rounded-full p-2 transition-all duration-300 ${
                  useOwnValues
                    ? 'hover:bg-textPrimary/20 text-textPrimary'
                    : 'hover:bg-textSecondary/20 text-textSecondary'
                }`}
              >
                {useOwnValues ? (
                  <TbMathFunction className='h-4 w-4 md:h-6 md:w-6' />
                ) : (
                  <TbFileDescription className='h-4 w-4 md:h-6 md:w-6' />
                )}
              </div>
              <span
                className={`text-[8px] font-medium md:text-xs ${useOwnValues ? 'text-textPrimary' : 'text-textSecondary'}`}
              >
                {useOwnValues ? 'Calculated' : 'Reference Value'}
              </span>
            </button>
          </div>
        </div>

        <div className='flex h-[250px]  content-center items-center justify-center md:min-h-[250px] xl:min-h-[300px] 2xl:min-h-[350px] 3xl:min-h-[550px]'>
          <ResponsiveContainer
            className='flex items-center content-center justify-center bg-surface'
            width='98%'
            height='98%'
          >
            <LineChart data={chartData} margin={{}}>
              <CartesianGrid stroke='false' />
              {/* <XAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                dataKey='date'
                angle={-55}
                textAnchor='end'
                tickFormatter={(date) => date}
                height={windowWidth < 768 ? 40 : 60}
                width={windowWidth < 768 ? 30 : 40}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
              /> */}
              <YAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                domain={[0 - 3.5 * 1, 0 + 3.5 * 1]}
                textAnchor='end'
                ticks={yAxisValues.map((v) => v.value)}
                dataKey='sd'
                width={windowWidth < 768 ? 30 : 50}
                height={0}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
                tickFormatter={(value) => {
                  const matchingValue = yAxisValues.find((v) => Math.abs(v.value - value) < 0.0001);
                  return matchingValue ? matchingValue.label : '';
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const uniqueEntries = payload.filter(
                      (entry, index, self) =>
                        index ===
                        self.findIndex(
                          (e) =>
                            e.dataKey &&
                            entry.dataKey &&
                            e.payload[`date${e.dataKey.toString().slice(-1)}`] ===
                              entry.payload[`date${entry.dataKey.toString().slice(-1)}`] &&
                            e.payload[`level${e.dataKey.toString().slice(-1)}`] ===
                              entry.payload[`level${entry.dataKey.toString().slice(-1)}`]
                        )
                    );

                    return (
                      <div className='rounded border border-border bg-background p-1 text-[0.5rem] text-textPrimary shadow-md shadow-shadow md:text-[0.65rem]'>
                        {uniqueEntries.map((entry, index) => {
                          const dataKeyIndex = entry.dataKey?.toString().slice(-1) ?? '';
                          const data = entry.payload;
                          const date = `date${dataKeyIndex}`;
                          const level = `level${dataKeyIndex}`;
                          const valueKey = `value${dataKeyIndex}`;
                          const rawValueKey = `rawValue${dataKeyIndex}`;
                          const levelLotKey = `levelLot${dataKeyIndex}`;
                          const nameKey = `name${dataKeyIndex}`;
                          // const descriptionKey = `description${dataKeyIndex}`;
                          // const rulesKey = `rules${dataKeyIndex}`;
                          const meanKey = `mean${dataKeyIndex}`;
                          const sdKey = `sd${dataKeyIndex}`;

                          if (data[valueKey]) {
                            return (
                              <div key={index} className={'border-border pt-2'}>
                                <div className='mb-1 flex items-center gap-2'>
                                  <div
                                    className='h-3 w-3 rounded-full'
                                    style={{
                                      backgroundColor: entry.stroke,
                                    }}
                                  />
                                  <span className='font-medium'>{data[level].toUpperCase()}</span>
                                </div>
                                <p>Date: {data[date]}</p>
                                <p>Test: {data[nameKey]}</p>
                                <p>Value: {data[rawValueKey]}</p>
                                <p>Lot: {data[levelLotKey]}</p>
                                <p>Mean: {data[meanKey].toFixed(2)}</p>
                                <p>Sd: {data[sdKey].toFixed(2)}</p>
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
                  type='linear'
                  dataKey={`value${index + 1}`}
                  name={`Nível ${index}`}
                  stroke={lineColors[index]}
                  strokeWidth={1.0}
                  connectNulls={true}
                  activeDot={{
                    color: lineColors[index],
                    r: 3,
                  }}
                  dot={{
                    fill: lineColors[index],
                    stroke: lineColors[index],
                    r: 2,
                    strokeWidth: 1,
                    className: 'text-textPrimary',
                  }}
                  animationDuration={250}
                />
              ))}
              {yAxisValues.map((line, index) => (
                <ReferenceLine
                  key={index}
                  y={line.value}
                  stroke={line.color}
                  strokeDasharray='5 5'
                  strokeWidth={1.0}
                  strokeOpacity={1.0}
                />
              ))}
              <Legend
                content={renderLegend}
                verticalAlign='bottom'
                wrapperStyle={{ paddingBottom: '0px' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MultipleLineControlChart;
