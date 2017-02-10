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
FlowRouter.route('/register', {
  name: 'register',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'register'});
  }
});
FlowRouter.route('/addPatient', {
  name: 'addPatient',
  action(params, queryParams) {
    BlazeLayout.render('main', {main: 'addPatient'});
  }
});
