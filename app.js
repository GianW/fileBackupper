const carlo = require('carlo');
const config = require('./app/config.js');

(async () => {
  // Launch the browser.
  const app = await carlo.launch();

  // Terminate Node.js process on app window closing.
  app.on('exit', () => process.exit());

  // Tell carlo where your web files are located.
  app.serveFolder(__dirname);

  // Funções para acessar pela app
  await app.exposeFunction('gravarConfig', data => {
    return config.set(data).then(result => result);
  });

  await app.exposeFunction('buscarConfig', _ => {
    return config.get().then(result => result);
  });

  // Navigate to the main page of your app.
  await app.load('public/index.html');
})();