<script>
  import { onMount, onDestroy } from 'svelte';
  import { isDark, toggleTheme } from './theme.js';
  import { muted, toggleMute } from './ambientSound.js';
  import { addToast } from './toastStore.js';

  export let isOpen = false;
  export let onClose = () => {};
  export let onOpenDrawer = () => {};
  export let onOpenOooGen = () => {};

  let query = '';
  let selectedIndex = 0;

  const ACTIONS = [
    {
      id: 'rsvp',
      category: 'Ticket & RSVP',
      icon: '🎫',
      title: 'Claim OOO Event Pass',
      subtitle: 'Open ticket drawer & RSVP flow',
      action: () => {
        onClose();
        onOpenDrawer();
      }
    },
    {
      id: 'ooo-gen',
      category: 'Tools',
      icon: '📧',
      title: 'Generate OOO Auto-Responder',
      subtitle: 'Create passive-aggressive email template',
      action: () => {
        onClose();
        onOpenOooGen();
      }
    },
    {
      id: 'theme',
      category: 'Controls',
      icon: '🌙',
      title: 'Toggle Dark / Light Theme',
      subtitle: 'Switch obsidian night mode & day mode',
      action: () => {
        toggleTheme();
        addToast({ title: 'Theme Toggled', description: 'Switched theme mode.' });
        onClose();
      }
    },
    {
      id: 'mute',
      category: 'Controls',
      icon: '🔊',
      title: 'Toggle Soundscape Mute',
      subtitle: 'Mute/Unmute beach waves & street ambience',
      action: () => {
        toggleMute();
        addToast({ title: 'Audio Toggled', description: 'Updated audio soundscape.' });
        onClose();
      }
    },
    {
      id: 'tickets-nav',
      category: 'Navigation',
      icon: '🎟️',
      title: 'Jump to Boarding Pass Section',
      subtitle: 'Scroll directly to tickets',
      action: () => {
        document.getElementById('tickets-section')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'schedule-nav',
      category: 'Navigation',
      icon: '📅',
      title: 'Jump to Event Schedule & FAQ',
      subtitle: 'View survival guide & timeline',
      action: () => {
        document.getElementById('schedule-section')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'memories-nav',
      category: 'Navigation',
      icon: '📸',
      title: 'Jump to Memories & Zine Wall',
      subtitle: 'View event polaroids & gallery',
      action: () => {
        document.getElementById('memories-section')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'what-we-are',
      category: 'Navigation',
      icon: '🔥',
      title: 'What We Are Manifesto',
      subtitle: 'Open manifesto & digital bonfire',
      action: () => {
        window.location.hash = '#/about';
        onClose();
      }
    }
  ];

  $: filteredActions = ACTIONS.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen = !isOpen;
      query = '';
    } else if (e.key === 'Escape' && isOpen) {
      onClose();
    } else if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % (filteredActions.length || 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredActions.length) % (filteredActions.length || 1);
      } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].action();
      }
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <div class="overlay" on:click={onClose} on:keydown={(e) => e.key === 'Escape' && onClose()} tabindex="-1" role="button">
    <div class="palette" on:click|stopPropagation role="dialog" aria-modal="true" tabindex="-1">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          placeholder="Type a command or search..."
          bind:value={query}
          autoFocus
        />
        <span class="esc-kbd">ESC</span>
      </div>

      <div class="action-list">
        {#if filteredActions.length === 0}
          <div class="empty-state">No matching commands found.</div>
        {:else}
          {#each filteredActions as action, idx}
            <div
              class="action-item"
              class:selected={idx === selectedIndex}
              on:click={action.action}
              on:mouseenter={() => (selectedIndex = idx)}
              role="button"
              tabindex="0"
            >
              <span class="action-icon">{action.icon}</span>
              <div class="action-text">
                <span class="action-title">{action.title}</span>
                <span class="action-sub">{action.subtitle}</span>
              </div>
              <span class="action-cat">{action.category}</span>
            </div>
          {/each}
        {/if}
      </div>

      <div class="palette-footer">
        <span>Use <kbd>&uarr;</kbd> <kbd>&darr;</kbd> to navigate</span>
        <span><kbd>Enter</kbd> to select</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: clamp(3rem, 12vh, 8rem);
    animation: fadeIn 0.15s ease-out;
  }

  .palette {
    width: min(92vw, 620px);
    background: var(--card-surface);
    color: var(--ink);
    border: 1px solid var(--border-soft-deep);
    border-radius: 16px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .search-wrap {
    display: flex;
    align-items: center;
    padding: 1rem 1.2rem;
    border-bottom: 1px solid var(--border-soft-deep);
    gap: 0.8rem;
  }

  .search-icon {
    font-size: 1.1rem;
    opacity: 0.7;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--ink);
    font-family: inherit;
    font-size: 1.1rem;
  }

  .esc-kbd {
    font-size: 0.7rem;
    font-weight: 700;
    background: var(--cream);
    border: 1px solid var(--border-soft-deep);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    opacity: 0.8;
  }

  .action-list {
    max-height: 340px;
    overflow-y: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    opacity: 0.7;
    font-size: 0.95rem;
  }

  .action-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    gap: 0.8rem;
    transition: background 0.15s ease;
  }

  .action-item.selected {
    background: var(--cream);
  }

  .action-icon {
    font-size: 1.3rem;
  }

  .action-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .action-title {
    font-weight: 600;
    font-size: 0.95rem;
  }

  .action-sub {
    font-size: 0.78rem;
    opacity: 0.7;
  }

  .action-cat {
    font-size: 0.7rem;
    font-weight: 700;
    opacity: 0.6;
    text-transform: uppercase;
  }

  .palette-footer {
    padding: 0.6rem 1.2rem;
    border-top: 1px solid var(--border-soft-deep);
    background: var(--bg);
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    opacity: 0.7;
  }

  kbd {
    background: var(--card-surface);
    border: 1px solid var(--border-soft-deep);
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    font-family: inherit;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
</style>
