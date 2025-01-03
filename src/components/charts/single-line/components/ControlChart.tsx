import React, { useState } from 'react';
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
import { ControlChartProps } from '../../types/Chart';
import useWindowDimensions from '@/components/ui/hooks/useWindowDimensions';

const filter = (value: number, mean: number, sd: number) => {
  if (value > mean + 3 * sd) return mean + 3 * sd + sd / 3;
  if (value < mean - 3 * sd) return mean - 3 * sd - sd / 3;
  return value;
};

const CustomDot: React.FC<any> = ({ cx, cy, payload, colors }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={3} fill={colors} />
      <text
        x={cx}
        y={cy - 10}
        fill='var(--color-text-primary)'
        className='text-[0.5rem] text-textPrimary md:text-xs'
        textAnchor='end'
      >
        {payload.rawValue.toFixed(2)}
      </text>
    </g>
  );
};



const ControlChart: React.FC<ControlChartProps> = ({ listing }) => {



  const [useOwnValues, setUseOwnValues] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const data = listing;
  const { mean, sd, name, level, unit_value, ownMeanValue, ownSdValue } = data[0];

  const activeMean = useOwnValues ? ownMeanValue : mean;
  const activeSd = useOwnValues ? ownSdValue : sd;

  const getColorByLevel = (level: string) => {
    switch (level) {
      case 'low':
        return 'var(--color-primary)';
      case 'normal':
        return 'var(--color-secondary)';
      case 'high':
        return 'var(--color-accent)';
      default:
        return 'var(--color-primary)';
    }
  };

  const chartData = data.map((entry) => ({
    date: customFormatDate(entry.date),
    levelLot: entry.level_lot,
    name: name,
    value: filter(entry.value, activeMean, activeSd),
    unitValue: unit_value,
    rawValue: entry.value,
    description: entry.description,
    rules: entry.rules,
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


  const renderLegend = (props: any) => {
    const { payload } = props;
  
    return (
      <div className='mt-2 flex justify-center gap-4 text-xs md:text-sm'>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded-full' style={{ backgroundColor: entry.color }} />
            <span className='text-textPrimary'>{`${level.toUpperCase()}`}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='mb-2 min-h-min w-[98%] md:w-[90%]'>
      <div className='border shadow-md rounded-2xl border-borderColor bg-surface shadow-shadow'>
        <div className='relative flex flex-col items-center'>
        <h2 className='mt-4 flex content-center items-center justify-center text-base text-textSecondary md:text-2xl'>
        {name} - Level {level.toString().toUpperCase()}
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
                  <TbFileDescription className='w-4 h-4 md:h-6 md:w-6' />
                ) : (
                  <TbMathFunction className='w-4 h-4 md:h-6 md:w-6' />
                )}
              </div>
              <span
                className={`text-[8px] font-medium md:text-xs ${useOwnValues ? 'text-textPrimary' : 'text-textSecondary'}`}
              >
                {useOwnValues ? 'Valor Bula' : 'Calculada'}
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
            <LineChart data={chartData} margin={{ }}>
              <CartesianGrid stroke='false' />
              <XAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                dataKey='date'
                angle={-60}
                textAnchor='end'
                tickFormatter={(date) => date}
                height={75}
                width={0}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
              />
              <YAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                domain={[activeMean - 3.5 * activeSd, activeMean + 3.5 * activeSd]}
                textAnchor='end'
                ticks={yAxisValues.map((v) => v.value)}
                width={windowWidth < 768 ? 30 : 40} // 768px is Tailwind's md breakpoint
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
                        {payload.map((item, index) => {
                          const data = item.payload;
                          return (
                            <div
                              key={index}
                              className='pb-2 mb-2 border-b border-border last:border-0 last:pb-0'
                            >
                              <div className='flex items-center gap-2 mb-1'>
                                <div
                                  className='w-3 h-3 rounded-full'
                                  style={{ backgroundColor: 'var(--color-primary)' }}
                                />
                                <span className='font-medium'>
                                  Nível {level.toString().toUpperCase()}
                                </span>
                              </div>
                              <p>Teste: {data.name}</p>
                              <p>Valor: {`${data.rawValue.toFixed(2)} ${data.unitValue}`}</p>
                              <p>Lote: {data.levelLot}</p>
                              <p>Descrição: {data.description}</p>
                              <p>Regras: {data.rules}</p>
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
                dataKey='value'
                stroke={getColorByLevel(level.toString())}
                strokeWidth={1.0}
                activeDot={{ r: 3 }}
                dot={<CustomDot colors={getColorByLevel(level.toString())} />}
                animationDuration={250}
              />

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

export default ControlChart;
