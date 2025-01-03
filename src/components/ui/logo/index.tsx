interface LogoProps {
  className?: string;
}

const Logo = ({ className = 'h-16 w-auto' }: LogoProps) => {
  return (
    <svg viewBox='0 0 190 190' className={className} fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M100 20L160 50L160 150L100 180L40 150L40 50Z'
        stroke='currentColor'
        strokeWidth='5'
        strokeLinejoin='miter'
        className=''
      />

      <path
        d='M40 100L160 100M100 40L100 160'
        stroke='currentColor'
        strokeWidth='1'
        strokeDasharray='4 4'
        className=''
      />

      <path
        d='M100 70L130 85L130 115L100 130L70 115L70 85Z'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinejoin='miter'
        fill='none'
        className='opacity-75'
      />

      <g className='fill-current opacity-50'>
        <circle cx='100' cy='70' r='3' />
        <circle cx='130' cy='85' r='3' />
        <circle cx='130' cy='115' r='3' />
        <circle cx='100' cy='130' r='3' />
        <circle cx='70' cy='115' r='3' />
        <circle cx='70' cy='85' r='3' />
      </g>

      <g stroke='currentColor' strokeWidth='2' className='opacity-50'>
        <line x1='100' y1='70' x2='100' y2='130' />
        <line x1='70' y1='85' x2='130' y2='115' />
        <line x1='70' y1='115' x2='130' y2='85' />
      </g>
    </svg>
  );
};

export default Logo;
