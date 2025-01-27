const NavLogo = () => (
  <div className='flex items-center gap-2 sm:gap-3'>
    <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-textSecondary shadow-lg sm:h-10 sm:w-10'>
      <span className='text-lg font-bold text-logo sm:text-xl'>L</span>
    </div>
    <div className='flex flex-col'>
      <span className='text-lg font-bold text-textPrimary sm:text-xl'>LabGraph</span>
      <span className='-mt-1 text-[10px] text-textSecondary sm:text-xs'>version 0.8</span>
    </div>
  </div>
);

export default NavLogo;
