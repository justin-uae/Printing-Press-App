import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import type { Product } from '..';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    productCount: number;
}

export const useCategories = (): Category[] => {
    const { items: allProducts } = useAppSelector((state) => state.products);

    return useMemo((): Category[] => {
        if (!allProducts.length) return [];

        const categoryMap = new Map<string, { count: number; products: Product[] }>();

        allProducts.forEach(product => {
            if (product.category) {
                const existing = categoryMap.get(product.category) || { count: 0, products: [] };
                categoryMap.set(product.category, {
                    count: existing.count + 1,
                    products: [...existing.products, product]
                });
            }
        });

        const categoryIcons: Record<string, string> = {
            'business-cards-stationery': '💼',
            'business-cards': '💼',
            'flyers-brochures': '📄',
            'flyers': '📄',
            'brochures': '📄',
            'stickers-labels': '🏷️',
            'stickers': '🏷️',
            'labels': '🏷️',
            'packaging': '📦',
            'marketing-materials': '📢',
            'marketing': '📢',
            'banners': '🎌',
            'posters': '🖼️',
            'catalogs': '📚',
            'letterheads': '📝',
            'envelopes': '✉️',
            'folders': '📁',
            'calendars': '📅',
            'notebooks': '📓',
        };

        return Array.from(categoryMap.entries())
            .map(([categorySlug, data]) => {
                const name = categorySlug
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return {
                    id: categorySlug,
                    name,
                    slug: categorySlug,
                    icon: categoryIcons[categorySlug] || '🖨️',
                    productCount: data.count
                };
            })
            .sort((a, b) => b.productCount - a.productCount);
    }, [allProducts]);
};