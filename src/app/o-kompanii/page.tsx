import Image from "next/image";
import { Metadata } from "next";
import { getStats, getTeam } from "@/lib";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Marker from "@/components/ui/Marker";

export const metadata: Metadata = {
  title: "О компании",
  description: "Более 10 лет опыта в сфере ритуальных услуг Санкт-Петербурга.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [team, stats] = await Promise.all([getTeam(), getStats()]);

  return (
    <>
      <section className="bg-bg">
        <SectionAnchor
          num="01 / О компании"
          label="— знакомство"
          tagline={
            <>
              <span>Рядом в</span>{" "}
              <span className="italic-heading text-text-muted">трудную</span>{" "}
              <span>минуту.</span>
            </>
          }
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-28 md:pb-36">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12 items-center">
              <div className="md:col-span-7">
                <div className="mb-6">
                  <Marker>О нас</Marker>
                </div>

                <p className="text-text-muted text-lg leading-relaxed mb-6 max-w-[520px]">
                  Компания RitualRPO работает в сфере ритуальных услуг
                  Санкт-Петербурга более 10 лет. Мы понимаем, как важно получить
                  профессиональную и деликатную помощь в самый сложный момент
                  жизни.
                </p>

                <p className="text-text-muted text-lg leading-relaxed max-w-[520px]">
                  Наша миссия — взять на себя все организационные заботы, чтобы
                  вы могли быть рядом с близкими.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden border border-border">
                  <Image
                    src="/images/about/office.png"
                    alt="Офис RitualRPO"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="bg-bg border-t border-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <AnimateOnScroll>
              <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="border-b border-r border-border px-8 py-10 md:px-12 md:py-14"
                  >
                    <p className="font-heading text-[clamp(44px,5.5vw,80px)] leading-none tracking-[-0.02em] text-text mb-3">
                      {stat.value}
                    </p>
                    <p className="label text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="bg-bg border-t border-border">
          <SectionAnchor
            num="02 / Команда"
            label="— профессионалы"
            tagline={
              <>
                Люди, которым{" "}
                <span className="italic-heading text-text-muted">доверяют</span>
                .
              </>
            }
          />

          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-28 md:pb-36">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {team.map((person) => (
                <AnimateOnScroll key={person.id}>
                  <div className="group">
                    <div className="relative aspect-[4/5] overflow-hidden border border-border mb-4 bg-[#111]">
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="font-heading text-xl mb-1">{person.name}</h3>

                    <p className="text-sm text-text-muted">{person.position}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
