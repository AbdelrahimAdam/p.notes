import { collection, doc, setDoc, serverTimestamp, updateDoc, arrayUnion, getDocs } from 'firebase/firestore'
import { db } from './config'

// Initialize with sample brands and products
export const initializeSampleData = async () => {
  try {
    console.log('🚀 Initializing sample brands and products...')
    
    // Sample brands with products
    const sampleBrands = [
      {
        id: 'tom-ford',
        name: 'Tom Ford',
        slug: 'tom-ford',
        image: '/images/GURLAND.png',
        signature: 'Noir Extreme',
        description: 'Luxury fragrances from Tom Ford',
        category: 'luxury',
        isActive: true,
        price: 450,
        productIds: [] // Will be populated
      },
      {
        id: 'chanel',
        name: 'Chanel',
        slug: 'chanel',
        image: '/images/chanceshaneal.jpeg',
        signature: 'Coco Mademoiselle',
        description: 'Iconic French perfumes',
        category: 'designer',
        isActive: true,
        price: 600,
        productIds: []
      },
      {
        id: 'dior',
        name: 'Dior',
        slug: 'dior',
        image: '/images/1519957966.jpg',
        signature: 'Sauvage',
        description: 'French luxury fashion house',
        category: 'designer',
        isActive: true,
        price: 550,
        productIds: []
      }
    ]
    
    // Sample products
    const sampleProducts = [
      // Tom Ford products
      {
        id: 'tom-ford-noir-extreme',
        slug: 'tom-ford-noir-extreme',
        name: { en: 'Noir Extreme', ar: 'نوار إكستريم' },
        brand: 'tom-ford',
        brandId: 'tom-ford',
        description: { 
          en: 'A luxurious oriental fragrance with notes of vanilla, amber, and spices.', 
          ar: 'عطر شرقي فاخر بنغمات الفانيليا والعنبر والتوابل.' 
        },
        price: 450,
        size: '100ml',
        concentration: 'Eau de Parfum',
        imageUrl: '/images/GURLAND.png',
        category: 'luxury',
        isBestSeller: true,
        inStock: true,
        rating: 4.8,
        reviewCount: 124
      },
      {
        id: 'tom-ford-ombre-leather',
        slug: 'tom-ford-ombre-leather',
        name: { en: 'Ombré Leather', ar: 'أومبير ليزر' },
        brand: 'tom-ford',
        brandId: 'tom-ford',
        description: { 
          en: 'A sophisticated leather fragrance with floral and woody notes.', 
          ar: 'عطر جلد متطور بنغمات زهرية وخشبية.' 
        },
        price: 520,
        size: '100ml',
        concentration: 'Eau de Parfum',
        imageUrl: '/images/GURLAND.png',
        category: 'luxury',
        isBestSeller: true,
        inStock: true,
        rating: 4.7,
        reviewCount: 89
      },
      // Chanel products
      {
        id: 'chanel-coco-mademoiselle',
        slug: 'chanel-coco-mademoiselle',
        name: { en: 'Coco Mademoiselle', ar: 'كوكو مادموزيل' },
        brand: 'chanel',
        brandId: 'chanel',
        description: { 
          en: 'An oriental fragrance that is both modern and timeless.', 
          ar: 'عطر شرقي عصري وخالد.' 
        },
        price: 600,
        size: '100ml',
        concentration: 'Eau de Parfum',
        imageUrl: '/images/chanceshaneal.jpeg',
        category: 'designer',
        isBestSeller: true,
        inStock: true,
        rating: 4.9,
        reviewCount: 256
      },
      {
        id: 'chanel-no-5',
        slug: 'chanel-no-5',
        name: { en: 'Chanel No. 5', ar: 'شانيل رقم 5' },
        brand: 'chanel',
        brandId: 'chanel',
        description: { 
          en: 'The most legendary fragrance in the world.', 
          ar: 'أكثر العطور الأسطورية في العالم.' 
        },
        price: 850,
        size: '100ml',
        concentration: 'Eau de Parfum',
        imageUrl: '/images/chanceshaneal.jpeg',
        category: 'designer',
        isBestSeller: true,
        inStock: true,
        rating: 4.9,
        reviewCount: 342
      },
      // Dior products
      {
        id: 'dior-sauvage',
        slug: 'dior-sauvage',
        name: { en: 'Sauvage', ar: 'سافاج' },
        brand: 'dior',
        brandId: 'dior',
        description: { 
          en: 'A radically fresh composition with ambroxan.', 
          ar: 'تركيبة طازجة بشكل جذري مع أمبروكسان.' 
        },
        price: 550,
        size: '100ml',
        concentration: 'Eau de Toilette',
        imageUrl: '/images/1519957966.jpg',
        category: 'designer',
        isBestSeller: true,
        inStock: true,
        rating: 4.8,
        reviewCount: 189
      }
    ]
    
    // Create brands first
    console.log('📝 Creating brands...')
    for (const brand of sampleBrands) {
      await setDoc(doc(db, 'brands', brand.id), {
        ...brand,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log(`✅ Created brand: ${brand.name}`)
    }
    
    // Create products and update brand productIds
    console.log('📦 Creating products...')
    for (const product of sampleProducts) {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log(`✅ Created product: ${product.name.en}`)
      
      // Add product ID to brand
      const brandRef = doc(db, 'brands', product.brandId)
      await updateDoc(brandRef, {
        productIds: arrayUnion(product.id),
        updatedAt: serverTimestamp()
      })
    }
    
    console.log('🎉 Sample data initialized successfully!')
    console.log(`✅ Created: ${sampleBrands.length} brands`)
    console.log(`✅ Created: ${sampleProducts.length} products`)
    
    return {
      brands: sampleBrands.length,
      products: sampleProducts.length
    }
    
  } catch (error) {
    console.error('❌ Error initializing sample data:', error)
    throw error
  }
}

// Call this in development to initialize sample data
if (import.meta.env.DEV) {
  (window as any).initializeSampleData = initializeSampleData
}

// Function to check if data exists
export const checkDatabaseStatus = async () => {
  try {
    const brandsSnapshot = await getDocs(collection(db, 'brands'))
    const productsSnapshot = await getDocs(collection(db, 'products'))
    
    return {
      hasBrands: !brandsSnapshot.empty,
      hasProducts: !productsSnapshot.empty,
      brandCount: brandsSnapshot.size,
      productCount: productsSnapshot.size
    }
  } catch (error) {
    console.error('Error checking database status:', error)
    return {
      hasBrands: false,
      hasProducts: false,
      brandCount: 0,
      productCount: 0
    }
  }
}