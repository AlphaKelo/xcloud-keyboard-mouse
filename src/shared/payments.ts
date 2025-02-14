import ExtPay from 'extpay';
import { Payment } from './types';

export function getExtPay() {
  return ExtPay('keyboard-and-mouse-for-xbox-xcloud');
}

export const notPaidPayment: Payment = {
  paid: false,
  paidAt: null,
  installedAt: new Date().getTime(),
  trialStartedAt: null,
};
