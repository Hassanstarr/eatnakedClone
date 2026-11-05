export default function LegalPage({ title, children }) {
  return (
    <section className="px-[11.2rem] pt-6 max-nav:-mt-20 max-nav:px-0 max-nav:pt-0">
      <h1 className="py-20 text-center text-[10rem] leading-none font-semibold uppercase max-nav:py-0 max-nav:text-[3rem]">{title}</h1>
      <article className="flex flex-col gap-12 py-20 text-[1.8rem] leading-[1.2] font-medium capitalize [&>h2]:text-[3rem] [&>h2]:leading-none [&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div_h2]:text-[2rem] [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-8 [&_a]:text-accent [&_a:hover]:underline max-nav:gap-10 max-nav:py-16 max-nav:text-[1.5rem] max-nav:[&>h2]:text-[2rem] max-nav:[&_div_h2]:text-[1.5rem]">{children}</article>
    </section>
  );
}
