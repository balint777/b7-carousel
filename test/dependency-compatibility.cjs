const assert = require('assert').strict;
const http = require('http');
const path = require('path');
const postcss = require('postcss');
const socketIO = require('socket.io');
const connect = require('socket.io-client');

// These older tools use APIs affected by the security dependency overrides.
async function checkStyles() {
  const prefixed = await postcss([
    require('autoprefixer')({ overrideBrowserslist: ['Safari 8'] }),
    require('postcss-flexbugs-fixes')(),
  ]).process('.button { display: flex; user-select: none; }', { from: undefined });
  assert(prefixed.css.includes('-webkit-user-select'));

  const modules = await postcss([
    require('postcss-modules-values')(),
    require('postcss-modules-local-by-default')(),
    require('postcss-modules-extract-imports')(),
    require('postcss-modules-scope')(),
  ]).process('.button { color: red; }', { from: 'fixture.css' });
  assert(modules.css.includes(':export'));
  assert(modules.css.includes('button:'));

  const html = '<dom-module id="fixture-element"><template>' +
    '<style>:host { background-image: url(./fixture.svg); }</style>' +
    '<div>Fixture</div></template></dom-module>';
  const output = await new Promise((resolve, reject) => {
    require('polymer-webpack-loader').call({
      resourcePath: path.join(__dirname, 'fixture.html'),
      query: {},
      async() {
        return (error, source) => error ? reject(error) : resolve(source);
      },
    }, html);
  });
  assert(output.includes('fixture.svg'));
  assert(!output.includes('__POLYMER_WEBPACK_LOADER_URL_'));
  console.log('Legacy CSS plugins and Polymer loader passed with patched PostCSS.');
}

async function checkSocketIO() {
  const server = http.createServer();
  const io = socketIO(server, { serveClient: false });
  io.on('connection', socket => {
    socket.on('dependency-check', (data, acknowledge) => {
      acknowledge({ text: data.text, bytes: data.bytes });
    });
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  try {
    for (const transport of ['polling', 'websocket']) {
      await new Promise((resolve, reject) => {
        const client = connect(`http://127.0.0.1:${server.address().port}`, {
          transports: [transport], forceNew: true, reconnection: false,
        });
        const timer = setTimeout(() => finish(new Error(`${transport} timed out`)), 5000);
        function finish(error) {
          clearTimeout(timer);
          client.disconnect();
          if (error) reject(error);
          else resolve();
        }
        client.on('connect_error', finish);
        client.on('connect', () => {
          client.emit('dependency-check', {
            text: 'round trip', bytes: Buffer.from([0, 1, 127, 255]),
          }, response => {
            try {
              assert.equal(response.text, 'round trip');
              assert.deepEqual(response.bytes, Buffer.from([0, 1, 127, 255]));
              finish();
            } catch (error) {
              finish(error);
            }
          });
        });
      });
      console.log(`Socket.IO text and binary round trips passed over ${transport}.`);
    }
  } finally {
    await new Promise(resolve => io.close(resolve));
  }
}

const deadline = setTimeout(() => {
  console.error('Dependency compatibility checks exceeded 20 seconds.');
  process.exit(1);
}, 20000);

checkStyles().then(checkSocketIO).then(() => {
  clearTimeout(deadline);
}, error => {
  clearTimeout(deadline);
  console.error(error);
  process.exitCode = 1;
});
