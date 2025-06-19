import { useRecurly } from '@recurly/react-recurly'
import type { ApplePayInstance } from '@recurly/recurly-js'
// import type { ApplePayInstance, CheckoutPricingInstance, SubscriptionPricingState } from '@recurly/recurly-js'
import * as React from 'react'

export const ApplePayButton: React.FC = () => {
    const recurly = useRecurly()
    // const [subscriptionPricingState, setSubscriptionPricingState] = React.useState<SubscriptionPricingState>()
    // const [checkoutPricing, setCheckoutPricing] = React.useState<CheckoutPricingInstance>()
    const [applePay, setApplePay] = React.useState<ApplePayInstance>()

    React.useEffect(() => {
        if (!recurly)
            return
        
        const _checkoutPricing = recurly.Pricing.Checkout()
        _checkoutPricing
            .adjustment({
                id: '0',
                itemCode: 'n-aro5-001',
                quantity: 1
            })
            .subscription(recurly.Pricing.Subscription()
                .plan('annual-99')
                .addon('n-aro5-001', { quantity: 1 })
                .done()
            )
            .done(() => {
                console.log("Checkout Pricing: ", _checkoutPricing)
                // setCheckoutPricing(_checkoutPricing)
            })
           
        // if (!checkoutPricing)
        //     return

        const _applePay = recurly.ApplePay({
            country: 'US',
            currency: 'USD',
            pricing: _checkoutPricing,
            label: 'Reclaimwell by Aro',
        })

        _applePay.ready(() => {
            setApplePay(_applePay)
        })
    }, [recurly])

    const handleApplePay = () => {
        if (!recurly || !applePay)
            return

        try {
            applePay.begin()
        } catch (err) {
            console.log(err)
        }
    }

    return <button onClick={handleApplePay} className='bg-slate-800 text-white w-24 h-12 rounded-lg hover:bg-slate-500'>
        Apple Pay
    </button>
}