const env = Object.assign({
  NAME: 'Shopify Embedded Starter',
  PORT: 3000,
  DATABASE: 'mongodb://localhost/shopify-embedded-starter-app',
  URL: 'https://bf7a3573.ngrok.io',
  SHOPIFY_API_KEY: '016892c950d22bca02ff9632e6aff5e7',
  SHOPIFY_API_SECRET: 'b07d9cce8948aef0ae852cd19fa670da',
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
