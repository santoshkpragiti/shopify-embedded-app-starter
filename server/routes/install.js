const express = require('express');
const axios = require('axios');
const generateNonce = require('nonce')();
const { Shop } = require('../models');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_APP_SCOPE, URL } = require('../../config/env');
const { privateRoute, redirectToApp } = require('../middleware');
const router = express.Router();

// install route
router.get('/', (request, response, next) => {
  const { shop } = request.query;
  if (!shop) {
    return next({
      status: 422, 
      message: 'Missing shop parameter'
    })
  }

  const domain = shop
  const nonce = generateNonce()
  const authURL = `https://${shop}.myshopify.com/admin/oauth/authorize`
    + `?client_id=${SHOPIFY_API_KEY}`
    + `&scope=${SHOPIFY_APP_SCOPE}`
    + `&state=${nonce}`
    + `&redirect_uri=${URL}/install/callback`

  Shop.findByIdAndUpdate(shop, { _id: shop, domain, nonce }, { upsert: true })
  .then((shop) => {
    return response.redirect(authURL)
  }).catch(next)
})

// secure the callback route and provide a shop
router.use(privateRoute)

// install permenant access token
router.get('/callback', (request, response, next) => {
  const { code } = request.query
  const { shop } = response.locals
  const authURL = `https://${shop.domain}.myshopify.com/admin/oauth/access_token`

  axios.post(authURL, {
    client_id: SHOPIFY_API_KEY,
    client_secret: SHOPIFY_API_SECRET,
    code,
  })
  .then((result) => {
    shop.token = result.data.access_token
    shop.save()
    .then(() => next())
    .catch(next)
  })
  .catch(next)
})

// handle billing
router.get('/callback', (request, response, next) => {
  next()
})

// install scriptTag using shop.api
router.get('/callback', (request, response, next) => {
  const { shop } = response.locals
  shop.api.scriptTag.create({
    event: 'onload',
    src: `${URL}/assets/app/script-tag/main.js`
  })
  .then(() => next())
  .catch(next)
})

// install webhooks using shop.api
router.get('/callback', (request, response, next) => {
  const { shop } = response.locals;
  shop.api.webhook.create({
    topic: 'app/uninstalled',
    address: `${URL}/webhook/uninstalled`
  })
  .then(() => next())
  .catch(next)
})

// post isntall done - redirect to app in admin
router.use('/callback', redirectToApp)

module.exports = router