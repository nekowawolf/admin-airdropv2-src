export const URL_PATTERNS = {
  github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+(\/.*)?$/,
  twitter: /^https?:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+(\/.*)?$/,
  discord: /^https?:\/\/(www\.)?discord\.(gg|com)\/.+$/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+(\/.*)?$/,
  telegram: /^https?:\/\/(www\.)?(t\.me|telegram\.me)\/.+$/,
  youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  website: /^https?:\/\/.+$/
};

const RESTRICTED_WEBSITE_DOMAINS = [
  'github.com',
  'twitter.com',
  'x.com',
  'discord.gg',
  'discord.com',
  'instagram.com',
  't.me',
  'telegram.me',
  'youtube.com',
  'youtu.be'
];

export const validateUrl = (url: string, type: keyof typeof URL_PATTERNS): boolean => {
  if (!url) return true;
  
  if (type === 'website') {
    if (!URL_PATTERNS.website.test(url)) return false;
    
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      const isRestricted = RESTRICTED_WEBSITE_DOMAINS.some(domain => 
        hostname === domain || hostname.endsWith(`.${domain}`)
      );
      
      if (isRestricted) return false;
    } catch (e) {
      return false;
    }
    
    return true;
  }
  
  return URL_PATTERNS[type].test(url);
};