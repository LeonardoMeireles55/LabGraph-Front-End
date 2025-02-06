import { CarouselImage } from '@/components/about/types/about';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { TouchEvent, useCallback, useEffect, useState } from 'react';

interface CarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!isPaused) {
      intervalId = setInterval(nextSlide, autoPlayInterval);
    }
    return () => clearInterval(intervalId);
  }, [autoPlayInterval, nextSlide, isPaused]);

  return (
    <div
      role='region'
      aria-label='Image carousel'
      tabIndex={0}
      className='relative w-full h-[400px] overflow-hidden rounded-2xl group shadow-lg'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className='absolute top-0 left-0 w-full h-1 bg-transparent z-10'>
        <div
          className='h-full bg-accent/50 transition-all duration-300'
          style={{
            width: `${(currentIndex + 1) * (100 / images.length)}%`,
          }}
        />
      </div>
      <div
        className='flex h-full transition-transform duration-500 ease-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className='min-w-full h-full flex-shrink-0 relative'>
            {!imagesLoaded[index] && (
              <div className='absolute inset-0 bg-neutral-200 animate-pulse' />
            )}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-all duration-700 ${
                !imagesLoaded[index] ? 'blur-xl scale-100' : 'blur-0 scale-100'
              }`}
              priority={index === 0}
              onLoad={() => {
                setImagesLoaded((prev) => ({ ...prev, [index]: true }));
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={previousSlide}
        className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-textSecondary text-white p-2 rounded-full opacity-0 group-hover:opacity-85 transition-all duration-300 hover:scale-110'
        aria-label='Previous slide'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        aria-label='Next slide'
      >
        <ChevronRight className='h-6 w-6' />
      </button>

      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
