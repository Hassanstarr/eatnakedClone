import OrderButton from '../components/OrderButton.jsx';
import useReveal from '../hooks/useReveal.js';

const imagePath = '/assets/images/';
const heading = 'text-[6rem] font-medium leading-[1.16] capitalize max-nav:text-[2.7rem]';

function Tag({ children }) {
  return <span className="inline-flex h-[4.1rem] w-fit items-center justify-center gap-5 rounded-full border border-white/55 px-8 text-[1.8rem] font-medium backdrop-blur-[14px] max-nav:h-[3.1rem] max-nav:gap-3 max-nav:px-6 max-nav:text-[1.2rem]"><span className="size-[0.4rem] rounded-full bg-white" />{children}</span>;
}

function FoodImage({ file, alt, className = '', eager = false }) {
  return <img src={imagePath + file} alt={alt} className={`size-full rounded-[3rem] object-cover ${className}`} loading={eager ? 'eager' : 'lazy'} />;
}

function Panel({ children, className = '' }) {
  return <div data-reveal className={`relative isolate overflow-hidden rounded-[3.5rem] border border-outline bg-white/10 p-[0.9rem] max-nav:rounded-[1.5rem] ${className}`}><div className="pointer-events-none absolute -top-12 right-12 -z-10 h-56 w-144 rounded-full bg-accent/45 blur-[60px]" /><div className="flex h-full flex-col justify-center gap-8 rounded-[2.5rem] bg-background/95 p-20 max-nav:gap-8 max-nav:p-[2.7rem]">{children}</div></div>;
}

export default function AboutUs() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <section className="page-container grid min-h-[min(100svh,108rem)] grid-cols-2 items-center gap-8 py-[13.4rem] max-nav:min-h-0 max-nav:grid-cols-1 max-nav:gap-16 max-nav:pt-52 max-nav:pb-12">
        <div data-reveal className="flex min-w-0 flex-col items-start">
          <Tag>About Us</Tag>
          <h1 className="mt-9 mb-11 text-[6rem] leading-none font-medium capitalize max-nav:mt-11 max-nav:mb-7 max-nav:text-[4rem]"><span className="max-nav:hidden">Prepared with the highest quality ingredients. Meals delivered daily directly to you.</span><span className="hidden max-nav:inline">Making fresh &amp; healthy food daily.</span></h1>
          <p className="mb-14 max-w-198 text-[1.8rem] leading-[1.28] text-white/60 max-nav:mb-15 max-nav:max-w-[37.4rem] max-nav:text-[1.4rem]"><span className="text-white">Established to </span>accommodate fitness enthusiasts, busy professionals, and everyday families. We believe in delicious, attainable, and affordable meals for all.</p>
          <OrderButton to="/our-menu" accent>See Our Menu</OrderButton>
        </div>
        <div data-reveal className="aspect-[1.12] min-w-0 max-nav:aspect-[1.6]"><FoodImage file="ab-1.avif" alt="Fresh meals being plated in the kitchen" eager /></div>
      </section>

      <section data-reveal className="page-container flex flex-col items-center pt-[10rem] pb-[19rem] text-center max-nav:pt-24 max-nav:pb-32">
        <h2 className={`${heading} mb-13 max-w-[144.6rem] max-nav:mb-9`}><span className="text-accent">Our menu</span> is designed with balance and variety in mind and making nutrition easy to <img src={imagePath + 'about-spark.svg'} alt="" className="inline-block size-[6.4rem] align-middle max-nav:size-[2.3rem]" /> fit into <span className="text-accent">your lifestyle.</span></h2>
        <p className="max-w-[77.1rem] text-[1.8rem] leading-[1.28] max-nav:text-[1.4rem] max-nav:leading-relaxed">Every meal is portioned for optimal health, delivered fresh, and ready to eat - so you can spend less time in the kitchen and more time doing what you love.</p>
      </section>

      <section className="page-container grid grid-cols-[0.94fr_1fr] gap-[3.6rem] max-nav:grid-cols-1">
        <Panel className="min-h-[51.7rem] items-center text-center max-nav:min-h-180 max-nav:text-left">
          <div className="flex justify-center gap-4 max-nav:justify-start"><Tag>Stay Healthy</Tag><img src={imagePath + 'about-sprout.svg'} alt="" className="size-[4.1rem] max-nav:size-[3.1rem]" /></div>
          <h2 className="text-[4rem] leading-[1.25] font-medium capitalize max-nav:text-[2.3rem]">With <span className="text-accent">school, work, family, etc.</span> all packed into your daily schedule, it’s easy to allow healthy eating to fall by the wayside</h2>
          <div className="hidden space-y-5 text-[1.4rem] leading-relaxed max-nav:block"><p>And have unhealthy, fast and/or convenient food creep into your diet.</p><p className="text-white/60">And when you do find healthy quick food, it’s usually at a price point that is sure to put a dent in your wallet, especially relying on this option multiple times a day or week.</p></div>
        </Panel>
        <div data-reveal className="flex flex-col gap-[3rem] max-nav:hidden">
          <div className="h-[27.3rem]"><FoodImage file="ab-2.avif" alt="Grilled chicken and seasonal vegetables" /></div>
          <div className="grid h-[21.1rem] grid-cols-[7fr_3fr] gap-[2.6rem]"><div className="h-full min-h-0 min-w-0"><FoodImage file="ab-3.avif" alt="Fresh vegetable meal with grilled protein" /></div><div className="h-full min-h-0 min-w-0"><FoodImage file="ab-4.avif" alt="A freshly prepared vegetable side" /></div></div>
        </div>
      </section>

      <section data-reveal className="page-container relative my-[16rem] flex h-[100rem] items-center justify-center max-nav:my-30 max-nav:h-[65rem]">
        <img src={imagePath + 'image-points-about.webp'} alt="" loading="lazy" className="pointer-events-none absolute h-[177.6rem] w-full object-cover max-nav:h-full" />
        <img src={imagePath + 'dinner-about-page.webp'} alt="A balanced plate of grilled chicken, grains, and salad" loading="lazy" className="absolute top-1/2 left-1/2 h-[66.9rem] w-[69.1rem] -translate-1/2 object-contain max-nav:h-[39.2rem] max-nav:w-[40.8rem] max-nav:max-w-full" />
        {[['Proteins', 'protein.png', 'top-[65%] left-[67.5%] max-nav:top-[68%] max-nav:left-[72%]'], ['Grains', 'grains.png', 'top-[22.5%] left-[60%] max-nav:left-[55%]'], ['Vegetables', 'vegetal.png', 'top-1/2 left-[32.5%] max-nav:left-[20%]']].map(([label, file, position]) => (
          <div key={label} className={`absolute z-10 -translate-1/2 ${position}`}><div className="flex h-[7.3rem] items-center gap-9 rounded-[20px] bg-white/11 pr-[3.4rem] pl-[0.8rem] backdrop-blur-[29px] motion-safe:animate-float max-nav:h-[4.2rem] max-nav:gap-5 max-nav:rounded-[1.1rem] max-nav:pr-6"><span className="grid h-[5.8rem] w-26 place-items-center rounded-[15px] bg-white/5 max-nav:h-[3.1rem] max-nav:w-14"><img src={imagePath + file} alt="" className="h-[4.2rem] w-[5.8rem] object-contain max-nav:h-[2.3rem] max-nav:w-[3.1rem]" loading="lazy" /></span><span className="text-[2rem] max-nav:text-[1.2rem]">{label}</span></div></div>
        ))}
        <h2 className={`${heading} absolute bottom-[2.5%] max-w-[119.8rem] text-center before:absolute before:-inset-8 before:-z-10 before:bg-background before:blur-[50px] max-nav:max-w-143 max-nav:text-[2.3rem]`}>We believe that eating healthy <span className="text-accent">does not have</span> to be bland, boring or restrictive.</h2>
      </section>

      <section className="page-container grid grid-cols-[1.28fr_1fr] gap-[3.6rem] pt-[15.5rem] max-nav:flex max-nav:flex-col-reverse max-nav:gap-14 max-nav:pt-0">
        <div data-reveal className="h-[45.2rem] max-nav:h-[37.3rem]"><FoodImage file="ab-5.avif" alt="Grilled steak, fresh greens, and a colorful grain salad" /></div>
        <Panel className="min-h-[45.2rem] max-nav:min-h-180">
          <div className="space-y-9 max-nav:hidden"><Tag>Always Fresh</Tag><p className="text-[1.8rem] leading-[1.28]">Our ever-evolving menu celebrates the best of each season</p><h2 className="text-[4rem] leading-[1.25] font-medium capitalize">blending culinary creativity with <span className="text-accent">fresh, vibrant ingredients.</span></h2><p className="text-[1.8rem] leading-[1.28] text-muted">From everyday dining to holidays and special occasions, every dish is crafted to elevate your table and fit seamlessly into your lifestyle.</p></div>
          <div className="hidden space-y-9 text-[1.4rem] leading-relaxed max-nav:block"><p>Nor does it have to cost a fortune.</p><h2 className="text-[2.3rem] leading-tight font-medium capitalize">With several different menu items and new items added often, <span className="text-accent">the meal combinations are endless.</span></h2><p>We pride ourselves on using the freshest ingredients to create mouth-watering, satisfying dishes.</p><p className="text-muted">Cooked the same day they are delivered to you, our meals are perfectly portioned in microwave-safe containers, so all you have to do is heat them up. Even if you have diet restrictions or special requests, we can accommodate your needs.</p></div>
        </Panel>
      </section>
    </div>
  );
}
