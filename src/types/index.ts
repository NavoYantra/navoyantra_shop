export type PageType = 'home' | 'shop' | 'lab-setup' | 'blogs' | 'product-detail' | 'admin' | 'account';

export type CategoryType = 
  | 'Robotics'
  | 'AI & Machine Learning'
  | 'IoT & Smart Home'
  | 'Embedded Systems'
  | 'STEM Starter'
  | 'Drones & Automation'
  | '3D Printing & Fabrication';

export type AgeGroupType = '8-10' | '11-13' | '14-16' | '17+';

export type TechStackType = 
  | 'Arduino' 
  | 'ESP32' 
  | 'Raspberry Pi' 
  | 'AI & Computer Vision' 
  | 'IoT Sensors' 
  | 'Micro:bit' 
  | 'ROS & Motors';

export interface ProductSpec {
  microcontroller?: string;
  sensors?: string[];
  codingLanguages?: string[];
  powerSource?: string;
  includedProjectsCount?: number;
  boxWeight?: string;
  warranty?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface ProductShipping {
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingClass: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  category: CategoryType;
  ageGroup: AgeGroupType;
  ageText: string;
  techStack: TechStackType[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  images: string[];
  badges: string[];
  inStock: boolean;
  stockCount: number;
  specs: ProductSpec;
  whatsInside: string[];
  sampleProjects: string[];
  isFeatured?: boolean;
  
  // Advanced fields
  shortDescription?: string;
  tileDescription?: string;
  tags?: string[];
  brand?: string;
  youtubeVideoUrl?: string;
  features?: string[];
  shipping?: ProductShipping;
  variants?: ProductVariant[];
  hasVariants?: boolean;
  publishStatus?: 'Draft' | 'Published';
  scheduledPublishDate?: string;
  sku?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  author: string;
  role: 'Parent' | 'Teacher' | 'Student' | 'School Principal' | 'STEM Coach';
  institution?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  avatar: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    isOfficial?: boolean;
  };
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  isFeatured?: boolean;
  status?: 'published' | 'pending' | 'rejected';
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'Video Tutorial' | 'Project PDF' | 'Code Repository' | 'Curriculum Guide';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  downloads?: number;
  thumbnail: string;
  description: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: CategoryType[];
  selectedAgeGroups: AgeGroupType[];
  selectedTechStacks: TechStackType[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest';
}

export interface B2BQuoteFormData {
  institutionName: string;
  contactPerson: string;
  email: string;
  phone: string;
  cityState: string;
  institutionType: 'School (K-12)' | 'College / University' | 'Coaching Center' | 'Atal Tinkering Lab' | 'NGO';
  targetStudents: number;
  labBudgetRange: string;
  interestedKits: string[];
  message: string;
}
