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

const ControlChart: React.FC<ControlChartProps> = ({ listing }) => {
  const data = listing;
  const { mean, sd, name, level } = data[0];

  const chartData = data.map(entry => ({
    date: formatarDate(entry.date),
    value: filter(entry.value, mean, sd),
    rawValue: entry.value,
  }));

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
    <div className="flex justify-center items-center text-center content-center p-6 md:p-8 bg-background border border-textSecondary/5 rounded-2xl shadow-md shadow-shadow hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-textPrimary">
          {name} - Level {level.toString().toUpperCase()}
        </h2>
      </div>

      <div className="h-[250px] md:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--color-grid-lines)" />
            <XAxis
              dataKey="date"
              angle={window.innerWidth < 768 ? -25 : -45} // Ajuste o ângulo em telas menores
              textAnchor="end"
              height={70}
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)' }}
              tickFormatter={(date) => date}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[mean - 3.0 * sd, mean + 3.0 * sd]}
              stroke="var(--color-text-secondary)"
              ticks={yAxisValues.map(v => v.value)}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                const matchingValue = yAxisValues.find(v => Math.abs(v.value - value) < 0.0001);
                return matchingValue ? matchingValue.label : '';
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background p-4 rounded shadow-md shadow-shadow border border-border">
                      <p className=" ">
                        DATA: {payload[0].payload.date}
                      </p>
                      <p className="">
                        VALOR: {payload[0].payload.rawValue.toFixed(2)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type="monotone" dataKey="value" strokeWidth={2} stroke="var(--color-primary)" activeDot={{ r: 4 }} />

            {yAxisValues.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line.value}
                stroke={line.color}
                strokeDasharray="3 3"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ControlChart;
