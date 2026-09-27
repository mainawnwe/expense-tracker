import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// This is a temporary user ID for our demo.
// In a real app, you would get this from Supabase Auth.
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000';

export const apiService = {
  async fetchAll() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...payload, user_id: MOCK_USER_ID }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, patch) {
    const { data, error } = await supabase
      .from('transactions')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
    async remove(id) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async removeAll() {
    // Delete all rows — safe because RLS policy is permissive for demo
    const { error } = await supabase
      .from('transactions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  },
};

