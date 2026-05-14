import fs from 'fs';

const files = [
  'app/components/Navbar/Navbar.tsx',
  'app/components/Hero/Hero.tsx',
  'app/components/Features/Features.tsx',
  'app/components/Process/Process.tsx',
  'app/components/FeaturedJobs/FeaturedJobs.tsx',
  'app/components/Industries/Industries.tsx',
  'app/components/Ethics/Ethics.tsx',
  'app/resources/components/FAQ/ResourcesFAQ.tsx',
  'app/components/Feedback/Feedback.tsx',
  'app/components/Footer/Footer.tsx'
];

const keys = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const tRegex = /t\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    keys[match[1]] = match[2];
  }
  
  const transRegex = /<Trans[^>]*i18nKey=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/Trans>/g;
  while ((match = transRegex.exec(content)) !== null) {
    keys[match[1]] = match[2].trim().replace(/<[^>]+>/g, '').replace(/\s+/g, ' '); // Strip HTML tags and normalize spaces for basic value
  }
});

console.log(JSON.stringify(keys, null, 2));
