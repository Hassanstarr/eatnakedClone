import OrderButton from '../components/OrderButton.jsx';
import Showreel from '../components/Showreel.jsx';
import useReveal from '../hooks/useReveal.js';

const photos = ['01.webp', '02.webp', '03.png', '04.png', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.png', '13.png', '14.png'];
const descriptions = ['Fresh meals prepared in the EATnaked kitchen', 'EATnaked community event', 'The EATnaked community together', 'Supporting local baseball', 'Fresh meals shared with the community', 'Food prepared for an active lifestyle', 'Prepared meals and seasonal ingredients', 'Fresh EATnaked juices', 'Balanced prepared meals', 'A colorful Mediterranean meal', 'Freshly prepared dishes', 'EATnaked in the community', 'Enjoying an EATnaked meal', 'The EATnaked team'];
const desktopColumns = [
  [[0, 'aspect-[33.25/40.8]'], [1, 'aspect-[33.25/40.8]'], [2, 'aspect-[33.25/30.9]']],
  [[3, 'aspect-[33.25/23.7]'], [4, 'aspect-[33.25/44.1]'], [5, 'aspect-[33.25/21.1]'], [6, 'aspect-[33.25/20.6]']],
  [[7, 'aspect-[33.25/58.6]'], [8, 'aspect-[33.25/56.7]']],
  [[9, 'aspect-[33.25/37.5]'], [10, 'aspect-[33.25/37.5]'], [11, 'aspect-[33.25/37.5]']],
  [[12, 'aspect-[33.25/58.6]'], [13, 'aspect-[33.25/56.7]']],
];
const mobileColumns = [
  [[0, 'aspect-[19.2/22.4]'], [1, 'aspect-[19.2/22.4]'], [2, 'aspect-[19.2/16.9]'], [3, 'aspect-[19.2/32.1]'], [4, 'aspect-[19.2/31]'], [5, 'aspect-[19.2/32.1]']],
  [[6, 'aspect-[19.2/13]'], [7, 'aspect-[19.2/24.2]'], [8, 'aspect-[19.2/11.3]'], [9, 'aspect-[19.2/11.6]'], [10, 'aspect-[19.2/20.5]'], [11, 'aspect-[19.2/20.5]'], [12, 'aspect-[19.2/20.5]'], [13, 'aspect-[19.2/31]']],
];

function Gallery({ columns, className }) {
  return <div className={`w-full gap-[3rem] max-nav:gap-[1.6rem] ${className}`}>
    {columns.map((column, index) => <div key={index} className="flex min-w-0 flex-col gap-[3rem] max-nav:gap-[1.6rem]">
      {column.map(([photo, size]) => <div key={photo} data-reveal className={`overflow-hidden rounded-[2rem] max-nav:rounded-[1.5rem] ${size}`}><img src={`/assets/images/community/${photos[photo]}`} alt={descriptions[photo]} className="size-full object-cover transition-transform duration-700 ease-brand hover:scale-105 motion-reduce:transform-none" loading="lazy" /></div>)}
    </div>)}
  </div>;
}

export default function Community() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <section className="page-container flex flex-col items-center py-[20rem] max-nav:pt-80 max-nav:pb-40">
        <div data-reveal className="flex w-full flex-col items-center text-center">
          <h1 className="mb-[3rem] text-[10rem] leading-[1] font-medium capitalize max-nav:mb-[0.6rem] max-nav:text-[4rem]">Our community</h1>
          <p className="mb-[3.6rem] w-[56.5rem] max-w-full text-[1.8rem] leading-[2.3rem] text-white/60 max-nav:mb-[4rem] max-nav:w-[37.4rem] max-nav:text-[1.4rem]"><span className="text-white">We’re proud to nourish not just our customers, but our community—</span> supporting local causes, partnering with neighborhood organizations, and sharing good food where it’s needed most</p>
          <OrderButton to="/login" accent>Join Us</OrderButton>
        </div>
        <div data-reveal className="mt-[8.9rem] w-full"><Showreel /></div>
      </section>
      <section className="page-container flex flex-col items-center">
        <h2 data-reveal className="mb-[16.1rem] max-w-[144.6rem] text-center text-[6rem] leading-[7rem] font-medium capitalize max-nav:mb-[5.7rem] max-nav:max-w-[37.8rem] max-nav:text-[2.7rem] max-nav:leading-normal"><span className="text-accent">EatNaked</span> <img className="inline-block size-[6.4rem] align-middle max-nav:size-[2.3rem]" src="/assets/images/about-spark.svg" alt="" /> donates healthy meals to local communities, reducing food waste and promoting mindful nutrition.</h2>
        <Gallery columns={desktopColumns} className="grid grid-cols-5 max-nav:hidden" />
        <Gallery columns={mobileColumns} className="hidden grid-cols-2 max-nav:grid" />
      </section>
    </div>
  );
}
