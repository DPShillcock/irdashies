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

// Demo data for twitch chat
export const getDemoTwitchChatData = (settings: TwitchChatSettings | undefined): TwitchChatDemoData => {
  const channel = 'irDashies';

  return {
    channel: channel,
    oAuthKey: '',
  };
};
