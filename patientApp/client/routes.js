FlowRouter.route('/patients', {
  name: 'patients',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patients'});
  }
});
FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'patients'});
  }
});

FlowRouter.route('/reports', {
  name: 'reports',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'reports'});
  }
});
