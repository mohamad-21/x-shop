import { Database } from "@/lib/supabase/database.types";

export interface UserSelect extends Omit<Database["public"]["Tables"]["users"]["Row"], "hashed_password"> { }