"use client";

import { useState } from "react";
import { serviceOptions, requiredGroups, extraGroups } from "@/data/calculator";
import RadioItem from "@/components/ui/RadioItem";
import CheckboxItem from "@/components/ui/CheckboxItem";

interface CalculatorState {
  step: number;
  serviceType: string | null;
  required: Record<string, string>;
  extras: string[];
}

export default function CalculatorPage() {
  const [state, setState] = useState<CalculatorState>({
    step: 1,
    serviceType: null,
    required: {},
    extras: [],
  });

  const selectService = (id: string) => {
    setState((prev) => ({ ...prev, serviceType: id }));
  };

  const selectRequired = (groupId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      required: { ...prev.required, [groupId]: optionId },
    }));
  };

  const toggleExtra = (id: string) => {
    setState((prev) => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter((item) => item !== id)
        : [...prev.extras, id],
    }));
  };

  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState((prev) => ({ ...prev, step: prev.step - 1 }));

  const selectedService = serviceOptions.find(
    (s) => s.id === state.serviceType,
  );
  const basePrice = selectedService?.basePrice ?? 0;

  const requiredPrice = Object.entries(state.required).reduce(
    (sum, [groupId, optionId]) => {
      const group = requiredGroups.find((g) => g.id === groupId);
      const option = group?.options.find((o) => o.id === optionId);
      return sum + (option?.price ?? 0);
    },
    0,
  );

  const allExtraOptions = extraGroups.flatMap((g) => g.options);

  const extrasPrice = state.extras.reduce((sum, id) => {
    const option = allExtraOptions.find((o) => o.id === id);
    return sum + (option?.price ?? 0);
  }, 0);

  const totalPrice = basePrice + requiredPrice + extrasPrice;

  const formatPrice = (price: number) => price.toLocaleString("ru-RU");

  const allRequiredSelected = requiredGroups.every(
    (group) => state.required[group.id],
  );

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div>
            <h3 className="font-heading text-2xl md:text-3xl mb-2">
              Тип услуги
            </h3>
            <p className="text-text-muted mb-8">Выберите основную услугу</p>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  onClick={() => selectService(service.id)}
                  className={`p-6 rounded-2xl border text-left transition-all cursor-pointer
                    ${
                      state.serviceType === service.id
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-white hover:border-accent/40"
                    }`}
                >
                  <div className="font-heading text-xl mb-2">
                    {service.title}
                  </div>
                  <p
                    className={`text-sm mb-4 ${
                      state.serviceType === service.id
                        ? "text-white/70"
                        : "text-text-muted"
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="text-lg font-semibold">
                    от {formatPrice(service.basePrice)} ₽
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="font-heading text-2xl md:text-3xl mb-2">
              Комплектация
            </h3>
            <p className="text-text-muted mb-8">
              Выберите по одному варианту из каждой категории
            </p>
            <div className="space-y-8">
              {requiredGroups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-medium text-sm uppercase tracking-widest text-text-muted mb-3">
                    {group.title}
                  </h4>
                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <RadioItem
                        key={option.id}
                        item={option}
                        selected={state.required[group.id] === option.id}
                        onSelect={() => selectRequired(group.id, option.id)}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="font-heading text-2xl md:text-3xl mb-2">
              Дополнительные услуги
            </h3>
            <p className="text-text-muted mb-8">
              Выберите при необходимости — все пункты необязательны
            </p>
            <div className="space-y-8">
              {extraGroups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-medium text-sm uppercase tracking-widest text-text-muted mb-3">
                    {group.title}
                  </h4>
                  <div className="space-y-2">
                    {group.options.map((item) => (
                      <CheckboxItem
                        key={item.id}
                        item={item}
                        checked={state.extras.includes(item.id)}
                        onToggle={toggleExtra}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl mb-3">
              Спасибо за заявку!
            </h3>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              Мы получили ваш запрос на сумму {formatPrice(totalPrice)} ₽. Наш
              специалист свяжется с вами в ближайшее время для уточнения
              деталей.
            </p>
            <button
              onClick={() =>
                setState({
                  step: 1,
                  serviceType: null,
                  required: {},
                  extras: [],
                })
              }
              className="px-8 py-3 border border-border rounded-xl text-text-muted hover:text-text hover:border-accent/40 transition-colors cursor-pointer"
            >
              Рассчитать заново
            </button>
          </div>
        );
    }
  };

  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
            Рассчитайте стоимость
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">
            Калькулятор <em>услуг</em>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
            ${state.step >= num ? "bg-accent text-white" : "bg-bg-alt text-text-muted"}`}
              >
                {num}
              </div>
              {num < 4 && (
                <div
                  className={`w-12 h-px transition-colors ${
                    state.step > num ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">{renderStep()}</div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-2xl p-6 lg:sticky lg:top-28">
              <h4 className="font-heading text-xl mb-4">Ваш выбор</h4>

              {selectedService ? (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>{selectedService.title}</span>
                    <span className="font-medium">
                      {formatPrice(basePrice)} ₽
                    </span>
                  </div>

                  {Object.entries(state.required).map(([groupId, optionId]) => {
                    const group = requiredGroups.find((g) => g.id === groupId);
                    const option = group?.options.find(
                      (o) => o.id === optionId,
                    );
                    if (!option) return null;
                    return (
                      <div
                        key={optionId}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-text-muted">{option.title}</span>
                        <span>{formatPrice(option.price)} ₽</span>
                      </div>
                    );
                  })}

                  {state.extras.map((id) => {
                    const option = allExtraOptions.find((o) => o.id === id);
                    if (!option) return null;
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-text-muted">{option.title}</span>
                        <span>{formatPrice(option.price)} ₽</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-muted text-sm mb-6">
                  Выберите тип услуги
                </p>
              )}

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-text-muted">Итого</span>
                  <span className="font-heading text-3xl">
                    {formatPrice(totalPrice)} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {state.step < 4 && (
          <div className="flex justify-between mt-10 max-w-4xl">
            {state.step > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-border rounded-xl text-text-muted hover:text-text hover:border-accent/40 transition-colors cursor-pointer"
              >
                Назад
              </button>
            ) : (
              <div />
            )}

            {state.step < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (state.step === 1 && !state.serviceType) ||
                  (state.step === 2 && !allRequiredSelected)
                }
                className="px-8 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Далее
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Отправить заявку
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
