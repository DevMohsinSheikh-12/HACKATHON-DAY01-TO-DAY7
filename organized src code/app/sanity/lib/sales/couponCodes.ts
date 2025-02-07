export const COUPON_CODES = {
    
    CLOUD30:"CLOUD30",
  
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
