import React, { Component } from 'react';
import withReact from 'tynker-util-reactWithNodes'
import app from '../../state';
import { EmbeddedApp } from '@shopify/polaris/embedded';
import { Page } from '@shopify/polaris';

const EASDK = ({ app: { store, shopifyKey, loadEASDK }, children }) => (
  <EmbeddedApp 
    shopOrigin={`https://${store}.myshopify.com`} 
    apiKey={shopifyKey} 
    ref={loadEASDK}
  >
    <Page>
      {children}
    </Page>
  </EmbeddedApp>
)

export default withReact({ app })(EASDK);
