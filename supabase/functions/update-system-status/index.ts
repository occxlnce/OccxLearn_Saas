
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
    // Get the request body
    const { serverStatus, dbStatus, lastBackup } = await req.json();

    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get current system status
    const { data: currentStatus, error: fetchError } = await supabase
      .from('system_status')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError) throw fetchError;

    // Update only the fields that were provided
    const updates: any = {};
    if (serverStatus !== undefined) updates.server_status = serverStatus;
    if (dbStatus !== undefined) updates.db_status = dbStatus;
    if (lastBackup !== undefined) updates.last_backup = lastBackup;
    updates.updated_at = new Date().toISOString();

    // Update the system status
    const { data, error } = await supabase
      .from('system_status')
      .update(updates)
      .eq('id', currentStatus.id)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, systemStatus: data }),
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
