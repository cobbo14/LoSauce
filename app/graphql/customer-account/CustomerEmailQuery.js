// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_EMAIL_QUERY = `#graphql
  query CustomerEmailForDiscounts {
    customer {
      emailAddress {
        emailAddress
      }
    }
  }
`;
