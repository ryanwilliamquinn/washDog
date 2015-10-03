/**
 * Before running any API tests, get Sails running.
 *
 * NOTICE:
 * This exposes the `sails` global.
 *
 * @framework mocha
 */

before(function (done) {
  require('sails').lift({
    host: 'localhost',
    port: 1440,
    hooks: {
      i18n: false,
      grunt: false
    },
    bootstrap: require("../fixtures/bootstrap"),
  }, done);
});
