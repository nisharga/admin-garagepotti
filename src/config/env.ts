export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export const SITE_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_DOMAIN || 'http://localhost:3000/';

export const ACCESS_TOKEN_EXPIRY = Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY || 22000) * 1000;
export const REFRESH_TOKEN_EXPIRY = Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY) * 1000;