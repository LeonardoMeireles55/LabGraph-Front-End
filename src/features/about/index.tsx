import Footer from '../shared/ui/footer';
import AboutNavbar from './components/AboutNavbar';
import AvailableFeatures from './components/AvailableFeatures';
import Carousel from './components/Carousel';
import Contacts from './components/Contacts';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import Overview from './components/Overview';

const AboutUs = () => {
  const carouselImages = [
    { id: 1, src: '/reports.jpg', alt: 'view result by table' },
    { id: 2, src: '/lab.jpg', alt: 'view result by chart' },
    { id: 3, src: '/labbancada.jpg', alt: 'generate reports' },
    { id: 4, src: '/lab4.jpg', alt: 'alerts by email' },
  ];

  return (
    <div id='overview' className='flex min-h-screen flex-col bg-background'>
      <AboutNavbar />
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center space-y-2 px-4 py-8'>
        <section id='carousel' className='w-full'>
          <Carousel images={carouselImages} />
        </section>
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
