Package.describe({
  name: 'marvin:imsi-catcher-catcher-admin',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "meteor-node-stubs": "0.2.0",
  "react": "15.0.2",
  "react-addons-pure-render-mixin": "15.0.2",
  "react-dom": "15.0.2",
  "react-router": "2.4.0"
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');

  api.mainModule('client/main.js', 'client');
});
