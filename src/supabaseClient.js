import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = "https://pedbuzeahissohbwdrfb.supabase.co";
const SUPABASE_ANONKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGJ1emVhaGlzc29oYndkcmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5MjYyMzMsImV4cCI6MjAzMzUwMjIzM30.z_qRRhZaXkQFKW5ZG0MLnOD-Daokztj2dH5tIG8uvh0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY)
export default supabase;