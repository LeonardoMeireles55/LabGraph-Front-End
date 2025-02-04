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
  XAxis,
  YAxis,
} from 'recharts';
import customFormatDate from '../../../shared/date-selector/constants/customFormatDate';
import getColorByLevel from '../../constants/getColorByLevel';
import normalizeValue from '../../constants/normalizeValue';
import { ControlChartProps } from '../../types/Chart';

const ControlChart: React.FC<ControlChartProps> = ({ listing }) => {
  const [useOwnValues, setUseOwnValues] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const data = listing;

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${entry}`} className='flex items-center gap-2'>
            <div
              className='h-2.5 w-2.5 rounded-full'
              style={{
                backgroundColor: getColorByLevel(data[index].level.toString()),
              }}
            />
            <span className='text-textPrimary text-xs md:text-sm'>{`${data[index].level.toString().toUpperCase()}`}</span>
          </div>
        ))}
      </div>
    );
  };

  const chartData = data.map((entry, index) => ({
    key: index,
    date: customFormatDate(entry.date),
    levelLot: entry.level_lot,
    level: entry.level,
    name: entry.name,
    value: normalizeValue(
      entry.value,
      useOwnValues ? entry.ownMeanValue : entry.mean,
      useOwnValues ? entry.ownSdValue : entry.sd
    ),

    unitValue: entry.unit_value,
    rawValue: entry.value,
    sd: useOwnValues ? entry.ownSdValue : entry.sd,
    mean: useOwnValues ? entry.ownSdValue : entry.mean,
    OwnSd: entry.ownSdValue,
    OwnMean: entry.ownMeanValue,
    description: entry.description,
    rules: entry.rules,
  }));

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

  return (
    <div className='mb-2 min-h-min w-[98%] md:w-[90%]'>
      <div className='border shadow-md rounded-2xl border-borderColor bg-surface shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h2 className='mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl italic'>
            {chartData[0].name} - Level {chartData[0].level.toString().toUpperCase()}
          </h2>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 transform'>
            <button
              onClick={() => setUseOwnValues(!useOwnValues)}
              className='flex flex-col items-center transition-all duration-300 group'
            >
              <div
                className={`rounded-full p-2 transition-all duration-300 ${
                  useOwnValues
                    ? 'hover:bg-textPrimary/20 text-textPrimary'
                    : 'hover:bg-textSecondary/20 text-textSecondary'
                }`}
              >
                {useOwnValues ? (
                  <TbMathFunction className='w-4 h-4 md:h-6 md:w-6' />
                ) : (
                  <TbFileDescription className='w-4 h-4 md:h-6 md:w-6' />
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
        <div className='flex h-[275px] content-center items-center justify-center md:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[350px] 3xl:min-h-[550px]'>
          <ResponsiveContainer
            className='flex items-center content-center justify-center bg-surface'
            width='97%'
            height='96%'
          >
            <LineChart data={chartData} margin={{}}>
              <CartesianGrid stroke='false' />
              <XAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                dataKey='date'
                angle={-60}
                textAnchor='end'
                tickFormatter={(date) => date}
                height={windowWidth < 768 ? 40 : 60}
                width={windowWidth < 768 ? 30 : 40}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
              />
              <YAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                domain={[0 - 3.5 * 1, 0 + 3.5 * 1]}
                textAnchor='end'
                ticks={yAxisValues.map((v) => v.value)}
                width={windowWidth < 768 ? 30 : 40}
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
                    return (
                      <div className='p-2 text-xs border rounded shadow-md border-border bg-background text-textPrimary shadow-shadow'>
                        {payload.map((item) => {
                          const data = item.payload;
                          return (
                            <div
                              key={`${data.date}-${data.level}-${data.levelLot}`}
                              className='mb-2 border-b border-border last:border-0 last:pb-0'
                            >
                              <div className='flex items-center gap-2 mb-1'>
                                <div
                                  className='w-2.5 h-2.5 rounded-full'
                                  style={{
                                    backgroundColor: getColorByLevel(data.level),
                                  }}
                                />
                                <span className='font-medium'>
                                  Level: {data.level.toUpperCase()}
                                </span>
                              </div>
                              <p>Test: {data.name}</p>
                              <p>Date: {data.date}</p>
                              <p>Value: {`${data.rawValue.toFixed(2)} ${data.unitValue}`}</p>
                              <p>Lot: {data.levelLot}</p>
                              <p>Mean: {data.mean.toFixed(2)}</p>
                              <p>Sd: {data.sd.toFixed(2)}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type='linear'
                dataKey={`value`}
                name={`level`}
                stroke={getColorByLevel(data[0].level.toString())}
                strokeWidth={1.0}
                connectNulls={true}
                activeDot={{
                  color: getColorByLevel(data[0].level.toString()),
                  r: 3,
                }}
                dot={{
                  fill: getColorByLevel(data[0].level.toString()),
                  stroke: getColorByLevel(data[0].level.toString()),
                  r: 2,
                  strokeWidth: 1,
                  className: 'text-textPrimary',
                }}
                animationDuration={250}
              />
              {yAxisValues.map((line, index) => (
                <ReferenceLine
                  key={index}
                  y={line.value}
                  stroke={line.color}
                  strokeDasharray='4 4'
                  strokeWidth={1.0}
                  strokeOpacity={1.0}
                />
              ))}
              <Legend
                content={renderLegend}
                verticalAlign='bottom'
                wrapperStyle={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  fontStyle: 'italic',
                  fontSize: 'x-small',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ControlChart;
