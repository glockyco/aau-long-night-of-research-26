import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string): param is 'de' | 'en' => {
  return param === 'de' || param === 'en';
};
