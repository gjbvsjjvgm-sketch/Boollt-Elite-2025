import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { classNames } from '~/utils/classNames';
import { Switch } from '~/components/ui/Switch';
import type { UserProfile } from '~/components/@settings/core/types';
import { isMac } from '~/utils/os';

// Helper to get modifier key symbols/text
const getModifierSymbol = (modifier: string): string => {
  switch (modifier) {
    case 'meta':
      return isMac ? '⌘' : 'Win';
    case 'alt':
      return isMac ? '⌥' : 'Alt';
    case 'shift':
      return '⇧';
    default:
      return modifier;
  }
};

export default function SettingsTab() {
  const [currentTimezone, setCurrentTimezone] = useState('');
  const [settings, setSettings] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bolt_user_profile');
    return saved
      ? JSON.parse(saved)
      : {
          notifications: true,
          language: 'en',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
  });

  useEffect(() => {
    setCurrentTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Save settings automatically when they change
  useEffect(() => {
    try {
      // Get existing profile data
      const existingProfile = JSON.parse(localStorage.getItem('bolt_user_profile') || '{}');

      // Merge with new settings
      const updatedProfile = {
        ...existingProfile,
        notifications: settings.notifications,
        language: settings.language,
        timezone: settings.timezone,
      };

      localStorage.setItem('bolt_user_profile', JSON.stringify(updatedProfile));
      toast.success('Settings updated');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to update settings');
    }
  }, [settings]);

  return (
    <div className="space-y-3 sm:space-y-4 max-w-full overflow-x-hidden">
      {/* Language & Notifications */}
      <motion.div
        className="bg-bolt-elements-bg-depth-2 rounded-xl border border-bolt-elements-borderColor p-3 sm:p-4 space-y-3 sm:space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <div className="i-ph:palette-fill w-4 h-4 text-elite-accent" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-bolt-elements-textPrimary uppercase">Elite Preferences</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <div className="i-ph:translate-fill w-3.5 h-3.5 text-bolt-elements-textSecondary" />
              <label className="block text-xs sm:text-sm font-medium text-bolt-elements-textSecondary">System Language</label>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
              className={classNames(
                'w-full px-3 py-2 rounded-lg text-xs sm:text-sm',
                'bg-bolt-elements-bg-depth-3',
                'border border-bolt-elements-borderColor',
                'text-bolt-elements-textPrimary',
                'focus:outline-none focus:ring-1 focus:ring-elite-accent/50',
                'transition-all duration-200',
              )}
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <div className="flex flex-col justify-end pb-1">
            <div className="flex items-center justify-between p-2 rounded-lg bg-bolt-elements-bg-depth-3 border border-bolt-elements-borderColor">
              <div className="flex items-center gap-2">
                <div className="i-ph:bell-fill w-3.5 h-3.5 text-bolt-elements-textSecondary" />
                <span className="text-xs sm:text-sm text-bolt-elements-textPrimary font-medium">Real-time Alerts</span>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => {
                  setSettings((prev) => ({ ...prev, notifications: checked }));
                  toast.success(`Elite Alerts ${checked ? 'Active' : 'Muted'}`, { theme: 'dark' });
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timezone & Core Config */}
      <motion.div
        className="bg-bolt-elements-bg-depth-2 rounded-xl border border-bolt-elements-borderColor p-3 sm:p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <div className="i-ph:clock-fill w-4 h-4 text-elite-accent" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-bolt-elements-textPrimary uppercase">Context Settings</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <div className="i-ph:globe-fill w-3.5 h-3.5 text-bolt-elements-textSecondary" />
            <label className="block text-xs sm:text-sm font-medium text-bolt-elements-textSecondary">Execution Timezone</label>
          </div>
          <div className="relative group">
            <select
              value={settings.timezone}
              onChange={(e) => setSettings((prev) => ({ ...prev, timezone: e.target.value }))}
              className={classNames(
                'w-full px-3 py-2 rounded-lg text-xs sm:text-sm appearance-none',
                'bg-bolt-elements-bg-depth-3',
                'border border-bolt-elements-borderColor',
                'text-bolt-elements-textPrimary',
                'group-hover:border-elite-accent/30 transition-colors',
              )}
            >
              <option value={currentTimezone}>{currentTimezone}</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-bolt-elements-textSecondary">
              <div className="i-ph:caret-down w-3 h-3" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pro Keyboard Shortcuts */}
      <motion.div
        className="bg-bolt-elements-bg-depth-2 rounded-xl border border-bolt-elements-borderColor p-3 sm:p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <div className="i-ph:keyboard-fill w-4 h-4 text-elite-accent" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-bolt-elements-textPrimary uppercase">Elite Orchestration</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'Toggle Master Theme', desc: 'Switch Dark/Light', keys: ['meta', 'alt', 'shift', 'D'] },
            { label: 'Quick Deploy', desc: 'Execute build cycle', keys: ['meta', 'K'] },
          ].map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-bolt-elements-bg-depth-3/50 hover:bg-bolt-elements-bg-depth-3 transition-colors">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-bolt-elements-textPrimary">{shortcut.label}</span>
                <span className="text-[10px] sm:text-xs text-bolt-elements-textSecondary">{shortcut.desc}</span>
              </div>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((k) => (
                  <kbd key={k} className="px-1.5 py-0.5 text-[10px] font-bold text-elite-accent bg-bolt-elements-bg-depth-1 border border-bolt-elements-borderColor rounded shadow-sm">
                    {getModifierSymbol(k).toUpperCase()}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
