class TabsComponent {
  constructor(elem) {
    this.elem = elem;
    this.options = this.elem.dataset;

    this.addEventListeners();
  }

  addEventListeners() {
    Array.from(this.elem.querySelectorAll('li.tabs-component-tab')).forEach((item) => {
      item.addEventListener('click', this.selectTab.bind(this));
    });
  }

  selectTab(event) {
    if (!this.options['useUrlFragment']) {
      event.preventDefault();
    }
    const selectedTab = event.currentTarget;

    this.hideTabs();

    selectedTab.classList.add('is-active');
    selectedTab.querySelector('.tabs-component-tab-a').setAttribute('aria-selected', true);

    const panelId = selectedTab.querySelector('.tabs-component-tab-a').getAttribute('aria-controls');
    const selectedPanel = this.elem.querySelector(`.tabs-component-panel[id="${panelId}"]`);

    selectedPanel.classList.remove('hidden');
    selectedPanel.setAttribute('aria-hidden', false);
  }

  hideTabs() {
    this.elem.querySelectorAll('.tabs-component-tab').forEach((item) => {
      item.classList.remove('is-active');
      item.querySelector('.tabs-component-tab-a').setAttribute('aria-selected', false);
    });

    this.elem.querySelectorAll('.tabs-component-panel').forEach((item) => {
      item.classList.add('hidden');
      item.setAttribute('aria-hidden', true);
    });
  }
}

export default class Tabs {
  constructor() {
    document.querySelectorAll('.tabs-component').forEach((elem) => {
      new TabsComponent(elem);
    });
  }
}
