<script>
  let activeTab = 'afternoon';
  let openAccordion = 'faq-1';

  const SCHEDULE = {
    morning: [
      { time: '11:00 AM', title: 'Arrival & Laptop Lockup', desc: 'Hand over your work laptop (optional, but highly encouraged) & claim your offline badge.' },
      { time: '11:45 AM', title: 'Ignored Email Ceremony', desc: 'Symbolic mass deletion of unread Slack notifications and out-of-office setup.' }
    ],
    afternoon: [
      { time: '01:30 PM', title: 'Danfo Rally to Tarkwa Bay', desc: 'Scenic bus & boat transport with retro Afrobeats & local Lagos snacks.' },
      { time: '03:30 PM', title: 'Rubik Cube & Chaos Battle', desc: 'Solve the digital cube live or relax on the sand with zero Wi-Fi.' }
    ],
    night: [
      { time: '06:30 PM', title: 'Sunset Grass Touching', desc: 'Gather around the ocean shore for live ambient soundscapes & acoustic jam.' },
      { time: '08:00 PM', title: 'Digital Bonfire & Zine Swap', desc: 'ASCII fire illumination, storytelling, and zine sticker distribution.' }
    ]
  };

  const FAQS = [
    {
      id: 'faq-1',
      question: 'What if my boss Slack calls me during the event?',
      answer: 'Our official policy: pretend your phone fell into Tarkwa Bay. Or send them our passive-aggressive OOO email generator output!'
    },
    {
      id: 'faq-2',
      question: 'Is Wi-Fi available at the venue?',
      answer: 'Wi-Fi is intentionally disabled. We offer 100% pure high-speed grass touching and wave listening instead.'
    },
    {
      id: 'faq-3',
      question: 'What should I wear or bring?',
      answer: 'Wear comfortable beachwear or casual clothes. Bring sunglasses, good vibes, and your phone set strictly to Do Not Disturb.'
    },
    {
      id: 'faq-4',
      question: 'How do I return home after the bonfire?',
      answer: 'Chartered boat and Danfo shuttles run continuously back to the mainland from 8:30 PM until late.'
    }
  ];

  function toggleAccordion(id) {
    openAccordion = openAccordion === id ? null : id;
  }
</script>

<section id="current-event" class="schedule-wrap">
  <div class="header-center">
    <span class="pill-tag">PROGRAM TIMELINE</span>
    <h2 class="title">Event Schedule & Survival FAQ</h2>
    <p class="subtitle">Plan your escape from the daily grind and master the art of total disconnection.</p>
  </div>

  <div class="tabs-container">
    <div class="tabs-list" role="tablist">
      <button
        class="tab-btn"
        class:active={activeTab === 'morning'}
        on:click={() => (activeTab = 'morning')}
        role="tab"
        aria-selected={activeTab === 'morning'}
      >
        🌅 Morning Escape
      </button>
      <button
        class="tab-btn"
        class:active={activeTab === 'afternoon'}
        on:click={() => (activeTab = 'afternoon')}
        role="tab"
        aria-selected={activeTab === 'afternoon'}
      >
        🚌 Afternoon Rally
      </button>
      <button
        class="tab-btn"
        class:active={activeTab === 'night'}
        on:click={() => (activeTab = 'night')}
        role="tab"
        aria-selected={activeTab === 'night'}
      >
        🔥 Night Bonfire
      </button>
    </div>

    <div class="tab-content">
      <div class="timeline">
        {#each SCHEDULE[activeTab] as item}
          <div class="timeline-item">
            <span class="item-time">{item.time}</span>
            <div class="item-body">
              <h3 class="item-title">{item.title}</h3>
              <p class="item-desc">{item.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="faq-container">
    <h3 class="faq-title">Survival FAQ</h3>
    <div class="accordion">
      {#each FAQS as faq}
        <div class="accordion-item" class:open={openAccordion === faq.id}>
          <button
            class="accordion-trigger"
            on:click={() => toggleAccordion(faq.id)}
            aria-expanded={openAccordion === faq.id}
          >
            <span>{faq.question}</span>
            <span class="chevron">{openAccordion === faq.id ? '−' : '+'}</span>
          </button>
          {#if openAccordion === faq.id}
            <div class="accordion-content">
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .schedule-wrap {
    width: 100%;
    max-width: 1000px;
    margin: 4rem auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .header-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  .pill-tag {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: var(--blue, #00bfff);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin: 0;
  }

  .subtitle {
    font-size: 1.05rem;
    margin: 0;
    opacity: 0.8;
    max-width: 55ch;
  }

  .tabs-container {
    background: var(--card-surface);
    border: 1px solid var(--border-soft-deep);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .tabs-list {
    display: flex;
    gap: 0.6rem;
    background: var(--bg);
    padding: 0.4rem;
    border-radius: 10px;
    border: 1px solid var(--border-soft-deep);
    overflow-x: auto;
  }

  .tab-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    color: var(--ink);
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease, transform 0.15s ease;
  }

  .tab-btn.active {
    background: var(--card-surface);
    color: var(--blue, #00bfff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .timeline-item {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 1rem;
    background: var(--bg);
    border-radius: 12px;
    border-left: 4px solid var(--blue, #00bfff);
  }

  .item-time {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--pink-deep, #fc9ce0);
    white-space: nowrap;
  }

  .item-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .item-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .item-desc {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .faq-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .accordion {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .accordion-item {
    background: var(--card-surface);
    border: 1px solid var(--border-soft-deep);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .accordion-item.open {
    border-color: var(--blue, #00bfff);
  }

  .accordion-trigger {
    width: 100%;
    padding: 1.2rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--ink);
    font-family: inherit;
    font-size: 1.05rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    text-align: left;
  }

  .chevron {
    font-size: 1.4rem;
    color: var(--blue, #00bfff);
  }

  .accordion-content {
    padding: 0 1.5rem 1.2rem;
    font-size: 0.95rem;
    opacity: 0.85;
    line-height: 1.5;
  }

  .accordion-content p {
    margin: 0;
  }
</style>
