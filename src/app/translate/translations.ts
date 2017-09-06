// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
export const translationDictionary = {
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_ES_NAME]: LANG_ES_TRANS,
	[LANG_FR_NAME]: LANG_FR_TRANS,
};
