// Shopify Storefront API Cart & Checkout Service
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// GraphQL mutation to create a cart
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
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

// GraphQL mutation to add lines to cart
const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
            }
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

interface CartLineInput {
    merchandiseId: string;  // Variant ID
    quantity: number;
    attributes?: Array<{
        key: string;
        value: string;
    }>;
}

interface CreateCartResponse {
    cartCreate: {
        cart: {
            id: string;
            checkoutUrl: string;
            lines: any;
            cost: {
                totalAmount: {
                    amount: string;
                    currencyCode: string;
                };
                subtotalAmount: {
                    amount: string;
                    currencyCode: string;
                };
            };
        };
        userErrors: Array<{
            field: string[];
            message: string;
        }>;
    };
}

/**
 * Make a GraphQL request to Shopify Storefront API
 */
async function storefrontFetch(query: string, variables: any = {}) {
    const response = await fetch(STOREFRONT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
        console.error('GraphQL Errors:', json.errors);
        throw new Error(json.errors[0]?.message || 'GraphQL error');
    }

    return json.data;
}

/**
 * Create a new cart and get checkout URL
 */
export async function createCart(lines: CartLineInput[]): Promise<string> {
    try {
        const data: CreateCartResponse = await storefrontFetch(CREATE_CART_MUTATION, {
            input: {
                lines,
            },
        });

        if (data.cartCreate.userErrors.length > 0) {
            const errors = data.cartCreate.userErrors
                .map(err => err.message)
                .join(', ');
            throw new Error(`Cart creation failed: ${errors}`);
        }

        return data.cartCreate.cart.checkoutUrl;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}

/**
 * Add lines to an existing cart
 */
export async function addLinesToCart(
    cartId: string,
    lines: CartLineInput[]
): Promise<any> {
    try {
        const data = await storefrontFetch(CART_LINES_ADD_MUTATION, {
            cartId,
            lines,
        });

        if (data.cartLinesAdd.userErrors.length > 0) {
            const errors = data.cartLinesAdd.userErrors
                .map((err: any) => err.message)
                .join(', ');
            throw new Error(`Failed to add items: ${errors}`);
        }

        return data.cartLinesAdd.cart;
    } catch (error) {
        console.error('Error adding items to cart:', error);
        throw error;
    }
}

/**
 * Convert cart items to Shopify cart line inputs
 */
export function cartItemsToLineInputs(cartItems: any[]): CartLineInput[] {
    return cartItems.map(item => ({
        merchandiseId: item.variantId, // Shopify variant GID
        quantity: item.quantity,
        attributes: [
            {
                key: 'Price Type',
                value: item.selectedOptions?.priceType || 'online',
            },
            {
                key: 'Turnaround',
                value: item.selectedOptions?.turnaroundType || 'normal',
            },
        ],
    }));
}

// Keep old function names for backwards compatibility
export const createCheckout = createCart;
export const cartItemsToLineItems = cartItemsToLineInputs;