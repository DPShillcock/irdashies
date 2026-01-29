import { useDashboard } from '@irdashies/context';
import type {
  TwitchChatWidgetSettings,
} from '../../Settings/types';

const DEFAULT_CONFIG: TwitchChatWidgetSettings = {
  enabled: false,
  config: {
    channel: '',
    oAuthKey: '',
    background: {
      opacity: 0.3
    }
  },
};

export const useTwitchChatSettings = () => {
  const { currentDashboard } = useDashboard();

  const saved = currentDashboard?.widgets.find((w) => w.id === 'twitchchat') as
    | TwitchChatWidgetSettings
    | undefined;

  if (saved && typeof saved === 'object') {
    // Merge saved config with defaults to support older dashboards missing keys
    return {
      enabled: saved.enabled ?? DEFAULT_CONFIG.enabled,
      config: {
        background: {opacity: saved.config.background.opacity ?? 0.3},
        channel:
          (saved.config as TwitchChatWidgetSettings['config'])
            ?.channel ?? DEFAULT_CONFIG.config.channel,
        oAuthKey:
          (saved.config as TwitchChatWidgetSettings['config'])?.oAuthKey ??
          DEFAULT_CONFIG.config.oAuthKey,
      },
    } as TwitchChatWidgetSettings;
  }

  return DEFAULT_CONFIG;
};
