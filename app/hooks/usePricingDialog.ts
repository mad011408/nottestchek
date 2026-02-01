import { useEffect, useState } from "react";
import type { SubscriptionTier } from "@/types";

export const usePricingDialog = (subscription?: any) => {
  return {
    showPricing: false,
    handleClosePricing: () => {},
    openPricing: () => {},
  };
};

export const redirectToPricing = () => {};
