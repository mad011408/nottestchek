import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (cachedStripe) return cachedStripe;
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  cachedStripe = new Stripe(apiKey, { apiVersion: "2025-11-17.clover" });
  return cachedStripe;
};
