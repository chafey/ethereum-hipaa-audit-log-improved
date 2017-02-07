Template.navbar.helpers({
  activeListClass(page) {
    const active = ActiveRoute.name(page);
    return active && 'active';
  }
});
