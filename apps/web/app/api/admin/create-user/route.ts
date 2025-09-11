
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role = 'user' } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // First, try to get the existing user
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    let authData;
    
    if (existingUser) {
      // User exists, update password and confirm email
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password,
          email_confirm: true,
          user_metadata: {
            role,
            updated_by: 'admin_setup'
          }
        }
      );

      if (updateError) {
        console.error('Update error:', updateError);
        return NextResponse.json(
          { error: `Failed to update existing user: ${updateError.message}` },
          { status: 400 }
        );
      }

      authData = { user: updateData.user };
    } else {
      // Create new user
      const { data: createData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          role,
          created_by: 'admin_setup'
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        return NextResponse.json(
          { error: authError.message },
          { status: 400 }
        );
      }

      authData = createData;
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 400 }
      );
    }

    // Create or update user profile
    if (authData.user) {
      const profileData = {
        id: authData.user.id,
        email: authData.user.email,
        handle: email.split('@')[0], // Use email prefix as handle
        role,
        verified: true,
        updated_at: new Date().toISOString()
      };

      if (existingUser) {
        // Update existing profile
        const { error: profileError } = await supabase
          .from('users')
          .update(profileData)
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      } else {
        // Insert new profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            ...profileData,
            created_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }
    }

    console.log('Admin user operation completed:', {
      action: existingUser ? 'updated' : 'created',
      userId: authData.user?.id,
      email: authData.user?.email,
      emailConfirmed: authData.user?.email_confirmed_at,
      role
    });

    return NextResponse.json({
      success: true,
      action: existingUser ? 'updated' : 'created',
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        emailConfirmed: !!authData.user?.email_confirmed_at,
        role
      }
    });

  } catch (error: any) {
    console.error('Admin user creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
