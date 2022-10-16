export default class Sidebar {
  constructor() {
    this.elem = document.getElementById('sidebar');

    if (this.elem !== null) {

      this.groups = Array.from(
        this.elem.querySelectorAll('.sidebar-links li .sidebar-group')
      );

      this.addEventListener();
      this.expandActiveGroup();
      this.setActiveLink();
    }
  }

  addEventListener() {
    this.elem.addEventListener('click', (event) => {
      if (!event.target.classList.contains('sidebar-link')) {
        let group = event.target.closest('.sidebar-group');
        let hidden = group.querySelector('.sidebar-group-items')
          .classList.contains('hidden');

        this.groups.forEach((group) => this.toggleGroup(group, true));
        this.toggleGroup(group, !hidden);

        if (group.parentNode.closest('.sidebar-group') !== null){
          this.toggleGroup(group.parentNode.closest('.sidebar-group'), false);
        }
      } else {
        this.elem.querySelector('.sidebar-sub-header .sidebar-link.active').classList.remove('active');
        event.target.classList.add('active');
      }
    });
  }

  toggleGroup(group, hide) {
    let items = group.querySelector('.sidebar-group-items');
    let arrow = group.querySelector('.arrow');

    arrow
      .classList.toggle('down', !hide);
    arrow
      .classList.toggle('right', hide);

    items.classList.toggle('hidden', hide);
  }

  expandActiveGroup() {
    let currentPath = window.location.pathname;
    let activeGroups = this.groups.filter((group) => {
      return group.querySelector(`a[href^='${currentPath}']`) !== null
    });

    if (activeGroups.length !== 0 ) {
      Array.from(activeGroups).forEach((group) => {
        this.toggleGroup(group);
      });
    }
    activeGroups.at(-1).scrollIntoView({ behavior: "smooth" });
  }

  setActiveLink() {
    let currentPath = window.location.pathname;
    if (window.location.hash) {
      currentPath += window.location.hash;
    }
    this.elem
      .querySelector(`a[href^='${currentPath}']`)
      .classList
      .add('active');
  }
}
