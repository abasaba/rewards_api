var app = require('../app');
var config = require('config');

var appConfig = config.get('app');
app.set('port', process.env.PORT || appConfig.appPort);
 
var server = app.listen(app.get('port'), function() {
  console.log("I'm listening on port " + server.address().port);
});