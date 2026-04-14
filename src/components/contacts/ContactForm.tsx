"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <section className="pt-40 pb-12 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Контакты ]
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
            Свяжитесь с <em className="italic font-normal">нами</em>
          </h1>
        </div>
      </section>

      <section className="bg-bg pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="mb-12">
                <h2 className="text-sm uppercase tracking-widest text-text-muted mb-4">
                  Телефон
                </h2>
                <a
                  href="tel:+78126605151"
                  className="font-heading text-3xl md:text-4xl font-bold hover:text-accent transition-colors duration-300"
                >
                  +7 (812) 660-51-51
                </a>
                <p className="text-text-muted mt-2">
                  Круглосуточно, без выходных
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-sm uppercase tracking-widest text-text-muted mb-4">
                  Email
                </h2>
                <a
                  href="mailto:info@ritualrpo.ru"
                  className="text-xl hover:text-accent transition-colors duration-300"
                >
                  info@ritualrpo.ru
                </a>
              </div>

              <div className="mb-12">
                <h2 className="text-sm uppercase tracking-widest text-text-muted mb-4">
                  Адрес
                </h2>
                <p className="text-xl">г. Санкт-Петербург</p>
                <p className="text-text-muted mt-1">ул. Примерная, д. 1</p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-widest text-text-muted mb-4">
                  График работы
                </h2>
                <p className="text-xl">Круглосуточно</p>
                <p className="text-text-muted mt-1">
                  Выезд специалиста в течение часа
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-widest text-text-muted mb-8">
                Обратная связь
              </h2>

              {isSubmitted ? (
                <div className="border border-border rounded-2xl p-12 text-center">
                  <p className="font-heading text-2xl font-bold mb-4">
                    Спасибо за обращение
                  </p>
                  <p className="text-text-muted">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-text-muted mb-2"
                    >
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-3 text-lg outline-none focus:border-accent transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-text-muted mb-2"
                    >
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-3 text-lg outline-none focus:border-accent transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-text-muted mb-2"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-3 text-lg outline-none focus:border-accent transition-colors duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 mt-4 cursor-pointer md:w-fit"
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
