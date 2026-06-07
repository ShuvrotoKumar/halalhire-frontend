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
  if (!fs.existsSync(file)) {
      console.log(`File not found: ${file}`);
      continue;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Add import if not exists
  if (!content.includes('useGetAllNotificationQuery')) {
    if (content.includes("import { imageUrl } from '@/Utils/server';")) {
        content = content.replace(
          "import { imageUrl } from '@/Utils/server';",
          "import { imageUrl } from '@/Utils/server';\nimport { useGetAllNotificationQuery } from '@/redux/api/notificationApi';"
        );
    } else {
       // fallback
       content = content.replace(
         "import { useTranslation",
         "import { useGetAllNotificationQuery } from '@/redux/api/notificationApi';\nimport { useTranslation"
       );
    }
  }
  
  // Replace useMemo array
  const regex = /const notifications = (?:React\.)?useMemo\(\(\) => \[\s*\{[\s\S]*?\}\s*\],\s*\[t\]\);/;
  const replacement = `const { data: notificationData } = useGetAllNotificationQuery(undefined);
    const notifications = notificationData?.data?.all_notification?.map((n: any) => ({
        id: n._id || Math.random().toString(),
        title: n.title || 'Notification',
        description: n.message || n.description || '',
        time: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recently'
    })) || [];`;
    
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Regex did not match for ${file}`);
  }
}