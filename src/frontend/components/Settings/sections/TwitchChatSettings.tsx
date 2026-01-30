import { useState } from 'react';
import { BaseSettingsSection } from '../components/BaseSettingsSection';
import { TwitchChatWidgetSettings } from '../types';
import { useDashboard } from '@irdashies/context';

const SETTING_ID = 'twitchchat';

const defaultConfig: TwitchChatWidgetSettings['config'] = {
  background: { opacity: 30 },
  channel: '',
  oAuthKey: '',
};

const migrateConfig = (savedConfig: unknown): TwitchChatWidgetSettings['config'] => {
  if (!savedConfig || typeof savedConfig !== 'object') return defaultConfig;
  const config = savedConfig as Record<string, unknown>;

  return {
    background: { opacity: (config.background as { opacity?: number })?.opacity ?? defaultConfig.background.opacity },
    channel: (config.channel as string) ?? defaultConfig.channel,
    oAuthKey: (config.oAuthKey as string) ?? defaultConfig.oAuthKey,
  };
};

export const TwitchChatSettings = () => {
  const { bridge, currentDashboard } = useDashboard();
  const savedSettings = currentDashboard?.widgets.find(
    (w) => w.id === SETTING_ID
  ) as TwitchChatWidgetSettings | undefined;
  const [settings, setSettings] = useState<TwitchChatWidgetSettings>({
    enabled: savedSettings?.enabled ?? false,
    config: migrateConfig(savedSettings?.config),
  });

  if (!currentDashboard) {
    return <>Loading...</>;
  }


  /* Preparation for OAuth request
  const handleGetNewOAuth = () => {
    bridge.openExternal("https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=55sor7qpeoe4ptyin4jfkr22pm9yqt&scope=chat:read chat:edit&redirect_uri=http://localhost:3000/twitchchat/auth/callback");
  };
  */

  return (
    <BaseSettingsSection
      title="Twitch Chat"
      description="Configure Twitch chat settings."
      settings={settings}
      onSettingsChange={setSettings}
      widgetId={SETTING_ID}
    >
      {(handleConfigChange) => (
        <div className="space-y-4">

          {/* Background Opacity */}
          <div className="space-y-2">
            <label className="text-slate-300">
              Background Opacity: {settings.config.background?.opacity ?? 30}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={settings.config.background?.opacity ?? 30}
              onChange={(e) =>
                handleConfigChange({
                  background: { opacity: parseInt(e.target.value) },
                })
              }
              className="w-full"
            />
          </div>

          {/* Twitch channel name */}
          <div className="space-y-2">
            <label className="text-slate-300">
              Twitch channel :
            </label>
            <input
              type="text"
              value={settings.config.channel}
              onChange={(e) =>
                handleConfigChange({ channel: e.target.value})
              }
              className="w-full rounded border-gray-600 bg-gray-700 p-2 text-slate-300"
            />
            <p className="text-slate-400 text-sm">
              Name of Twitch channel
            </p>
          </div>
        </div>
      )}
    </BaseSettingsSection>
  );
};