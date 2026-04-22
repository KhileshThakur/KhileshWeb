import { useEffect, useRef } from 'react';

/**
 * useSound — reusable audio hook with automatic browser unlock
 *
 * Browsers block audio until the user interacts with the page.
 * This hook unlocks the audio context on the earliest possible
 * interaction: pointerdown, pointerover, keydown, or touchstart —
 * so even a hover on page load will work after the very first
 * pointer enters the window.
 *
 * @param {string} src    - Path to the audio file e.g. "/sound.mp3"
 * @param {number} volume - Volume between 0 and 1 (default: 0.15)
 * @returns {{ play: () => void }}
 *
 * Usage:
 *   const { play } = useSound("/hover.mp3");
 *   const { play: playClick } = useSound("/click.mp3", 0.3);
 *
 *   <div onPointerEnter={play} onClick={playClick} />
 */

// Module-level flag — only one unlock needed across all useSound instances
let unlocked = false;

const unlock = () => {
  if (unlocked) return;
  // Play a silent audio to satisfy the browser's autoplay policy
  const a = new Audio();
  a.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  a.volume = 0;
  a.play()
    .then(() => { unlocked = true; })
    .catch(() => {});
};

// Attach unlock to the earliest possible interactions, at the document level.
// pointerover fires on first mouse-enter into the window — earlier than pointerdown.
['pointerover', 'pointerdown', 'keydown', 'touchstart'].forEach(event => {
  document.addEventListener(event, unlock, { once: true, passive: true });
});

const useSound = (src, volume = 0.15) => {
  // Preload so the first play isn't delayed
  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'auto';
  }, [src]);

  const play = () => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  return { play };
};

export default useSound;