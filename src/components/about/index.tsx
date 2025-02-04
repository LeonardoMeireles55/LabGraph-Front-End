import Footer from '../shared/ui/footer';
import AboutNavbar from './components/AboutNavbar';
import AvailableFeatures from './components/AvailableFeatures';
import Carousel from './components/Carousel';
import Contacts from './components/Contacts';

const AboutUs = () => {
  const carouselImages = [
    {
      src: '/labs.jpg',
      alt: 'view result by table',
    },
    {
      src: '/lab-2.jpg',
      alt: 'view result by chart',
    },
    {
      src: '/lab-3.jpg',
      alt: 'generate reports',
    },
    {
      src: '/lab-4.jpg',
      alt: 'alerts by email',
    },
  ];

  return (
    <div className='flex flex-col bg-background min-h-screen'>
      <AboutNavbar />
      <div className='flex flex-col items-center max-w-7xl mx-auto w-full px-4 py-8 space-y-2'>
        <main className='flex flex-col w-full border-borderColor border bg-surface backdrop-blur rounded-2xl shadow-lg transition-all duration-300 p-6 space-y-8'>
          <section className='overflow-hidden shadow-xl rounded-2xl'>
            <Carousel images={carouselImages} />
          </section>

          <section className='flex flex-col items-center'>
            <p className='text-base sm:text-lg text-textSecondary leading-relaxed max-w-3xl text-center font-light'>
              Welcome to our free and open source solution for laboratory quality control.
              We&apos;re here to simplify your daily lab operations and help you maintain
              high-quality standards. Together with our growing community, we&apos;re making quality
              control accessible to labs everywhere.
            </p>
          </section>
        </main>

        <section className='w-full'>
          <AvailableFeatures />
        </section>

        <section className='w-full'>
          <Contacts />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
