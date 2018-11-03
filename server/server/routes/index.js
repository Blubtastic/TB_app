const tb_appRoutes = require('./tb_app_routes');

module.exports = function(app, db) {
  tb_appRoutes(app, db);

}
