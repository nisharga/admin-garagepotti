import { Outfit } from 'next/font/google';

export const SITE_TITLE_DEFAULT = 'Garagepotti | A Smart Solutions for Cars';
export const SITE_TITLE_TEMPLATE_DEFAULT = `%s - Garagepotti`;
export const SITE_DESCRIPTION_DEFAULT = 'Ultimate solution for car owner';
export const SITE_VERIFICATION_GOOGLE_DEFAULT =
    'google-site-verification=adwdawdaw';

export const FONT_DEFAULT = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit-sans'
});
