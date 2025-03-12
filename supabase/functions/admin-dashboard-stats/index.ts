
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user statistics
    const { data: userStats, error: userError } = await supabase
      .from('profiles')
      .select('role, count')
      .group('role');

    if (userError) throw userError;

    // Process user statistics
    const userCounts = {
      totalUsers: 0,
      teachers: 0,
      students: 0,
      admins: 0
    };

    userStats.forEach((stat) => {
      if (stat.role === 'teacher') userCounts.teachers = parseInt(stat.count);
      else if (stat.role === 'student') userCounts.students = parseInt(stat.count);
      else if (stat.role === 'admin') userCounts.admins = parseInt(stat.count);
    });
    userCounts.totalUsers = userCounts.teachers + userCounts.students + userCounts.admins;

    // Get system status
    const { data: systemStatus, error: systemError } = await supabase
      .from('system_status')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (systemError) throw systemError;

    // Get recent activities
    const { data: recentActivities, error: activitiesError } = await supabase
      .from('activities')
      .select('id, action, timestamp, details, profiles(first_name, last_name)')
      .order('timestamp', { ascending: false })
      .limit(5);

    if (activitiesError) throw activitiesError;

    // Get usage summary data
    const { data: activeUsers, error: activeUsersError } = await supabase
      .from('profiles')
      .select('id')
      .gt('updated_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Active in last 30 days
      .count();

    if (activeUsersError) throw activeUsersError;

    const { data: uploadsCount, error: uploadsError } = await supabase
      .from('uploads')
      .select('id')
      .count();

    if (uploadsError) throw uploadsError;

    const usageSummary = {
      activeUsers: {
        count: activeUsers.count || 0,
        total: userCounts.totalUsers,
        percentage: userCounts.totalUsers > 0 ? Math.round((activeUsers.count || 0) * 100 / userCounts.totalUsers) : 0
      },
      documentsUploaded: {
        count: uploadsCount.count || 0,
        total: 1000, // Arbitrary limit
        percentage: Math.round((uploadsCount.count || 0) * 100 / 1000)
      },
      storageUsed: {
        count: systemStatus.storage_used || 0,
        total: systemStatus.storage_total || 50,
        percentage: Math.round(((systemStatus.storage_used || 0) * 100) / (systemStatus.storage_total || 50)),
        unit: 'GB'
      }
    };

    // Return all dashboard data
    return new Response(
      JSON.stringify({
        userCounts,
        systemStatus,
        recentActivities,
        usageSummary
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
