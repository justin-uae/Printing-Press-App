// ============================================
// SHOPIFY STOREFRONT API CONFIGURATION
// ============================================

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

// ============================================
// TYPESCRIPT INTERFACES
// ============================================

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  createdAt: string;
}

export interface OrderItem {
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  date: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currencyCode: string;
  status: string;
  items: OrderItem[];
}

export interface Customer {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// ============================================
// FETCH FUNCTION
// ============================================

export const shopifyFetch = async <T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> => {
  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: ShopifyGraphQLResponse<T> = await response.json();

    if (json.errors) {
      throw new Error(json.errors.map(e => e.message).join(', '));
    }

    if (!json.data) {
      throw new Error('No data returned from Shopify');
    }

    return json.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
};

// ============================================
// GRAPHQL FRAGMENTS
// ============================================

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    productType
    vendor
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          sku
          weight
          weightUnit
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "specifications" }
      { namespace: "custom", key: "pricing_tiers" }
      { namespace: "custom", key: "turnaround" }
      { namespace: "custom", key: "badge" }
      { namespace: "custom", key: "product_code" }
      { namespace: "custom", key: "discount_percentage" }
      { namespace: "custom", key: "features" }
      { namespace: "custom", key: "min_order_quantity" }
      { namespace: "custom", key: "paper_weights" }
      { namespace: "custom", key: "finishing_options" }
      { namespace: "custom", key: "price_increase_percentage" }
    ]) {
      namespace
      key
      value
      type
    }
  }
`;

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    handle
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
  }
`;

// ============================================
// PRODUCT GRAPHQL QUERIES
// ============================================

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        cursor
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_COLLECTIONS_QUERY = `
  ${COLLECTION_FRAGMENT}
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...CollectionFragment
          products(first: 100) {
            edges {
              node {
                id
                handle
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  query GetCollectionByHandle($handle: String!, $productsFirst: Int!) {
    collectionByHandle(handle: $handle) {
      ...CollectionFragment
      products(first: $productsFirst) {
        edges {
          cursor
          node {
            ...ProductFragment
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetFeaturedProducts($first: Int!) {
    collection(handle: "featured-products") {
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

// ============================================
// CUSTOMER AUTHENTICATION QUERIES & MUTATIONS
// ============================================

export const CUSTOMER_LOGIN_MUTATION = `
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
        field
        code
      }
    }
  }
`;

export const CUSTOMER_REGISTER_MUTATION = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        message
        field
        code
      }
    }
  }
`;

export const GET_CUSTOMER_QUERY = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      displayName
      createdAt
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
      }
    }
  }
`;

export const CUSTOMER_LOGOUT_MUTATION = `
  mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_RESET_PASSWORD_MUTATION = `
  mutation CustomerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ============================================
// CUSTOMER ORDERS (BOOKINGS) QUERIES
// ============================================

export const GET_CUSTOMER_ORDERS_QUERY = `
  query GetCustomerOrders($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            name
            processedAt
            fulfillmentStatus
            financialStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            totalTaxV2 {
              amount
              currencyCode
            }
            totalShippingPriceV2 {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              address2
              city
              province
              country
              zip
            }
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      handle
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const GET_ORDER_BY_ID_QUERY = `
  query GetOrderById($id: ID!) {
    node(id: $id) {
      ... on Order {
        id
        orderNumber
        name
        processedAt
        fulfillmentStatus
        financialStatus
        totalPriceV2 {
          amount
          currencyCode
        }
        subtotalPriceV2 {
          amount
          currencyCode
        }
        totalTaxV2 {
          amount
          currencyCode
        }
        totalShippingPriceV2 {
          amount
          currencyCode
        }
        shippingAddress {
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
              variant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                product {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ============================================
// API FUNCTIONS - AUTHENTICATION
// ============================================

export const customerLogin = async (email: string, password: string): Promise<CustomerAccessToken> => {
  const result = await shopifyFetch<any>(CUSTOMER_LOGIN_MUTATION, {
    input: {
      email,
      password
    }
  });

  if (result.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(result.customerAccessTokenCreate.customerUserErrors[0].message);
  }

  return result.customerAccessTokenCreate.customerAccessToken;
};

export const customerRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<Customer> => {
  const result = await shopifyFetch<any>(CUSTOMER_REGISTER_MUTATION, {
    input: {
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing: false
    }
  });

  if (result.customerCreate.customerUserErrors.length > 0) {
    throw new Error(result.customerCreate.customerUserErrors[0].message);
  }

  return result.customerCreate.customer;
};

export const customerLogout = async (customerAccessToken: string): Promise<void> => {
  await shopifyFetch<any>(CUSTOMER_LOGOUT_MUTATION, {
    customerAccessToken
  });
};

export const customerResetPassword = async (email: string): Promise<void> => {
  const result = await shopifyFetch<any>(CUSTOMER_RESET_PASSWORD_MUTATION, {
    email
  });

  if (result.customerRecover.customerUserErrors.length > 0) {
    throw new Error(result.customerRecover.customerUserErrors[0].message);
  }
};

// ============================================
// API FUNCTIONS - CUSTOMER DATA
// ============================================

export const getCustomerData = async (customerAccessToken: string): Promise<CustomerData> => {
  const result = await shopifyFetch<any>(GET_CUSTOMER_QUERY, {
    customerAccessToken
  });

  if (!result.customer) {
    throw new Error('Customer not found or invalid access token');
  }

  return result.customer;
};

// ============================================
// API FUNCTIONS - ORDERS (BOOKINGS)
// ============================================

export const getCustomerOrders = async (
  customerAccessToken: string,
  first: number = 20
): Promise<Order[]> => {
  const result = await shopifyFetch<any>(GET_CUSTOMER_ORDERS_QUERY, {
    customerAccessToken,
    first
  });

  console.log("result",result);
  
  if (!result.customer) {
    throw new Error('Customer not found or invalid access token');
  }

  return result.customer.orders.edges.map((edge: any) => ({
    id: edge.node.id,
    orderNumber: edge.node.orderNumber,
    date: edge.node.processedAt,
    subtotal: parseFloat(edge.node.subtotalPriceV2?.amount || edge.node.totalPriceV2.amount),
    tax: parseFloat(edge.node.totalTaxV2?.amount || '0'),
    shipping: parseFloat(edge.node.totalShippingPriceV2?.amount || '0'),
    total: parseFloat(edge.node.totalPriceV2.amount),
    currencyCode: edge.node.totalPriceV2.currencyCode,
    status: edge.node.fulfillmentStatus || edge.node.financialStatus,
    items: edge.node.lineItems.edges.map((item: any) => ({
      title: item.node.title,
      quantity: item.node.quantity,
      price: parseFloat(item.node.variant.priceV2.amount),
      image: item.node.variant.image?.url
    }))
  }));
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const result = await shopifyFetch<any>(GET_ORDER_BY_ID_QUERY, {
    id: orderId
  });

  if (!result.node) {
    return null;
  }

  const order = result.node;
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    date: order.processedAt,
    subtotal: parseFloat(order.subtotalPriceV2?.amount || order.totalPriceV2.amount),
    tax: parseFloat(order.totalTaxV2?.amount || '0'),
    shipping: parseFloat(order.totalShippingPriceV2?.amount || '0'),
    total: parseFloat(order.totalPriceV2.amount),
    currencyCode: order.totalPriceV2.currencyCode,
    status: order.fulfillmentStatus || order.financialStatus,
    items: order.lineItems.edges.map((item: any) => ({
      title: item.node.title,
      quantity: item.node.quantity,
      price: parseFloat(item.node.variant.priceV2.amount),
      image: item.node.variant.image?.url
    }))
  };
};