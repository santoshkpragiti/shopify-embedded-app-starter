import React, { Component } from 'react'
import LiveChat from 'react-livechat'
import withReact from 'tynker-util-reactWithNodes'
import app from '../../state'

const Chat = ({ app: { livechatKey, lcsdk, loadLCSDK } }) => (
  livechatKey ? (
    <LiveChat 
      hide_chat_window={true}
      license={livechatKey} 
      onChatLoaded={loadLCSDK}
    />
  ) : null
)

export default withReact({ app })(Chat)