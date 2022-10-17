export default class HomeTabs {
  constructor() {
    this.elem = document.querySelector('.k-tabs');

    if (this.elem !== null) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    Array.from(this.elem.querySelectorAll('li.tab-item')).forEach((item) => {
      item.addEventListener('click', this.selectTab.bind(this));
    });
  }

  selectTab(event) {
    const selectedTab = event.currentTarget;

    Array.from(this.elem.querySelectorAll('.tab-item')).forEach((item) => {
      item.classList.remove('active');
    });

    selectedTab.classList.add('active');

    Array.from(this.elem.querySelectorAll('.tab-container')).forEach((item) => {
      item.classList.add('hidden');
    });

    const panelId = selectedTab.getAttribute('aria-controls');
    this.elem.querySelector(`.tab-container[id=${panelId}]`)
      .classList.remove('hidden');
  }
}
