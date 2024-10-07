"use client"

import { ExclamationCircle } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { RequestQuoteConfirmation } from "@modules/quotes/components/request-quote-confirmation"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions?: HttpTypes.StorePromotion[]
  }
  customer: HttpTypes.StoreCustomer | null
  spendLimitExceeded: boolean
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1) {
    return "shipping-address"
  } else if (!cart.billing_address?.address_1) {
    return "billing-address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else if (
    !cart.payment_collection?.payment_sessions?.find(
      (paymentSession: any) => paymentSession.status === "pending"
    )
  ) {
    return "payment"
  } else if (!cart.email) {
    return "contact-information"
  } else {
    return null
  }
}

const Summary = ({ cart, customer, spendLimitExceeded }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  const checkoutButtonLink = customer ? "/checkout?step=" + step : "/account"

  return (
    <Container className="flex flex-col gap-y-3">
      {/* <DiscountCode cart={cart} /> */}
      {/* <Divider /> */}
      <CartTotals totals={cart} />
      {spendLimitExceeded && (
        <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md shadow-borders-base">
          <ExclamationCircle className="text-orange-500 w-fit overflow-visible" />
          <p className="text-neutral-950 text-xs">
            This order exceeds your spending limit.
            <br />
            Please contact your manager for approval.
          </p>
        </div>
      )}
      <LocalizedClientLink
        href={checkoutButtonLink}
        data-testid="checkout-button"
      >
        <Button
          className="w-full h-10 rounded-full shadow-none"
          disabled={spendLimitExceeded}
        >
          {customer
            ? spendLimitExceeded
              ? "Spending Limit Exceeded"
              : "Checkout"
            : "Sign in to Checkout"}
        </Button>
      </LocalizedClientLink>
      <RequestQuoteConfirmation>
        <Button
          className="w-full h-10 rounded-full shadow-borders-base"
          variant="secondary"
        >
          Request Quote
        </Button>
      </RequestQuoteConfirmation>
      <Button
        className="w-full h-10 rounded-full shadow-borders-base"
        variant="secondary"
      >
        Export Cart (.csv)
      </Button>
      <Button
        className="w-full h-10 rounded-full shadow-borders-base"
        variant="secondary"
      >
        Empty Cart
      </Button>
    </Container>
  )
}

export default Summary
