// Demo data for Twitch Chat component

export interface TwitchChatSettings {
  config: {
    channel: string;
    oAuthKey: string;
  };
  enabled: boolean;
}

export interface TwitchChatDemoData {
  channel: string;
  oAuthKey: string;
}

