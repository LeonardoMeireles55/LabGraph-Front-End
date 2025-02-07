import { JSX } from 'react';

export interface ContactItemProps {
  icon: React.ComponentType;
  title: string;
  content: string;
}

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface OverviewProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface NavigationProps {
  id: string;
  label: string;
}
