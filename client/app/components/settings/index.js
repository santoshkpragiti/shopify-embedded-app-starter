import React, { Component } from 'react'
import { SettingToggle, TextStyle } from '@shopify/polaris'
import withReact from 'tynker-util-reactWithNodes'
import app from '../../state'

const Settings = ({ app: { settings: { enabled }, saveSettings } }) => (
  <SettingToggle
    action={{
      content: enabled ? 'Disable' : 'Enable',
      onAction: () => { 
        saveSettings({ enabled: !enabled }) 
      }
    }}
    enabled={enabled}
  >
    The hello world app is 
    <TextStyle variation="strong">
      {enabled ? ' enabled' : ' disabled'}
    </TextStyle>.
  </SettingToggle>
)

export default withReact({ app })(Settings)