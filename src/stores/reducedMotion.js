import { writable } from "svelte/store";

function createReducedMotionStore() {
    const { subscribe, set } = writable(false);

    // Check if running in a browser
    if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        set(prefersReducedMotion.matches);  // Set initial value

        // Update preference on change
        const updatePreference = (event) => set(event.matches);
        prefersReducedMotion.addEventListener("change", updatePreference);

        // Clean up the event listener on unsubscribe
        return {
            subscribe,
            unsubscribe: () => prefersReducedMotion.removeEventListener("change", updatePreference),
        };
    }

    // Return store for SSR compatibility (doesn't set `window`-based value)
    return { subscribe };
}

export const reducedMotion = createReducedMotionStore();