import * as Tooltip from '@radix-ui/react-tooltip';
import { classNames } from '~/utils/classNames';
import type { TabVisibilityConfig } from '~/components/@settings/core/types';
import { TAB_LABELS, TAB_ICONS } from '~/components/@settings/core/constants';
import { GlowingEffect } from '~/components/ui/GlowingEffect';

interface TabTileProps {
  tab: TabVisibilityConfig;
  onClick?: () => void;
  isActive?: boolean;
  hasUpdate?: boolean;
  statusMessage?: string;
  description?: string;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const TabTile: React.FC<TabTileProps> = ({
  tab,
  onClick,
  isActive,
  hasUpdate,
  statusMessage,
  description,
  isLoading,
  className,
  children,
}: TabTileProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className={classNames('min-h-[120px] sm:min-h-[160px] list-none', className || '')}>
            <div className="relative h-full rounded-xl border border-bolt-elements-borderColor p-0.5 overflow-hidden group">
              <div
                onClick={onClick}
                className={classNames(
                  'relative flex flex-col items-center justify-center h-full p-3 sm:p-4 rounded-lg',
                  'bg-bolt-elements-bg-depth-2/40 backdrop-blur-sm',
                  'group cursor-pointer',
                  'hover:bg-elite-accent/5 transition-all duration-200',
                  isActive ? 'bg-elite-accent/10 border-elite-accent/20' : '',
                  isLoading ? 'cursor-wait opacity-70 pointer-events-none' : '',
                )}
              >
                {/* Icon - Scaled for Mobile */}
                <div
                  className={classNames(
                    'relative',
                    'w-10 h-10 sm:w-14 h-14',
                    'flex items-center justify-center',
                    'rounded-lg sm:rounded-xl',
                    'bg-bolt-elements-bg-depth-3 border border-bolt-elements-borderColor',
                    'group-hover:border-elite-accent/30 transition-all duration-200',
                    isActive ? 'border-elite-accent ring-1 ring-elite-accent/20' : '',
                  )}
                >
                  {(() => {
                    const IconComponent = TAB_ICONS[tab.id];
                    return (
                      <IconComponent
                        className={classNames(
                          'w-5 h-5 sm:w-8 h-8',
                          'text-bolt-elements-textSecondary',
                          'group-hover:text-elite-accent transition-colors',
                          isActive ? 'text-elite-accent' : '',
                        )}
                      />
                    );
                  })()}
                </div>

                {/* Label - Compact */}
                <div className="flex flex-col items-center mt-2 sm:mt-4 w-full">
                  <h3
                    className={classNames(
                      'text-xs sm:text-[15px] font-bold tracking-tight mb-0.5 sm:mb-1',
                      'text-bolt-elements-textPrimary uppercase',
                      isActive ? 'text-elite-accent' : '',
                    )}
                  >
                    {TAB_LABELS[tab.id]}
                  </h3>
                  {description && (
                    <p
                      className={classNames(
                        'hidden sm:block text-[11px] leading-relaxed',
                        'text-bolt-elements-textSecondary',
                        'max-w-[90%] text-center',
                      )}
                    >
                      {description}
                    </p>
                  )}
                </div>

                {/* Update Indicator with Tooltip */}
                {hasUpdate && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className={classNames(
                          'px-3 py-1.5 rounded-lg',
                          'bg-[#18181B] text-white',
                          'text-sm font-medium',
                          'select-none',
                          'z-[100]',
                        )}
                        side="top"
                        sideOffset={5}
                      >
                        {statusMessage}
                        <Tooltip.Arrow className="fill-[#18181B]" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </>
                )}

                {/* Children (e.g. Beta Label) */}
                {children}
              </div>
            </div>
          </div>
        </Tooltip.Trigger>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
