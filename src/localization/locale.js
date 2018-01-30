import dummy from './dummy';
import en from './en';

const locale = 'dummy';
export default function getLocale() {
	switch (locale) {
		case 'dummy':
			return dummy;
		case 'en':
			return en;
		default:
			return en;
	}
}