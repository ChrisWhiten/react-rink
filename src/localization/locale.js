import dummy from './dummy';
import en from './en';

const locale = 'dummy';
module.exports = {
	getLocale: function() {
		switch (locale) {
			case 'dummy':
				return dummy;
			case 'en':
				return en;
			default:
				return en;
		}
	}
}