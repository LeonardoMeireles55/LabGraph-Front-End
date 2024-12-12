import React from 'react';
import formatarDate from '../functional/FormatDate';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ListingItem {
  name: string;
  level: number;
  sd: number;
  mean: number;
  date: string;
  value: number;
  unit_value: string;
}

interface ControlChartProps {
  listing: ListingItem[];
}

const filter = (value: number, mean: number, sd: number) => {
  if (value > mean + 3 * sd) return (mean + 3 * sd) + sd / 3;
  if (value < mean - 3 * sd) return (mean - 3 * sd) - sd / 3;
  return value;
};

const CustomDot: React.FC<any> = ({ cx, cy, payload }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={2} fill="var(--color-primary)" />
      <text x={cx} y={cy - 10} fill="var(--color-text-primary)" className='text-[0.5rem] md:text-xs' textAnchor="end">
        {payload.rawValue.toFixed(2)}
      </text>
    </g>
  );
};


const ControlChart: React.FC<ControlChartProps> = ({ listing }) => {
  const data = listing;
  const { mean, sd, name, level, unit_value } = data[0];

  const chartData = data.map(entry => ({
    date: formatarDate(entry.date),
    name: entry.name,
    value: filter(entry.value, mean, sd),
    unitValue: unit_value,
    rawValue: entry.value,
  }));


  const yAxisValues = [
    { value: mean - 3 * sd, label: '-3s', color: 'var(--color-sd3)' },
    { value: mean - 2 * sd, label: '-2s', color: 'var(--color-sd2)' },
    { value: mean - sd, label: '-1s', color: 'var(--color-sd1)' },
    { value: mean, label: 'Média', color: 'var(--color-mean-line)' },
    { value: mean + sd, label: '+1s', color: 'var(--color-sd1)' },
    { value: mean + 2 * sd, label: '+2s', color: 'var(--color-sd2)' },
    { value: mean + 3 * sd, label: '+3s', color: 'var(--color-sd3)' },
  ];

  return (
    <div className='w-[90%] md:w-[95%] 2xl:w-full'>
      <div className="p-0 bg-background border border-borderColor rounded-2xl shadow-xl shadow-shadow">
        <div className="mb-0 mt-8">
          <h2 className="flex justify-center content-center items-center text-base md:text-2xl text-textSecondary">
            {name} - Level {level.toString().toUpperCase()}
          </h2>
        </div>

        <div className="h-[300px] md:min-h-[400px] w-[100%] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 40, right: 20, bottom: 40, left: 20 }}>
              <CartesianGrid stroke="false" />
              <XAxis
                className="text-[0.5rem] md:text-xs text-white"
                dataKey="date"
                angle={-55}
                textAnchor="end"
                tickFormatter={(date) => date}
                height={50}
                width={50}
                tickMargin={6}
                axisLine={false}
                tickLine={false}
                stroke="var(--color-text-primary)"

              />
              <YAxis
                className='text-[0.5rem] md:text-sm text-textPrimary'
                domain={[mean - 3 * sd, mean + 3 * sd]}
                textAnchor="end"
                ticks={yAxisValues.map(v => v.value)}
                width={50}
                height={50}
                tickMargin={6}
                axisLine={false}
                tickLine={false}
                stroke="var(--color-text-primary)"
                tickFormatter={(value) => {
                  const matchingValue = yAxisValues.find(v => Math.abs(v.value - value) < 0.0001);
                  return matchingValue ? matchingValue.label : '';
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background text-xs text-textPrimary p-2  rounded shadow-md shadow-shadow border border-border">
                        <p className="">{`${payload[0].payload.name}`}</p>
                        <p className="">{`${payload[0].payload.rawValue.toFixed(2)} ${payload[0].payload.unitValue}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke='var(--color-primary)'
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
