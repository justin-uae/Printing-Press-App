import type { CartItem } from "../store/slices/cartSlice";

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyCartLineInput {
  merchandiseId: string;
  quantity: number;
}

/**
 * Convert cart items to Shopify line inputs
 */
export const cartItemsToLineInputs = (cartItems: CartItem[]): ShopifyCartLineInput[] => {
  return cartItems.map(item => ({
    merchandiseId: item.variant.id,
    quantity: item.quantity
  }));
};

/**
 * Create a Shopify cart and return checkout URL
 * @param lines - Array of cart line inputs
 * @param customerAccessToken - Optional customer access token for authenticated checkout
 */
export const createCart = async (
  lines: ShopifyCartLineInput[],
  customerAccessToken?: string
): Promise<string> => {
  const mutation = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    id
                    checkoutUrl
                    totalQuantity
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

  // Build the cart input
  const cartInput: any = {
    lines
  };

  // Add buyer identity if customer is logged in
  if (customerAccessToken) {
    cartInput.buyerIdentity = {
      customerAccessToken
    };
    console.log('🔐 Creating authenticated checkout for logged-in customer');
  } else {
    console.log('👤 Creating guest checkout');
  }

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: cartInput
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors[0].message);
    }

    if (result.data.cartCreate.userErrors.length > 0) {
      console.error('Cart Creation Errors:', result.data.cartCreate.userErrors);
      throw new Error(result.data.cartCreate.userErrors[0].message);
    }

    const checkoutUrl = result.data.cartCreate.cart.checkoutUrl;

    if (customerAccessToken) {
      console.log('✅ Authenticated checkout created - orders will be linked to customer account');
    } else {
      console.log('✅ Guest checkout created - customer won\'t be able to track order without account');
    }

    return checkoutUrl;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

/**
 * Alternative: Create checkout with email for guest users
 * This associates the order with an email even for guests
 */
export const createCartWithEmail = async (
  lines: ShopifyCartLineInput[],
  email?: string,
  customerAccessToken?: string
): Promise<string> => {
  const mutation = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    id
                    checkoutUrl
                    totalQuantity
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

  const cartInput: any = {
    lines
  };

  // Prioritize customer access token, then email
  if (customerAccessToken) {
    cartInput.buyerIdentity = {
      customerAccessToken
    };
    console.log('🔐 Creating authenticated checkout');
  } else if (email) {
    cartInput.buyerIdentity = {
      email
    };
    console.log('📧 Creating checkout with email:', email);
  } else {
    console.log('👤 Creating anonymous guest checkout');
  }

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: cartInput
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors[0].message);
    }

    if (result.data.cartCreate.userErrors.length > 0) {
      console.error('Cart Creation Errors:', result.data.cartCreate.userErrors);
      throw new Error(result.data.cartCreate.userErrors[0].message);
    }

    return result.data.cartCreate.cart.checkoutUrl;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};