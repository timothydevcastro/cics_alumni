"use server";
import { cookies } from 'next/headers';

export async function loginAction(password: string) {
  // Check against env variable, fallback to simple default if not set for testing
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === correctPassword) {
    cookies().set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  return { success: false };
}
