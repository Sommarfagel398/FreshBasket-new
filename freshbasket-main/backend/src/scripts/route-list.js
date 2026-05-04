const listEndpoints = require('express-list-endpoints');

// import your app (IMPORTANT: export app without calling listen)
const app = require('../app'); // adjust path if needed

const routes = listEndpoints(app);

console.log('\n=== ROUTE LIST ===\n');

routes.forEach(route => {
  const methods = route.methods.join(', ').padEnd(10);
  console.log(`${methods} ${route.path}`);
});

console.log('\nTotal routes:', routes.length, '\n');