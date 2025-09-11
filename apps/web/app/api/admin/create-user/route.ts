
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validate admin credentials
    if (email !== 'dejayillegal@gmail.com' || password !== 'Closer@82') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Create Supabase admin client
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      return NextResponse.json({ 
        error: 'Admin functionality not configured. Please set SUPABASE_SERVICE_ROLE_KEY environment variable.' 
      }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Create user
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        is_verified: true,
        created_by: 'system'
      }
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    // Insert user profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: user.user.id,
        email: email,
        handle: 'dejayillegal',
        display_name: 'Admin User',
        role: 'admin',
        is_verified: true,
        artist_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.user.id, email: user.user.email } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
