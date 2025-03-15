
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type UserStatus = "active" | "inactive" | "suspended" | "on leave";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { userId, status } = await req.json();

    if (!userId || !status) {
      return new Response(
        JSON.stringify({ error: "User ID and status are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate the status value
    const validStatuses: UserStatus[] = ["active", "inactive", "suspended", "on leave"];
    if (!validStatuses.includes(status as UserStatus)) {
      return new Response(
        JSON.stringify({ error: "Invalid status value" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update user status in the profile
    const { data, error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // For suspended users, we might also want to disable their auth account
    if (status === 'suspended') {
      await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { is_suspended: true } }
      );
    } else if (status === 'active') {
      await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { is_suspended: false } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user: data }),
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
