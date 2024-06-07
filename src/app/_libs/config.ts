
export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
export const MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL;
export const API_URL = NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL_PRO;
export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;