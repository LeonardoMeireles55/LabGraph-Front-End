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
      <circle cx={cx} cy={cy} r={3} fill="var(--color-primary)" />
      <text x={cx} y={cy - 10} fill="var(--color-text-primary)" fontSize={12} textAnchor="end">
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

  console.log(chartData)

  const yAxisValues = [
    { value: mean - 3 * sd, label: '-3s', color: '#ff0000' },
    { value: mean - 2 * sd, label: '-2s', color: '#ff9900' },
    { value: mean - sd, label: '-1s', color: '#ffc400' },
    { value: mean, label: 'Média', color: '#00cc00' },
    { value: mean + sd, label: '+1s', color: '#ffc400' },
    { value: mean + 2 * sd, label: '+2s', color: '#ff9900' },
    { value: mean + 3 * sd, label: '+3s', color: '#ff0000' },
  ];

  return (
    <div className="flex justify-center items-center text-center content-center p-6 md:p-8 bg-background border border-borderColor rounded-2xl shadow-md shadow-shadow hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-md md:text-xl text-textSecondary">
          {name} - Level {level.toString().toUpperCase()}
        </h2>
      </div>

      <div className="h-[250px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} stroke="false" />
            <XAxis
              dataKey="date"
              angle={window.innerWidth < 768 ? -25 : -45} // Ajuste o ângulo em telas menores
              textAnchor="end"
              height={70}
              tickFormatter={(date) => date}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[mean - 3.0 * sd, mean + 3.0 * sd]}
              ticks={yAxisValues.map(v => v.value)}
              axisLine={false}
              tickLine={false}
              strokeWidth={5.0}
              tickFormatter={(value) => {
                const matchingValue = yAxisValues.find(v => Math.abs(v.value - value) < 0.0001);
                return matchingValue ? matchingValue.label : '';
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background text-xs p-2 rounded shadow-md shadow-shadow border border-border">
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
              strokeWidth={2.0}
              activeDot={{ r: 6 }}
              dot={<CustomDot />}
            />

            {yAxisValues.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line.value}
                stroke={line.color}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ControlChart;
