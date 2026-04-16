import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 bg-bg min-h-[70vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
          [ Ошибка 404 ]
        </p>
        <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          Страница <em className="italic font-normal">не найдена</em>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12">
          К сожалению, запрашиваемая страница не существует. Возможно, она была
          удалена или вы перешли по неверной ссылке.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
          >
            На главную
          </Link>
          <Link
            href="/kontakty"
            className="border border-border hover:border-accent text-text-muted hover:text-accent px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </section>
  );
}
