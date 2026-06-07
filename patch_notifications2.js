const fs = require('fs');

const files = [
  'app/company_profile/page.tsx',
  'app/company_req/page.tsx',
  'app/company_team/page.tsx',
  'app/compnay_jobs/page.tsx',
  'app/user_applied_jobs/page.tsx',
  'app/user_profile/page.tsx',
  'app/user_saved_jobs/page.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/notifications\.map\(\(notification\) =>/g, 'notifications.map((notification: any) =>');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
