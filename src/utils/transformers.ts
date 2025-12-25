// ============================================
// HELPER FUNCTIONS
// ============================================

import type { PricingTier, ShopifyProduct, Specifications, Turnaround, Product, ProductVariant, ShopifyCollection, Collection } from "..";

const parseJSON = <T>(value: string | null | undefined, fallback: T): T => {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

const parseList = (value: string | null | undefined): string[] => {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

// ============================================
// PRICE INCREASE UTILITY
// ============================================

/**
 * Apply price increase to a price value
 */
const applyPriceIncrease = (price: number, increasePercentage: number): number => {
    if (increasePercentage === 0) return price;
    return Math.round(price * (1 + increasePercentage / 100));
};

export const transformShopifyProduct = (shopifyProduct: ShopifyProduct): Product => {
    // Create metafields map for easy access
    const metafieldsMap = new Map(
        shopifyProduct.metafields.map(mf => [mf?.key, mf?.value])
    );

    // Parse all metafields
    const specifications = parseJSON<Specifications>(
        metafieldsMap.get('specifications'),
        {} as Specifications
    );

    const pricingTiersData = parseJSON<{ online: PricingTier[]; normal: PricingTier[] }>(
        metafieldsMap.get('pricing_tiers'),
        { online: [], normal: [] }
    );

    const turnaround = parseJSON<Turnaround>(
        metafieldsMap.get('turnaround'),
        {
            normal: '1-2 business days',
            express: 'Available',
            expressAvailable: false,
        }
    );

    const badge = metafieldsMap.get('badge') || undefined;
    const productCode = metafieldsMap.get('product_code') || undefined;

    const discountPercentage = metafieldsMap.get('discount_percentage')
        ? parseInt(metafieldsMap.get('discount_percentage')!)
        : undefined;

    const features = parseList(metafieldsMap.get('features'));

    const minOrderQuantity = metafieldsMap.get('min_order_quantity')
        ? parseInt(metafieldsMap.get('min_order_quantity')!)
        : undefined;

    const paperWeights = parseList(metafieldsMap.get('paper_weights'));
    const finishingOptions = parseList(metafieldsMap.get('finishing_options'));

    // Get price increase percentage from metafield
    const priceIncreasePercentage = metafieldsMap?.get('price_increase_percentage')
        ? parseFloat(metafieldsMap?.get('price_increase_percentage')!)
        : 0;

    // Extract images
    const images = shopifyProduct.images.edges.map(edge => edge.node.url);

    // Determine category from product type or tags
    const category = shopifyProduct.productType ||
        shopifyProduct.tags.find(tag =>
            ['business-cards', 'flyers', 'brochures', 'stickers', 'labels', 'packaging', 'marketing'].includes(tag)
        ) ||
        'general';

    // Combine online and normal pricing with price increase applied
    const pricing: PricingTier[] = [
        ...pricingTiersData.online.map(p => ({
            ...p,
            type: 'online',
            price: applyPriceIncrease(p.price, priceIncreasePercentage)
        })),
        ...pricingTiersData.normal.map(p => ({
            ...p,
            type: 'normal',
            price: applyPriceIncrease(p.price, priceIncreasePercentage)
        })),
    ];

    // Transform variants with price increase applied
    const variants: ProductVariant[] = shopifyProduct.variants.edges.map(edge => {
        const variant = edge.node;
        const options: Record<string, string> = {};

        variant.selectedOptions.forEach(opt => {
            options[opt.name] = opt.value;
        });

        return {
            id: variant.id,
            title: variant.title,
            price: applyPriceIncrease(parseFloat(variant.priceV2.amount), priceIncreasePercentage),
            compareAtPrice: variant.compareAtPriceV2
                ? applyPriceIncrease(parseFloat(variant.compareAtPriceV2.amount), priceIncreasePercentage)
                : undefined,
            available: variant.availableForSale,
            quantity: variant.quantityAvailable,
            sku: variant.sku || '',
            options,
        };
    });

    return {
        id: shopifyProduct.id,
        handle: shopifyProduct.handle,
        title: shopifyProduct.title,
        description: shopifyProduct.description,
        category,
        images,
        pricing,
        discount: discountPercentage,
        badge,
        productCode,
        features,
        specifications,
        turnaround,
        minOrderQuantity,
        paperWeights,
        finishingOptions,
        variants,
        tags: shopifyProduct.tags,
        vendor: shopifyProduct.vendor,
        availableForSale: shopifyProduct.availableForSale,
    };
};

// ============================================
// TRANSFORM SHOPIFY COLLECTION TO APP COLLECTION
// ============================================

export const transformShopifyCollection = (shopifyCollection: ShopifyCollection): Collection => {
    const products = shopifyCollection.products.edges.map(edge =>
        transformShopifyProduct(edge.node)
    );

    return {
        id: shopifyCollection.id,
        handle: shopifyCollection.handle,
        title: shopifyCollection.title,
        description: shopifyCollection.description,
        image: shopifyCollection.image?.url || null,
        productCount: products.length,
        products,
    };
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getLowestOnlinePrice = (pricing: PricingTier[]): number => {
    const onlinePrices = pricing.filter(p => p.type === 'online').map(p => p.price);
    return onlinePrices.length > 0 ? Math.min(...onlinePrices) : 0;
};

export const getLowestNormalPrice = (pricing: PricingTier[]): number => {
    const normalPrices = pricing.filter(p => p.type === 'normal').map(p => p.price);
    return normalPrices.length > 0 ? Math.min(...normalPrices) : 0;
};

export const calculateSavings = (onlinePrice: number, normalPrice: number): number => {
    if (normalPrice <= 0) return 0;
    return Math.round(((normalPrice - onlinePrice) / normalPrice) * 100);
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
    if (!category || category === 'all') return products;
    return products.filter(
        product =>
            product.category === category ||
            product.tags.includes(category) ||
            product.handle.includes(category)
    );
};

export const filterProductsBySearch = (products: Product[], query: string): Product[] => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(
        product =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

export const generateCategoriesFromCollections = (collections: Collection[]) => {
    const categoryIcons: Record<string, string> = {
        'business-cards-stationery': '💼',
        'flyers-brochures': '📄',
        'stickers-labels': '🏷️',
        'packaging': '📦',
        'marketing-materials': '📢',
        'featured-products': '⭐',
        'special-offers': '🔥',
        'express-delivery': '⚡',
    };

    return collections.map(collection => ({
        id: collection.handle,
        name: collection.title,
        description: collection.description,
        icon: categoryIcons[collection.handle] || '🖨️',
        productCount: collection.productCount,
        slug: collection.handle,
    }));
};