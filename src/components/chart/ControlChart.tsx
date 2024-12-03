import React from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { Layout, Shape, ScatterData } from 'plotly.js';
import dynamic from 'next/dynamic';
import formatarDate from '../functional/FormatDate';

interface DataEntry {
  date: string;
  value: number;
  mean: number;
  sd: number;
  name: string;
  level: string;
}

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
  width: number;
  height: number;
  colors: {
    primary: string;
    textPrimary: string;
    textSecondary: string;
    surface: string;
    border: string;
    gridLines: string;
    meanLine: string;
    sd1: string;
    sd2: string;
    sd3: string;
  };
}


const filter = (value: number, mean: number, sd: number) => {
  if (value > mean + 3 * sd) return (mean + 3 * sd) + sd/3;
  if (value < mean - 3 * sd) return (mean - 3 * sd) - sd/3;
  return value;
};

const ControlChart: React.FC<ControlChartProps> = ({ listing, width, height, colors }) => {
  const data = listing;
  const dates = data.map(entry => formatarDate(entry.date).toString());
  const values = data.map(entry => entry.value);
  const { mean, sd, name, level } = data[0];

  const yaxisRange = [mean - (3 * 1.2) * sd, mean + (3 * 1.2) * sd];
  const yTickValues = [mean - 3 * sd, mean - 2 * sd, mean - sd, mean, mean + sd, mean + 2 * sd, mean + 3 * sd];
  const yTickText = ['-3s ', '-2s ', '-1s ', 'Média ', '+1s ', '+2s ', '+3s '];

  const plotData: Partial<ScatterData>[] = [{
    x: dates,
    y: values.map(value => 
      value < mean - 3 * sd || value > mean + 3 * sd 
        ? filter(value, mean, sd) 
        : value),
    type: 'scatter',
    mode: 'text+lines+markers',
    text: values.map(value => value.toFixed(2)),
    textposition: 'top center',
    textfont: { 
      size: 12, 
      color: colors.textSecondary
    },
    marker: { 
      color: colors.primary,
      size: 8,
      line: {
        color: colors.border,
        width: 1
      }
    },
    line: {
      color: colors.primary,
      width: 2
    },
    name: 'Valores',
  }];

  const lines = [
    { multiple: 3, color: colors.sd3, legend: '3x SD' },
    { multiple: 2, color: colors.sd2, legend: '2x SD' },
    { multiple: 1, color: colors.sd1, legend: '1x SD' },
    { multiple: 0, color: colors.meanLine, legend: 'mean' },
    { multiple: -1, color: colors.sd1, legend: '-1x SD' },
    { multiple: -2, color: colors.sd2, legend: '-2x SD' },
    { multiple: -3, color: colors.sd3, legend: '-3x SD' },
  ];

  const shapes: Partial<Shape>[] = lines.map(line => ({
    type: 'line' as const,
    xref: 'paper',
    x0: 0,
    x1: 1,
    yref: 'y',
    y0: mean + line.multiple * sd,
    y1: mean + line.multiple * sd,
    line: { 
      color: line.color, 
      width: 1.5, 
      dash: 'dash' 
    },
  }));

  const layout: Partial<Layout> = {
    width: width < 640 ? width * 1.1 : 
           width < 1024 ? width * 0.85 : 
           Math.max(width * 0.80, 800),
    height: height < 400 ? height * 0.8 : 
            height < 600 ? height * 0.7 : 
            Math.max(height * 0.7, 500),
    plot_bgcolor: colors.surface,
    paper_bgcolor: colors.surface,
    font: { 
      family: 'Inter, system-ui, sans-serif', 
      size: width < 640 ? 8 : 14, 
      color: colors.textPrimary
    },
    title: {
      text: `${name} - Nível ${level}`,
      font: {
        size: width < 640 ? 14 : 24,
        color: colors.textPrimary
      },
      y: 0.95
    },
    showlegend: false,
    margin: {
      l: 80,
      r: 50,
      t: 80,
      b: 80,
      pad: 5
    },
    xaxis: {
      tickangle: -45,
      type: 'category',
      color: colors.textPrimary,
      tickfont: { size: width < 640 ? 8 : 12 },
      gridcolor: colors.gridLines,
      gridwidth: 1,
      showgrid: true,
      zeroline: false,
      title: {
        text: 'Data',
        font: { size: width < 640 ? 10 : 16 }
      }
    },
    yaxis: {
      title: {
        text: 'Valores',
        font: { size: width < 640 ? 10 : 16 }
      },
      range: yaxisRange,
      color: colors.textPrimary,
      tickvals: yTickValues,
      ticktext: yTickText,
      tickfont: { size: width < 640 ? 10 : 12 },
      gridcolor: colors.gridLines,
      gridwidth: 1,
      showgrid: true,
      zeroline: false
    },
    shapes: shapes,
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{ responsive: true, displayModeBar: false }}
    />
  );
};

export default ControlChart;