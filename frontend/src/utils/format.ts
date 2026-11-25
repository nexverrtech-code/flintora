import { company } from '@/data/company';

export const formatMoney = (n: number) =>
  new Intl.NumberFormat(company.locale, {
    style: 'currency',
    currency: company.currency,
    maximumFractionDigits: 0,
  }).format(n);

export const pad2 = (n: number) => String(n).padStart(2, '0');
