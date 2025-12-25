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
// GRAPHQL QUERIES
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