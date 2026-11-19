'use strict';
(() => {
  const root = document.getElementById('dhuneri-farmers');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  const controls = root.querySelector('.tab-controls');
  if (!controls) return;
  const tabs = [...controls.querySelectorAll('button')];
  const panels = [...root.querySelectorAll('.question-panel')];
  controls.hidden = false;
  controls.setAttribute('role', 'tablist');
  controls.setAttribute('aria-label', 'Research question categories');
  root.querySelector('.research-interface').classList.add('tabs-ready');
  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `dhf-panel-${tab.dataset.tab}`);
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', panel.id.replace('panel-', 'tab-'));
    panel.tabIndex = 0;
  });
  const activate = index => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        e.preventDefault();
        activate(next);
        tabs[next].focus();
      }
    });
  });
  activate(0);
})();
