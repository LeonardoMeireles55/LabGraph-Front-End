const NavLogo = () => (
  <div className='flex items-center gap-2 sm:gap-3'>
    <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-textSecondary shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary hover:rotate-3 sm:h-10 sm:w-10'>
      <span className='text-lg font-bold text-surface transition-all duration-300 hover:scale-110 sm:text-xl'>
        L
      </span>
    </div>
    <div className='flex flex-col'>
      <span className='text-lg font-bold text-textSecondary transition-all duration-300 hover:-translate-y-[2px] hover:text-textPrimary sm:text-xl'>
        <em>LabGraph</em>
        <span className='text-[6px] text-textSecondary md:text-[8px] align-top animate-pulse'>
          ®
        </span>
      </span>
      <span className='-mt-1 text-[8px] text-textSecondary sm:text-[8px] transition-all duration-300 hover:translate-x-1 hover:text-textPrimary'>
        Quality management easy
      </span>
    </div>
  </div>
);

export default NavLogo;
