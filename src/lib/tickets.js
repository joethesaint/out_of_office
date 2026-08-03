export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const TICKET_TIERS = [
  {
    id: 'explorer',
    name: 'Explorer Pass',
    amountKobo: 1500000,
    label: '₦15,000',
    description:
      "Perfect for those who don't mind sharing the camping experience. Includes: 🌅 Sunrise Yoga Session · 🎨 Open Canvas Painting Experience · 🏐 Games & Group Activities · 🔥 Bonfire Experience · ⛺ Shared Tent Accommodation · 🥤 Light Refreshments",
  },
  {
    id: 'retreat',
    name: 'Retreat Pass',
    amountKobo: 2000000,
    label: '₦20,000',
    description:
      'Enjoy the full experience with the added comfort and privacy of your own tent. Includes: 🌅 Sunrise Yoga Session · 🎨 Open Canvas Painting Experience · 🧺 Beach Picnic · 🏐 Games & Group Activities · 🔥 Bonfire Experience · ⛺ Private Tent Accommodation · 🥤 Light Refreshments',
  },
];

export function payForTicket(tier, email, { onSuccess, onCancel, onError }) {
  if (!PAYSTACK_PUBLIC_KEY) {
    onError('Ticketing is not configured yet — check back shortly.');
    return;
  }
  if (typeof PaystackPop === 'undefined') {
    onError('Payment could not start — please check your connection and try again.');
    return;
  }

  const popup = new PaystackPop();
  popup.newTransaction({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: tier.amountKobo,
    currency: 'NGN',
    ref: 'OOO_' + tier.id + '_' + Math.floor(Math.random() * 1000000000 + 1),
    onSuccess,
    onCancel,
  });
}
