const Service = require('node-windows');

const srv = new Service({
  name: 'NaTours',
  description: 'NodeJSTourService',
  script: 'D:\\NodeJS\\Node.js-Express-MongoDB-More\\public\\js\\index.js'
});

srv.on('install', function() {
  srv.start();
});

srv.install();
