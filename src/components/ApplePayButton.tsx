import { useRecurly } from '@recurly/react-recurly'
import type { CheckoutPricingInstance } from '@recurly/recurly-js'
import * as React from 'react'

export const ApplePayButton: React.FC = () => {
    const recurly = useRecurly()
    const [pricing, setPricing] = React.useState<CheckoutPricingInstance>()

    React.useEffect(() => {
        if (!recurly)
            return

        const _pricing = recurly.Pricing.Subscription()
        _pricing
            .plan('annual-99')
            .addon('n-aro5-001', { quantity: 1 })
            .currency('USD')
            .done(() => console.log('Pricing: ', _pricing))
        
            setPricing(pricing)
    }, [recurly, pricing])

    const handleApplePay = () => {
        if (!recurly)
            return

        try {
            const applePay = recurly.ApplePay({
                country: 'US',
                currency: 'USD',
                pricing: pricing,
                label: 'Reclaimwell by Aro',
            })

            applePay.ready(() => {
                applePay.begin()
            })

        } catch (err) {
            console.log(err)
        }
    }

    return <button onClick={handleApplePay} className='bg-slate-800 text-white w-24 h-12 rounded-lg hover:bg-slate-500'>
        Apple Pay
    </button>
}