/**
 * Supabase Configuration
 * Real database connection for DataWhere House
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.log('Please create a .env file with:');
  console.log('VITE_SUPABASE_URL=https://rwtcsijqwdprjttikhfq.supabase.co');
  console.log('VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3dGNzaWpxd2Rwcmp0dGlraGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NjgwMDAsImV4cCI6MjA4NjU0NDAwMH0.2Ig9M_rEYnq5r7XD4wqOAOavxRuaiVB9A6Oyv-RGtYM');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database helper functions

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
};

/**
 * Sign up new user
 */
export const signUp = async (email, password, fullName, company) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company: company
        }
      }
    });

    if (authError) throw authError;

    // 2. Create user profile in users table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: email,
            full_name: fullName,
            company: company
          }
        ]);

      if (profileError) throw profileError;
    }

    return { data: authData, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error };
  }
};

/**
 * Sign in user
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
};

/**
 * Sign out user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
  }
  return { error };
};

/**
 * Get dashboard data
 */
export const getDashboardData = async () => {
  try {
    // Get sales data
    const { data: salesData, error: salesError } = await supabase
      .from('fact_sales')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    if (salesError) throw salesError;

    // Calculate KPIs
    const totalRevenue = salesData.reduce((sum, sale) => sum + parseFloat(sale.revenue), 0);
    const totalUnits = salesData.reduce((sum, sale) => sum + sale.units, 0);

    // Group by region
    const revenueByRegion = salesData.reduce((acc, sale) => {
      if (!acc[sale.region]) {
        acc[sale.region] = 0;
      }
      acc[sale.region] += parseFloat(sale.revenue);
      return acc;
    }, {});

    // Group by month
    const salesByMonth = salesData.reduce((acc, sale) => {
      const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += parseFloat(sale.revenue);
      return acc;
    }, {});

    return {
      data: {
        kpis: {
          totalRevenue,
          totalUnits,
          avgOrderValue: totalRevenue / salesData.length,
          growth: 23.8 // Calculate from historical data
        },
        salesTrend: Object.entries(salesByMonth).map(([month, revenue]) => ({
          month,
          sales: revenue
        })),
        regionData: Object.entries(revenueByRegion).map(([region, revenue]) => ({
          region,
          revenue
        })),
        recentSales: salesData.slice(0, 10)
      },
      error: null
    };
  } catch (error) {
    console.error('Dashboard data error:', error);
    return { data: null, error };
  }
};

/**
 * Upload data file
 */
export const uploadData = async (fileName, fileSize, rows, columns) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('data_uploads')
      .insert([
        {
          user_id: user.id,
          file_name: fileName,
          file_size: fileSize,
          rows: rows,
          columns: columns,
          status: 'completed',
          processed_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { data: null, error };
  }
};

/**
 * Get user's uploads
 */
export const getUserUploads = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('data_uploads')
      .select('*')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Get uploads error:', error);
    return { data: null, error };
  }
};

/**
 * Execute custom SQL query (admin only)
 */
export const executeQuery = async (query) => {
  try {
    // For security, we use RPC function on backend
    const { data, error } = await supabase.rpc('execute_custom_query', {
      query_text: query
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Query execution error:', error);
    return { data: null, error };
  }
};

/**
 * Save AI query for history
 */
export const saveAIQuery = async (queryText, queryType, results) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('queries')
      .insert([
        {
          user_id: user.id,
          query_type: queryType,
          query_text: queryText,
          results: results,
          execution_time_ms: 0
        }
      ])
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Save query error:', error);
    return { data: null, error };
  }
};

/**
 * Get analytics data with filters
 */
export const getAnalyticsData = async (filters = {}) => {
  try {
    let query = supabase
      .from('fact_sales')
      .select('*');

    // Apply filters
    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    if (filters.region) {
      query = query.eq('region', filters.region);
    }
    if (filters.product) {
      query = query.eq('product_id', filters.product);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Analytics data error:', error);
    return { data: null, error };
  }
};

/**
 * Get real-time updates using Supabase subscriptions
 */
export const subscribeToSales = (callback) => {
  const subscription = supabase
    .channel('sales_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'fact_sales'
      },
      (payload) => {
        console.log('Real-time update:', payload);
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};

/**
 * Unsubscribe from real-time updates
 */
export const unsubscribeFromSales = (subscription) => {
  supabase.removeChannel(subscription);
};

// Export supabase client as default
export default supabase;