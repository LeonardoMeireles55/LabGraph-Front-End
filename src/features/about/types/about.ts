import { JSX } from 'react';

export interface ContactItemProps {
  id: number;
  icon: JSX.Element;
  title: string;
  content: string;
}

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export interface FeatureProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface OverviewProps {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface NavigationProps {
  id: string;
  label: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
