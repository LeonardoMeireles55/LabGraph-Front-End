import Footer from '../shared/ui/footer';
import AboutNavbar from './components/AboutNavbar';
import AvailableFeatures from './components/AvailableFeatures';
import Contacts from './components/Contacts';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import Overview from './components/Overview';

const AboutUs = () => {
  const carouselImages = [
    {
      src: '/reports.jpg',
      alt: 'view result by table',
    },
    {
      src: '/lab.jpg',
      alt: 'view result by chart',
    },
    {
      src: '/labbancada.jpg',
      alt: 'generate reports',
    },
    {
      src: '/lab4.jpg',
      alt: 'alerts by email',
    },
  ];

  return (
    <div id='overview' className='flex flex-col bg-background min-h-screen'>
      <AboutNavbar />
      <div className='flex flex-col items-center max-w-7xl mx-auto w-full px-4 py-8 space-y-2'>
        <section id='features' className='w-full'>
          <Overview />
          <AvailableFeatures />
        </section>
        <section className='w-full'>
          <FrequentlyAskedQuestions />
        </section>
        <section id='contact' className='w-full'>
          <Contacts />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
