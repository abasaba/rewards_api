var app = require('../app');
var config = require('config');

var appConfig = config.get('app');
app.set('port', appConfig.appPort || 3000);
 
var server = app.listen(app.get('port'), function() {
  console.log("I'm listening on port " + server.address().port);
});