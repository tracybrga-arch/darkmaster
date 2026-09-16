import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Category = {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  icon: string | null;
  description_ar: string | null;
  description_en: string | null;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
  price: number;
  description_ar: string | null;
  description_en: string | null;
  image_url: string | null;
  stock: number;
  featured: boolean;
  created_at: string;
};