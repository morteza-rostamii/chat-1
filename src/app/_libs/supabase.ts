import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

const url = SUPABASE_URL || '';
const key = SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(url, key);

export async function uploadToSupa(
  bucketName:string, 
  filePath:string,
  fileData: any,
  options: any,
) {
  const {data, error} = await supabaseAdmin.storage
    .from(bucketName)
    .upload(filePath, fileData, options);
  
  if (error) throw error;

  return data;
}

export default supabaseAdmin;

