const config = {
  locales: [
    "en",
    "de",
    "tr",
    "ar"
  ],
  extract: {
    input: "**/*.{js,ts,jsx,tsx}",
    output: "public/locales/{{language}}/{{namespace}}.json"
  },
  // locize: {
  //   projectId: "62892864-261c-4250-a963-1a8349f82283",
  //   apiKey: "[ENCRYPTION_KEY]",
  //   referenceLanguage: "en"
  // }
};

export default config;