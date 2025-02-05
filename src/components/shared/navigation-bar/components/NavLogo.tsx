const NavLogo = () => (
  <div className='flex items-center gap-2 sm:gap-3'>
    <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-textSecondary shadow-lg sm:h-10 sm:w-10'>
      <span className='text-lg font-bold text-logo sm:text-xl'>L</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-lg font-bold text-textPrimary sm:text-xl'>
        <em>LabGraph</em>
        <span className='text-[6px] md:text-[8px] align-top'>®</span>
      </span>
      <span className='-mt-1 text-[8px] text-textSecondary sm:text-[8px]'>Quality System</span>
    </div>{' '}
  </div>
);

export default NavLogo;
