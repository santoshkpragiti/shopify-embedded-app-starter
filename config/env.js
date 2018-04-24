const env = Object.assign({
  NAME: 'Shopify Embedded Starter',
  PORT: 3000,
  DATABASE: '',
  URL: '',
  SHOPIFY_API_KEY: '',
  SHOPIFY_API_SECRET: '',
  SHOPIFY_APP_SCOPE: [
    'write_script_tags'
  ],
  LIVECHAT_API_KEY: null,
  APPLICATION_CHARGE: null,
  RECURRING_CHARGE: true,
  FREE_TRIAL_DURATION: 0,
  TEST_BILLING: true,
  DEFAULT_SETTINGS: {
    enabled: true,
  }
}, process.env)

module.exports = env;
