export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-bg-dark"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* <Image
          src="/images/hero.jpg"
          alt="Ритуальные услуги"
          fill
          priority
          className="absolute inset-0 object-cover"
        /> */}

      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/70 via-bg-dark/60 to-bg-dark/80" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <p className="text-sm uppercase tracking-widest text-white/60 mb-6">
          Круглосуточная помощь в трудную минуту
        </p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          Достойное <em className="italic font-normal">прощание</em>
          <br />с близкими
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
          Мы берём на себя все заботы по организации похорон, чтобы вы могли
          сосредоточиться на главном.
        </p>

        <a
          href="tel:+78126605151"
          className="inline-block bg-white hover:bg-white/90 text-bg-dark font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
        >
          Позвонить — +7 (812) 660-51-51
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-white/60">
          Узнать больше
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white/60"
        >
          <path
            d="M10 3v14m0 0l-5-5m5 5l5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
