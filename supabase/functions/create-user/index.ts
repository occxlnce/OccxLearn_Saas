
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
    const { email, firstName, lastName, role, classId, subjects } = await req.json();

    if (!email || !role) {
      return new Response(
        JSON.stringify({ error: "Email and role are required" }),
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

    // Generate a random password for the new user (they can reset it later)
    const tempPassword = Math.random().toString(36).substring(2, 12);

    // Create the user in Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        role,
      }
    });

    if (userError) throw userError;

    // The user ID from the newly created auth user
    const userId = userData.user.id;

    // Update the profile with additional information
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        class_id: classId || null,
        // Add more fields as needed
      })
      .eq('id', userId);

    if (profileError) throw profileError;

    // For teachers, handle subject assignments
    if (role === 'teacher' && subjects && subjects.length > 0) {
      // This is simplified - in a real app, you might want to create or update
      // a teacher_subjects junction table
      console.log(`Teacher ${firstName} ${lastName} (${userId}) assigned to subjects:`, subjects);
    }

    return new Response(
      JSON.stringify({ success: true, userId }),
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
