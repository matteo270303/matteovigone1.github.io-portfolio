'use client';

import { useEffect, useRef } from 'react';

export interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  /** Last frame's interact key state — used to detect "just pressed" edges. */
  interactJustPressed: boolean;
}

const KEY_MAP: Record<string, keyof KeyState> = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  Space: 'interact',
  KeyE: 'interact',
  Enter: 'interact',
};

/**
 * Tracks pressed keys via a ref (no re-renders on every keystroke).
 * Use the returned ref inside `useFrame` to read current state cheaply.
 */
export function useKeyboard(
  onShortcut?: (digit: number) => void,
): React.MutableRefObject<KeyState> {
  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
    interactJustPressed: false,
  });

  useEffect(() => {
    function setKey(code: string, value: boolean) {
      const k = KEY_MAP[code];
      if (!k) return;
      if (k === 'interact' && value && !keys.current.interact) {
        keys.current.interactJustPressed = true;
      }
      keys.current[k] = value;
    }

    function down(e: KeyboardEvent) {
      // Numeric shortcuts (1..8)
      if (e.code.startsWith('Digit')) {
        const d = Number(e.code.replace('Digit', ''));
        if (d >= 1 && d <= 8) {
          onShortcut?.(d);
          return;
        }
      }
      setKey(e.code, true);
    }
    function up(e: KeyboardEvent) {
      setKey(e.code, false);
    }
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [onShortcut]);

  return keys;
}
