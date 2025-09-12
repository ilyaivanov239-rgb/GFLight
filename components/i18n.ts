// /components/i18n.ts
export type Lang = 'en' | 'ru' | 'pt';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import pt from '../locales/pt.json';

// Набор дефолтов: если чего-то нет в JSON, подставится отсюда.
const DEFAULTS = {
  ru: {
    hero: {
      // title можно задать в JSON
      subtitle:
        'Проектируем освещение для интерьеров, фасадов и ландшафтов. Грамотный свет меняет восприятие пространства - мы делаем это 15 лет.',
      button1: 'Услуги',
      button2: 'Связаться',
    },
  },
  en: {
    hero: {
      subtitle:
        "We design lighting for interiors, facades and landscapes. Well-designed light changes how a space is perceived - we’ve been doing this for 15 years.",
      button1: 'Our Services',
      button2: 'Contact Us',
    },
  },
  pt: {
    hero: {
      subtitle:
        'Projetamos iluminação para interiores, fachadas e paisagens. Uma luz bem concebida muda a perceção do espaço - fazemos isto há 15 anos.',
      button1: 'Serviços',
      button2: 'Contactar',
    },
  },
} as const;

// Простое глубокое слияние (JSON поверх дефолтов)
function deepMerge<T extends Record<string, any>>(base: T, add: Partial<T>): T {
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(add || {})) {
    const v = (add as any)[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = deepMerge(out[k] ?? {}, v);
    } else if (v !== undefined) {
      out[k] = v;
    }
  }
  return out;
}

// Экспорт словаря: JSON локали перекрывают дефолты
export const dict: Record<Lang, any> = {
  en: deepMerge(DEFAULTS.en, en as any),
  ru: deepMerge(DEFAULTS.ru, ru as any),
  pt: deepMerge(DEFAULTS.pt, pt as any),
};
