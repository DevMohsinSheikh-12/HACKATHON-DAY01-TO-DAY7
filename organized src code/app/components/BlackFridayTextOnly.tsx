import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes';
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';
import React from 'react'

async function BlackFridayTextOnly() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.CLOUD30);

    if (!sale?.isActive){
        return null;
    }

    return (
        <div className=" text-center py-10 bg-dark   flex items-center justify-center">
            <div>
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
                    {sale.title}
                </h2>
                <p className="text-xl sm:text-3xl font-semibold mb-6">
                    {sale.description}
                </p>
                <div className="text-xl sm:text-2xl font-semibold">
                    Use code <span className="text-blue-600 font-bold">CLOUD30</span> for {sale.discountAmount}% off
                </div>
            </div>
        </div>
    );
}

export default BlackFridayTextOnly;
