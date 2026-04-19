"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/types";
import Marker from "../ui/Marker";

interface ServicesInteractiveProps {
  services: Service[];
}

const TOUCH_QUERY = "(hover: none)";

function subscribeTouch(callback: () => void) {
  const mq = window.matchMedia(TOUCH_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  return window.matchMedia(TOUCH_QUERY).matches;
}

function getTouchServerSnapshot() {
  return false;
}

export default function ServicesInteractive({
  services,
}: ServicesInteractiveProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const isTouch = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    getTouchServerSnapshot,
  );

  const handleItemClick = (i: number) => (e: React.MouseEvent) => {
    if (!isTouch) return;
    const isExpanded = active === i && hovering;
    if (isExpanded) return;
    e.preventDefault();
    setActive(i);
    setHovering(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <div className="relative h-[420px] md:h-[620px] overflow-hidden">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
                    i === active
                      ? "opacity-100 scale-100 blur-0"
                      : "opacity-0 scale-[1.06] blur-[12px]"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ))}

              <div className="absolute top-5 left-5 right-5 flex justify-between items-start label text-white/90 z-10">
                <span>[ Scene {String(active + 1).padStart(2, "0")} ]</span>
                <span className="text-white/70">{services[active]?.title}</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
                <span className="font-heading italic-heading text-base text-white/90">
                  {services[active]?.title.toLowerCase()}
                </span>
                <span className="label text-white/70 tabular-nums">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(services.length).padStart(2, "0")}
                </span>
              </div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Marker>Направления</Marker>
            {isTouch && (
              <span className="label text-text-muted/70 text-xs">
                [ тапните·ещё раз—перейти ]
              </span>
            )}
          </div>

          <div className="border-t border-border/70">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/uslugi/${service.slug}`}
                className={`block border-b border-border/70 py-8 md:py-10 transition-colors duration-500 ${
                  active === i && hovering ? "bg-bg/40" : ""
                }`}
                onMouseEnter={() => {
                  if (isTouch) return;
                  setActive(i);
                  setHovering(true);
                }}
                onMouseLeave={() => {
                  if (isTouch) return;
                  setHovering(false);
                }}
                onClick={handleItemClick(i)}
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="label text-text-muted tabular-nums shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-2xl md:text-4xl leading-[1.02] tracking-[-0.01em] text-text">
                      {service.title}
                    </h3>

                    <div
                      className={`grid transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                        active === i && hovering
                          ? "grid-rows-[1fr] opacity-100 mt-5"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-text-muted leading-relaxed max-w-xl text-base mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="label text-text-muted border border-border rounded-full px-3 py-1 max-w-full break-words text-center"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-heading text-xl shrink-0 hidden md:inline transition-all duration-500 ${
                      active === i && hovering
                        ? "text-gold translate-x-1"
                        : "text-text-muted"
                    }`}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-between md:gap-0">
            <span className="label text-text-muted">
              [ {String(services.length).padStart(2, "0")} направления ·
              прозрачная смета ]
            </span>
            <Link
              href="/uslugi"
              className="group inline-flex items-center gap-3 font-heading italic-heading text-2xl text-text hover:text-gold transition-colors duration-300"
            >
              Все услуги
              <span className="not-italic transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
