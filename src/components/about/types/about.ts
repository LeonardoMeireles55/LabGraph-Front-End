import { JSX } from 'react';

export interface ContactItemProps {
  icon: React.ComponentType;
  title: string;
  content: string;
}

export interface CarouselImage {
  src: string;
  alt: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface NavigationItem {
  id: string;
  label: string;
}
