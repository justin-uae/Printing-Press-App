
// Mock data based on Diamond Press catalogue

import type { Category, Product } from "../types";

export const categories: Category[] = [
    {
        id: 'business-cards',
        name: 'Business Cards',
        slug: 'business-cards',
        description: 'Premium quality business cards with various finishes',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
        icon: '💼',
        productCount: 12
    },
    {
        id: 'flyers-brochures',
        name: 'Flyers & Brochures',
        slug: 'flyers-brochures',
        description: 'Professional flyers and brochures in all sizes',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
        icon: '📄',
        productCount: 24
    },
    {
        id: 'stickers',
        name: 'Stickers & Magnets',
        slug: 'stickers',
        description: 'Custom stickers and fridge magnets',
        image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800',
        icon: '🏷️',
        productCount: 8
    },
    {
        id: 'promotional',
        name: 'Promotional Products',
        slug: 'promotional',
        description: 'Table mats, door hangers, letterheads and more',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
        icon: '🎯',
        productCount: 15
    },
    {
        id: 'packaging',
        name: 'Packaging',
        slug: 'packaging',
        description: 'Paper cups, fast food boxes and custom packaging',
        image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800',
        icon: '📦',
        productCount: 6
    }
];

export const products: Product[] = [
    // Business Cards
    {
        id: 'sb-104',
        code: 'SB-104',
        title: 'Matt Laminated Business Cards',
        category: 'business-cards',
        subcategory: 'Matt Laminated',
        description: '4 Color, 2 Sides, Matt Laminated 350 gsm business cards with premium quality',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '350gsm Matt Laminated',
            beforeCutting: '9.2 x 5.7cm',
            afterCutting: '9 x 5.5cm',
            finishes: ['Matt Lamination']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 42, pricePerUnit: 0.042 },
            { quantity: 1000, type: 'online', price: 37, pricePerUnit: 0.037 },
            { quantity: 1000, type: 'express', price: 58, pricePerUnit: 0.058 },
            { quantity: 500, type: 'normal', price: 27, pricePerUnit: 0.054 },
            { quantity: 500, type: 'online', price: 24, pricePerUnit: 0.048 },
            { quantity: 500, type: 'express', price: 39, pricePerUnit: 0.078 }
        ],
        turnaround: {
            normal: '1 Business Day',
            express: '6 Hours'
        },
        features: [
            'Premium 350gsm card stock',
            'Matt lamination both sides',
            'Sharp and vibrant colors',
            'Professional finish',
            'Water resistant'
        ],
        featured: true,
        discount: 12,
        badge: 'POPULAR'
    },
    {
        id: 'pb-203',
        code: 'PB-203',
        title: 'Rounded Corner Matt Laminated Business Cards',
        category: 'business-cards',
        subcategory: 'Rounded Corner',
        description: '4 Color, 2 Sides, Matt Laminated 350 gsm with elegant rounded corners',
        images: [
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '350gsm Matt Laminated',
            beforeCutting: '9.5 x 6cm',
            afterCutting: '9 x 5.5cm',
            finishes: ['Matt Lamination', 'Rounded Corners']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 52, pricePerUnit: 0.052 },
            { quantity: 1000, type: 'online', price: 46, pricePerUnit: 0.046 }
        ],
        turnaround: {
            normal: '1 Business Day'
        },
        features: [
            'Elegant rounded corners',
            'Premium matt finish',
            'Durable 350gsm stock',
            'Professional appearance',
            'Unique design'
        ],
        featured: true,
        badge: 'PREMIUM'
    },
    {
        id: 'sb-103',
        code: 'SB-103',
        title: 'Glossy Laminated Business Cards',
        category: 'business-cards',
        subcategory: 'Glossy Laminated',
        description: '4 Color, 2 Sides, Glossy Laminated 350 gsm with brilliant shine',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '350gsm Glossy Laminated',
            beforeCutting: '9.2 x 5.7cm',
            afterCutting: '9 x 5.5cm',
            finishes: ['Glossy Lamination']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 42, pricePerUnit: 0.042 },
            { quantity: 1000, type: 'online', price: 37, pricePerUnit: 0.037 }
        ],
        turnaround: {
            normal: '4 Business Days'
        },
        features: [
            'High gloss finish',
            'Vibrant colors',
            'Premium quality',
            'Eye-catching shine'
        ],
        featured: false
    },
    {
        id: 'sb-104-1',
        code: 'SB-104/1',
        title: 'Spot UV Matt Laminated Business Cards',
        category: 'business-cards',
        subcategory: 'Premium',
        description: '4 Color, 2 Sides, Spot UV on Matt Laminated 350 gsm - Premium finish',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '350gsm Spot UV Matt Laminated',
            beforeCutting: '9.2 x 5.7cm',
            afterCutting: '9 x 5.5cm',
            finishes: ['Matt Lamination', 'Spot UV']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 86, pricePerUnit: 0.086 },
            { quantity: 1000, type: 'online', price: 77, pricePerUnit: 0.077 }
        ],
        turnaround: {
            normal: '1-2 Business Days'
        },
        features: [
            'Luxury Spot UV coating',
            'Raised glossy effect',
            'Matt base with gloss highlights',
            'Premium business look',
            'Unique tactile feel'
        ],
        featured: true,
        badge: 'LUXURY'
    },
    {
        id: 'pb-213',
        code: 'PB-213',
        title: 'Gold Foil Matt Laminated Business Cards',
        category: 'business-cards',
        subcategory: 'Premium',
        description: '4 Color, 2 Sides, Gold Foil on Matt Laminated 350 gsm - Ultimate luxury',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '350gsm Gold Foil Matt Laminated',
            beforeCutting: '9.2 x 5.7cm',
            afterCutting: '9 x 5.5cm',
            finishes: ['Matt Lamination', 'Gold Foil Stamping']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 127, pricePerUnit: 0.127 },
            { quantity: 1000, type: 'online', price: 114, pricePerUnit: 0.114 }
        ],
        turnaround: {
            normal: '4 Business Days'
        },
        features: [
            'Real gold foil stamping',
            'Luxurious appearance',
            'Selected areas foil stamped',
            'Premium quality',
            'Make a lasting impression'
        ],
        featured: true,
        badge: 'EXCLUSIVE',
        discount: 10
    },

    // Flyers & Brochures
    {
        id: 'flyer-a4-1side',
        code: 'A4-FLYER-1S',
        title: 'A4 Flyer 1 Side - 170gsm',
        category: 'flyers-brochures',
        subcategory: 'A4',
        description: '4 color, 1 side, Real Size A4 flyer on 170gsm glossy paper',
        images: [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: '170gsm Glossy Paper',
            size: 'A4 (29.7 x 21cm)',
            finishes: ['Glossy Paper'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 166, pricePerUnit: 0.166 },
            { quantity: 1000, type: 'online', price: 149, pricePerUnit: 0.149 },
            { quantity: 2000, type: 'normal', price: 262, pricePerUnit: 0.131 },
            { quantity: 2000, type: 'online', price: 235, pricePerUnit: 0.118 },
            { quantity: 5000, type: 'normal', price: 536, pricePerUnit: 0.107 },
            { quantity: 5000, type: 'online', price: 482, pricePerUnit: 0.096 },
            { quantity: 10000, type: 'normal', price: 867, pricePerUnit: 0.087 },
            { quantity: 10000, type: 'online', price: 780, pricePerUnit: 0.078 },
            { quantity: 20000, type: 'normal', price: 1660, pricePerUnit: 0.083 },
            { quantity: 20000, type: 'online', price: 1494, pricePerUnit: 0.075 }
        ],
        turnaround: {
            normal: '2 Business Days'
        },
        features: [
            'Full A4 size',
            'High quality print',
            'Glossy finish',
            'Perfect for promotions',
            'Bulk pricing available'
        ],
        featured: true,
        badge: 'BEST VALUE'
    },
    {
        id: 'flyer-a5-2side',
        code: 'A5-FLYER-2S',
        title: 'A5 Flyer 2 Sides - 170gsm',
        category: 'flyers-brochures',
        subcategory: 'A5',
        description: '4 color, 2 sides, A5 flyer on 170gsm glossy paper',
        images: [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '170gsm Glossy Paper',
            size: 'A5 (21 x 14.8cm)',
            finishes: ['Glossy Paper'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 133, pricePerUnit: 0.133 },
            { quantity: 1000, type: 'online', price: 119, pricePerUnit: 0.119 },
            { quantity: 2000, type: 'normal', price: 200, pricePerUnit: 0.100 },
            { quantity: 2000, type: 'online', price: 180, pricePerUnit: 0.090 },
            { quantity: 5000, type: 'normal', price: 336, pricePerUnit: 0.067 },
            { quantity: 5000, type: 'online', price: 302, pricePerUnit: 0.060 }
        ],
        turnaround: {
            normal: '2 Business Days'
        },
        features: [
            'Double-sided printing',
            'Perfect for handouts',
            'Compact A5 size',
            'Glossy finish',
            'Cost effective'
        ],
        featured: false
    },
    {
        id: 'brochure-a4-8page',
        code: 'A4-BROCHURE-8P',
        title: 'A4 Brochure 8 Pages (2 Sheets)',
        category: 'flyers-brochures',
        subcategory: 'Multi-Page',
        description: '4 color, 2 sides, A4 brochure with 8 pages on 115gsm glossy paper',
        images: [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '115gsm Glossy Paper',
            size: 'A4 (29.7 x 21cm)',
            pages: 8,
            finishes: ['Glossy Paper', 'Saddle Stitching'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 2000, type: 'normal', price: 1754, pricePerUnit: 0.877 },
            { quantity: 2000, type: 'online', price: 1875, pricePerUnit: 0.938 },
            { quantity: 5000, type: 'normal', price: 3146, pricePerUnit: 0.629 },
            { quantity: 5000, type: 'online', price: 3388, pricePerUnit: 0.678 }
        ],
        turnaround: {
            normal: '2-3 Business Days'
        },
        features: [
            'Professional brochures',
            'Saddle stitch binding',
            '8 page booklet',
            'Perfect for catalogs',
            'High quality print'
        ],
        featured: true,
        badge: 'PROFESSIONAL'
    },

    // Stickers & Magnets
    {
        id: 'mg-961',
        code: 'MG-961',
        title: 'Fridge Magnet (Normal & Custom)',
        category: 'stickers',
        subcategory: 'Fridge Magnets',
        description: '4 color, 1 side, 350 gsm glossy laminated custom fridge magnets',
        images: [
            'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: '350gsm Glossy Laminated with Magnet',
            size: '9.2 x 5.7cm',
            finishes: ['Glossy Lamination', 'Magnetic Back'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 383, pricePerUnit: 0.383 },
            { quantity: 1000, type: 'online', price: 344, pricePerUnit: 0.344 }
        ],
        turnaround: {
            normal: '10 Business Days'
        },
        features: [
            'Strong magnetic back',
            'Custom designs',
            'Glossy lamination',
            'Perfect for promotions',
            'Durable and long-lasting'
        ],
        featured: true,
        badge: 'TRENDING'
    },
    {
        id: 'lb-404',
        code: 'LB-404',
        title: 'Economy Sticker Glossy Laminated',
        category: 'stickers',
        subcategory: 'Economy Stickers',
        description: '4 Color, 1 Side, Indonesia Sticker Glossy Laminated 80 gsm',
        images: [
            'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: '80gsm Glossy Laminated Sticker',
            size: '9.2 x 5.7cm',
            finishes: ['Glossy Lamination'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 46, pricePerUnit: 0.046 },
            { quantity: 1000, type: 'online', price: 41, pricePerUnit: 0.041 }
        ],
        turnaround: {
            normal: '6 Business Days'
        },
        features: [
            'Budget friendly',
            'Glossy finish',
            'Custom designs',
            'Easy to apply',
            'Bulk pricing available'
        ],
        featured: false,
        discount: 11
    },
    {
        id: 'lb-402',
        code: 'LB-402',
        title: 'Adestor Sticker Glossy Laminated',
        category: 'stickers',
        subcategory: 'Premium Stickers',
        description: '4 Color, 1 Side, Adestor Sticker Glossy Laminated 80 gsm - Premium quality',
        images: [
            'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: '80gsm Adestor Glossy Laminated',
            size: '9.2 x 5.7cm',
            finishes: ['Glossy Lamination'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 93, pricePerUnit: 0.093 },
            { quantity: 1000, type: 'online', price: 83, pricePerUnit: 0.083 }
        ],
        turnaround: {
            normal: '8 Business Days'
        },
        features: [
            'Premium Adestor material',
            'Superior adhesion',
            'Glossy lamination',
            'Durable quality',
            'Professional finish'
        ],
        featured: true,
        badge: 'PREMIUM'
    },

    // Promotional Products
    {
        id: 'a2-tablemat',
        code: 'A2-TABLEMAT',
        title: 'A2 Table Mat / Car Mat',
        category: 'promotional',
        subcategory: 'Table Mats',
        description: '4 color, 1 side table mat on glossy paper - Perfect for restaurants',
        images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: 'Glossy Paper 90gsm',
            size: 'A2 (60 x 42cm)',
            finishes: ['Glossy Paper'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 2000, type: 'normal', price: 574, pricePerUnit: 0.287 },
            { quantity: 2000, type: 'online', price: 516, pricePerUnit: 0.258 },
            { quantity: 5000, type: 'normal', price: 1022, pricePerUnit: 0.204 },
            { quantity: 5000, type: 'online', price: 919, pricePerUnit: 0.184 },
            { quantity: 10000, type: 'normal', price: 1916, pricePerUnit: 0.192 },
            { quantity: 10000, type: 'online', price: 1724, pricePerUnit: 0.172 }
        ],
        turnaround: {
            normal: '1 Business Day'
        },
        features: [
            'Large A2 size',
            'Perfect for restaurants',
            'High quality print',
            'Glossy finish',
            'Custom designs welcome'
        ],
        featured: true,
        badge: 'POPULAR'
    },
    {
        id: 'dh-971',
        code: 'DH-971',
        title: 'Door Hanger 170gsm Normal',
        category: 'promotional',
        subcategory: 'Door Hangers',
        description: '4 color, 2 sides, Door hanger perfect for hotel rooms and promotions',
        images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: '170gsm Paper',
            beforeCutting: '29 x 9cm',
            afterCutting: '26.3 x 8.1cm',
            finishes: ['Die Cut']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 203, pricePerUnit: 0.203 },
            { quantity: 1000, type: 'online', price: 182, pricePerUnit: 0.182 },
            { quantity: 2000, type: 'normal', price: 278, pricePerUnit: 0.139 },
            { quantity: 2000, type: 'online', price: 250, pricePerUnit: 0.125 },
            { quantity: 5000, type: 'normal', price: 550, pricePerUnit: 0.110 },
            { quantity: 5000, type: 'online', price: 495, pricePerUnit: 0.099 }
        ],
        turnaround: {
            normal: '3 Business Days'
        },
        features: [
            'Custom die cut shape',
            'Double sided print',
            'Perfect for hotels',
            'Promotional tool',
            'Professional quality'
        ],
        featured: false
    },
    {
        id: 'letterhead-a4',
        code: 'LH-A4',
        title: 'A4 Letterhead',
        category: 'promotional',
        subcategory: 'Letterheads',
        description: '4 color, 1 side and 2 sides, Professional letterheads',
        images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 2,
            material: 'Wood Free Paper 100gsm/120gsm',
            beforeCutting: '29.7 x 21cm',
            afterCutting: 'Will be cut 3mm from each side',
            finishes: ['Wood Free Paper']
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 153, sides: 1, paper: '100gsm' },
            { quantity: 1000, type: 'online', price: 137, sides: 1, paper: '100gsm' },
            { quantity: 1000, type: 'normal', price: 178, sides: 1, paper: '120gsm' },
            { quantity: 1000, type: 'online', price: 160, sides: 1, paper: '120gsm' },
            { quantity: 2000, type: 'normal', price: 255, sides: 2, paper: '100gsm' },
            { quantity: 2000, type: 'online', price: 229, sides: 2, paper: '100gsm' }
        ],
        turnaround: {
            normal: '3 Business Days'
        },
        features: [
            'Professional letterheads',
            'Wood free paper',
            'Multiple paper weights',
            '1 or 2 sided printing',
            'Corporate identity'
        ],
        featured: false
    },

    // Packaging
    {
        id: 'pc-981',
        code: 'PC-981',
        title: 'Paper Cup 7 oz (207 cc/ml)',
        category: 'packaging',
        subcategory: 'Paper Cups',
        description: '4 color, PE coated 240 gsm paper cups',
        images: [
            'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800'
        ],
        specifications: {
            colors: 4,
            material: 'PE Coated 240gsm',
            capacity: '7 oz (207 cc/ml)',
            dimensions: '70mm diameter, 75mm height, 50mm base',
            finishes: ['PE Coating'],
            sides: 0,
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 282, pricePerUnit: 0.282 },
            { quantity: 1000, type: 'online', price: 253, pricePerUnit: 0.253 },
            { quantity: 2000, type: 'normal', price: 383, pricePerUnit: 0.192 },
            { quantity: 2000, type: 'online', price: 344, pricePerUnit: 0.172 },
            { quantity: 5000, type: 'normal', price: 844, pricePerUnit: 0.169 },
            { quantity: 5000, type: 'online', price: 759, pricePerUnit: 0.152 },
            { quantity: 50000, type: 'normal', price: 5405, pricePerUnit: 0.108 },
            { quantity: 50000, type: 'online', price: 4864, pricePerUnit: 0.097 }
        ],
        turnaround: {
            normal: '10 Business Days'
        },
        features: [
            'Food safe PE coating',
            'Custom full color print',
            'Durable construction',
            'Perfect for cafes',
            'Bulk pricing available'
        ],
        featured: true,
        badge: 'POPULAR'
    },
    {
        id: 'fb-992',
        code: 'FB-992',
        title: 'Simple Burger Box - Lock Bottom',
        category: 'packaging',
        subcategory: 'Fast Food Boxes',
        description: '4 color, 1 side, Footboard paper 250 gsm with varnish',
        images: [
            'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800'
        ],
        specifications: {
            colors: 4,
            sides: 1,
            material: 'Footboard Paper 250gsm with Varnish',
            finishes: ['Varnish', 'Lock Bottom Design'],
            beforeCutting: "",
            afterCutting: ""
        },
        pricing: [
            { quantity: 1000, type: 'normal', price: 638, pricePerUnit: 0.638 },
            { quantity: 1000, type: 'online', price: 574, pricePerUnit: 0.574 },
            { quantity: 2000, type: 'normal', price: 957, pricePerUnit: 0.479 },
            { quantity: 2000, type: 'online', price: 861, pricePerUnit: 0.431 },
            { quantity: 5000, type: 'normal', price: 2172, pricePerUnit: 0.434 },
            { quantity: 5000, type: 'online', price: 1954, pricePerUnit: 0.391 }
        ],
        turnaround: {
            normal: '7-10 Business Days'
        },
        features: [
            'Lock bottom design',
            'Food safe material',
            'Custom printing',
            'Durable construction',
            'Perfect for burgers'
        ],
        featured: true,
        badge: 'BEST SELLER'
    }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter(p => p.featured);
};

export const getProductsBySearch = (searchTerm: string): Product[] => {
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
};

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};