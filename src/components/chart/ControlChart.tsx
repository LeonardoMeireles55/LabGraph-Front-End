import React from 'react';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { Layout, Shape, ScatterData } from 'plotly.js';
import dynamic from 'next/dynamic';
import formatarDate from '../functional/FormatDate';

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

const calculateResponsiveLayout = (width: number, height: number) => {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  };

  const dimensions = {
    width: width < breakpoints.sm ? width * 0.95 :
           width < breakpoints.md ? width * 0.9 :
           width < breakpoints.lg ? width * 0.80 :
           Math.min(width * 0.8, 1200),
    height: height < 400 ? height * 0.8 :
            height < 600 ? height * 0.68 :
            Math.min(height * 0.7, 800),
    margin: {
      l: width < breakpoints.sm ? 40 : 80,
      r: width < breakpoints.sm ? 20 : 50,
      t: width < breakpoints.sm ? 60 : 80,
      b: width < breakpoints.sm ? 60 : 80,
    },
    font: {
      title: width < breakpoints.sm ? 14 : 24,
      axis: width < breakpoints.sm ? 10 : 16,
      ticks: width < breakpoints.sm ? 8 : 12,
      values: width < breakpoints.sm ? 8 : 12
    }
  };

  return dimensions;
};

const ControlChart: React.FC<ControlChartProps> = ({ listing, width, height, colors }) => {
  const data = listing;
  const dates = data.map(entry => formatarDate(entry.date).toString());
  const values = data.map(entry => entry.value);
  const { mean, sd, name, level } = data[0];

  const responsive = calculateResponsiveLayout(width, height);

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
    textposition: width < 768 ? 'top right' : 'top center',
    textfont: { 
      size: responsive.font.values, 
      color: colors.textSecondary
    },
    marker: { 
      color: colors.primary,
      size: width < 768 ? 2 : 4,
      line: {
        color: colors.border,
        width: 1
      }
    },
    line: {
      color: colors.primary,
      width: width < 768 ? 1 : 2
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
      width: width < 768 ? 1 : 2, 
      dash: 'dash' 
    },
  }));

  const layout: Partial<Layout> = {
    width: responsive.width,
    height: responsive.height,
    plot_bgcolor: colors.surface,
    paper_bgcolor: colors.surface,
    font: { 
      family: 'Inter, system-ui, sans-serif', 
      size: responsive.font.ticks, 
      color: colors.textPrimary
    },
    title: {
      text: `${name} - Nível ${level}`,
      font: {
        size: responsive.font.title,
        color: colors.textPrimary
      },
      y: 0.95
    },
    showlegend: false,
    margin: responsive.margin,
    xaxis: {
      tickangle: width < 768 ? -60 : -45,
      type: 'category',
      color: colors.textPrimary,
      tickfont: { size: responsive.font.ticks },
      gridcolor: colors.gridLines,
      gridwidth: 1,
      showgrid: true,
      zeroline: false,
      title: {
        text: 'Data',
        font: { size: responsive.font.axis }
      }
    },
    yaxis: {
      title: {
        text: 'Valores',
        font: { size: responsive.font.axis }
      },
      range: yaxisRange,
      color: colors.textPrimary,
      tickvals: yTickValues,
      ticktext: yTickText,
      tickfont: { size: responsive.font.ticks },
      gridcolor: colors.gridLines,
      gridwidth: 1,
      showgrid: true,
      zeroline: false
    },
    shapes: shapes,
  };

  return (
    <div className="bg-surface w-full flex justify-center mt-12 p-1 md:mt-0 rounded-lg shadow-md">
    <Plot
      data={plotData}
      layout={layout}
      config={{ 
        responsive: true, 
        displayModeBar: false,
        scrollZoom: false,
        modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d']
      }}
    />
    </div>
  );
};

export default ControlChart;