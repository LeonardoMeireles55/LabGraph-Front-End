import React from 'react';
import dynamic from 'next/dynamic';
import { Layout, Shape, ScatterData } from 'plotly.js';
import formatarDate from '../functional/FormatDate';
import Loading from '../ui/Loading';

// Dynamic import with better typing
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center"><Loading /> </div>
});

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

// Simplified filter function
const filter = (value: number, mean: number, sd: number) => {
  if (value > mean + 3 * sd) return (mean + 3 * sd) + sd/3;
  if (value < mean - 3 * sd) return (mean - 3 * sd) - sd/3;
  return value;
};

// Enhanced responsive layout calculation
const calculateResponsiveLayout = (width: number, height: number) => {
  // More granular breakpoints
  const breakpoints = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1600
  };

  // Default dimensions
  let dimensions = {
    width: width,
    height: height,
    margin: {
      l: 80,
      r: 50,
      t: 80,
      b: 80
    },
    font: {
      title: 24,
      axis: 16,
      ticks: 12,
      values: 12
    }
  };

  // Adjust for very small screens
  if (width < breakpoints.xs) {
    dimensions = {
      width: width * 0.95,
      height: height * 0.7,
      margin: {
        l: 40,
        r: 20,
        t: 60,
        b: 60
      },
      font: {
        title: 14,
        axis: 10,
        ticks: 8,
        values: 8
      }
    };
  }
  // Small screens
  else if (width < breakpoints.sm) {
    dimensions.width *= 0.95;
    dimensions.height *= 0.8;
    dimensions.margin = {
      l: 50,
      r: 30,
      t: 70,
      b: 70
    };
    dimensions.font.title = 16;
    dimensions.font.axis = 12;
  }
  // Medium screens
  else if (width < breakpoints.md) {
    dimensions.width *= 0.9;
    dimensions.height *= 0.75;
    // dimensions.margin.l = 70;
  }
  // Large screens
  else if (width < breakpoints.lg) {
    dimensions.width *= 0.85;
    dimensions.height *= 0.75;
  }
  // Extra large screens
  else if (width < breakpoints.xl) {
    dimensions.width *= 0.95;
    dimensions.height *= 0.7;
  }
  // XXL screens
  else {
    dimensions.width = Math.min(width * 0.75, 1400);
    dimensions.height = Math.min(height * 0.7, 900);
  }

  return dimensions;
};

const ControlChart: React.FC<ControlChartProps> = ({ 
  listing, 
  width, 
  height, 
  colors 
}) => {
  const data = listing;
  const dates = data.map(entry => formatarDate(entry.date).toString());
  const values = data.map(entry => entry.value);
  const { mean, sd, name, level } = data[0];

  // Calculate responsive layout
  const responsive = calculateResponsiveLayout(width, height);

  // Prepare chart configuration
  const yaxisRange = [mean - (3 * 1.2) * sd, mean + (3 * 1.2) * sd];
  const yTickValues = [
    mean - 3 * sd, 
    mean - 2 * sd, 
    mean - sd, 
    mean, 
    mean + sd, 
    mean + 2 * sd, 
    mean + 3 * sd
  ];
  const yTickText = ['-3s ', '-2s ', '-1s ', 'Média ', '+1s ', '+2s ', '+3s '];

  const plotData: Partial<ScatterData>[] = [{
    x: dates,
    y: values.map(value => 
      value < mean - 3 * sd || value > mean + 3 * sd 
        ? filter(value, mean, sd) 
        : value
    ),
    type: 'scatter',
    mode: 'text+lines+markers',
    text: values.map(value => value.toFixed(2)),
    textposition: width < 768 ? 'top right' : 'top center',
    textfont: { 
      size: responsive.font.values, 
    },
    marker: { 
      color: colors.primary,
      size: width < 768 ? 2 : 4,
      line: {
        width: 1
      }
    },
    line: {
      color: colors.primary,
      width: width < 768 ? 1 : 2
    },
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
        font: { size: responsive.font.axis }
      }
    },
    yaxis: {
      title: {
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
      <Plot
        useResizeHandler = {true}
        style={{ width: '100%', backgroundColor: colors.surface }}
        className='flex justify-center content-center p-4 rounded-xl shadow-md'
        data={plotData}
        layout={layout}
        config={{ 
          responsive: true, 
          displayModeBar: false,
          scrollZoom: false,
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d']
        }}
      />
  );
};

export default ControlChart;