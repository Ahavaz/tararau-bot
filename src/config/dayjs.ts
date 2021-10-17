import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(updateLocale);
dayjs.extend(calendar);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(localeData);

dayjs.locale('pt-br');

dayjs.updateLocale('pt-br', {
  calendar: {
    lastDay: '[Ontem]',
    sameDay: '[Hoje às] H[h]mm',
    nextDay: '[Amanhã às] H[h]mm',
    lastWeek: 'dddd [passada(o)]',
    nextWeek: 'dddd [às] H[h]mm',
    sameElse: '[em] D [de] MMMM [de] YYYY [(]dddd[)] [às] H[h]mm',
  },
});

dayjs.tz.setDefault('America/Sao_Paulo');

export default dayjs;
