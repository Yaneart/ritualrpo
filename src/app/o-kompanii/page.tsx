import Image from "next/image";
import { Metadata } from "next";
import { getStats, getTeam } from "@/lib";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Более 10 лет опыта в сфере ритуальных услуг Санкт-Петербурга. Профессиональная и деликатная помощь круглосуточно.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [team, stats] = await Promise.all([getTeam(), getStats()]);

  return (
    <>
      <section className="pt-30 pb-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
                [ О компании ]
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                Рядом в <em className="italic font-normal">трудную</em> минуту
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Компания RitualRPO работает в сфере ритуальных услуг
                Санкт-Петербурга более 10 лет. Мы понимаем, как важно получить
                профессиональную и деликатную помощь в самый сложный момент
                жизни.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                Наша миссия — взять на себя все организационные заботы, чтобы вы
                могли быть рядом с близкими. Мы работаем круглосуточно, без
                выходных и праздников.
              </p>
            </div>

            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about/office.png"
                alt="Офис компании RitualRPO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="bg-bg-alt py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <p className="font-heading text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {team.length > 0 && (
        <section className="bg-bg py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
              [ Наша команда ]
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16">
              Люди, которым <em className="italic font-normal">доверяют</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((person) => (
                <div key={person.id}>
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-1">{person.name}</h3>
                  <p className="text-text-muted">{person.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
