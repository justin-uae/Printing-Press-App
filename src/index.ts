// ============================================
// SHOPIFY GRAPHQL RESPONSE TYPES
// ============================================

export interface ShopifyMoney {
    amount: string;
    currencyCode: string;
}

export interface ShopifyImage {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
}

export interface ShopifySelectedOption {
    name: string;
    value: string;
}

export interface ShopifyVariant {
    id: string;
    title: string;
    availableForSale: boolean;
    quantityAvailable: number;
    priceV2: ShopifyMoney;
    compareAtPriceV2: ShopifyMoney | null;
    selectedOptions: ShopifySelectedOption[];
    sku: string | null;
    weight: number | null;
    weightUnit: string | null;
}

export interface ShopifyMetafield {
    namespace: string;
    key: string;
    value: string;
    type: string;
}

export interface ShopifyProduct {
    id: string;
    handle: string;
    title: string;
    description: string;
    productType: string;
    vendor: string;
    tags: string[];
    availableForSale: boolean;
    priceRange: {
        minVariantPrice: ShopifyMoney;
        maxVariantPrice: ShopifyMoney;
    };
    compareAtPriceRange: {
        minVariantPrice: ShopifyMoney;
        maxVariantPrice: ShopifyMoney;
    } | null;
    images: {
        edges: Array<{
            node: ShopifyImage;
        }>;
    };
    variants: {
        edges: Array<{
            node: ShopifyVariant;
        }>;
    };
    metafields: ShopifyMetafield[];
}

export interface ShopifyCollection {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ShopifyImage | null;
    products: {
        edges: Array<{
            node: ShopifyProduct;
            cursor: string;
        }>;
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
}

// ============================================
// APPLICATION TYPES (Transformed from Shopify)
// ============================================

export interface PricingTier {
    quantity: number;
    price: number;
    savings?: number;
    perPiece?: number;
    type?: string;
    sides?: number;
    finish?: string;
    size?: string;
    material?: string;
    colors?: number;
    base?: string;
}

export interface Specifications {
    material: string;
    colors: number;
    sides?: number | string;
    finish: string;
    size: string;
    printType?: string;
    orientation?: string;
    coating?: string;
    durability?: string;
    features?: string;
    type?: string;
    panels?: number;
    folding?: string;
    sizes?: string;
    shapes?: string;
    packaging?: string;
    backing?: string;
    capacity?: string;
    materials?: string[];
    width?: string;
    length?: string;
    adhesive?: string;
    bannerSize?: string;
    baseType?: string;
    setup?: string;
    weight?: string;
    frameType?: string;
    usage?: string;
    special?: string;
}

export interface Turnaround {
    normal: string;
    express: string;
    expressAvailable: boolean;
    expressCost?: number;
    expressNote?: string;
}

export interface ProductVariant {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    available: boolean;
    quantity: number;
    sku: string;
    options: Record<string, string>;
}

export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    pricing: PricingTier[];
    discount?: number;
    badge?: string;
    productCode?: string;
    features?: string[];
    specifications?: Specifications;
    turnaround?: Turnaround;
    minOrderQuantity?: number;
    paperWeights?: string[];
    finishingOptions?: string[];
    variants: ProductVariant[];
    tags: string[];
    vendor: string;
    availableForSale: boolean;
}

export interface Collection {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: string | null;
    productCount: number;
    products?: Product[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    productCount: number;
    slug: string;
}

// ============================================
// REDUX STATE TYPES
// ============================================

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    currentProduct: Product | null;
    featuredProducts: Product[];
}

export interface CollectionsState {
    items: Collection[];
    loading: boolean;
    error: string | null;
    currentCollection: Collection | null;
}

// ============================================
// COMPONENT PROPS TYPES
// ============================================

export interface ProductCardProps {
    product: Product;
}