/**
 * Twitch Chat overlay
 * Displays messages from Twitch Chat
 */

import {
  useDashboard,
} from '@irdashies/context';
import { useTwitchChatSettings } from './hooks/useTwitchChatSettings';
import { useTwitchChat } from "./hooks/useTwitchChat";


export interface TwitchChatDisplayProps {
  background: { opacity: number };
}

export const TwitchChat = ({
  background = { opacity: 85 },
}: TwitchChatDisplayProps) => {
  const { isDemoMode } = useDashboard();
  const settings = useTwitchChatSettings();

  const messages = useTwitchChat(settings?.config.channel);
  // If we don't have dashboard settings, hide
  if (!settings) return null;
  if (!settings.enabled) return null;

  return (
    <div
      className={`w-full h-full flex flex-col justify-end bg-slate-800/[var(--bg-opacity)] rounded-sm px-3 py-2 text-white align-bottom border-0 transition-all duration-300`}
      style={
        {
          '--bg-opacity': `${background.opacity}%`,
        } as React.CSSProperties
      }
    >

      {/*there will be message from chat*/}
      {messages.map((m) => (
        <div key={m.id} style={{ marginBottom: 8 }}>
          <strong style={{ color: "#a970ff" }}>{m.user}</strong>: {m.text}
        </div>
      ))}
    </div>
  )
};