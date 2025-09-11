export type Lang = 'en' | 'ru' | 'pt';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import pt from '../locales/pt.json';

export const dict: Record<Lang, any> = { en, ru, pt };
