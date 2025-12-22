// Product Types
export interface ProductSpecifications {
    colors: number;
    sides: number;
    material: string;
    beforeCutting: string;
    afterCutting: string;
    finishes: string[];
    size?: string;
    capacity?: string;
    dimensions?: string;
    pages?: number;
}

export interface PricingTier {
    quantity: number;
    type: 'normal' | 'online' | 'express';
    price: number;
    pricePerUnit?: number;
    sides?: number;
    paper?: string;
}

export interface Turnaround {
    normal: string;
    express?: string;
}

export interface Product {
    id: string;
    code: string;
    title: string;
    category: string;
    subcategory: string;
    description: string;
    images: string[];
    specifications: ProductSpecifications;
    pricing: PricingTier[];
    turnaround: Turnaround;
    features?: string[];
    featured?: boolean;
    discount?: number;
    badge?: string;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    icon: string;
    productCount: number;
}

// Cart Types
export interface SelectedOptions {
    quantity: number;
    priceType: 'normal' | 'online' | 'express';
    paper?: string | null;
    turnaround: 'normal' | 'express';
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    selectedOptions: SelectedOptions;
}

// Redux State Types
export interface CartState {
    items: CartItem[];
}

export interface FilterState {
    selectedCategory: string | null;
    searchTerm: string;
    priceRange: [number, number];
    sortBy: 'featured' | 'price-low' | 'price-high' | 'name';
}

export interface UIState {
    isMobileMenuOpen: boolean;
    isCartOpen: boolean;
    isQuickViewOpen: boolean;
    quickViewProduct: Product | null;
}

export interface RootState {
    cart: CartState;
    filter: FilterState;
    ui: UIState;
}

// Component Props Types
export interface ProductCardProps {
    product: Product;
}

export interface AddToCartPayload {
    product: Product;
    quantity: number;
    selectedOptions: SelectedOptions;
}

export interface UpdateQuantityPayload {
    itemId: number;
    quantity: number;
}