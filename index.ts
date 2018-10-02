// export * from './rest/api/v2';
import {main} from './rest/api/v2';
// const application = require('@loopback/dist-util').loadDist(__dirname);

// module.exports = application;

// if (require.main === module) {
//   // Run the application
main().catch((err: any) => {
  console.error('Cannot start the application.', err);
  process.exit(1);
});
// }