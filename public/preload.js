/* eslint-disable no-loop-func */
/* eslint-disable no-lone-blocks */
const {
  contextBridge
} = require("electron");

(
  function () {
    let apiAddress = '';
    let express = require('express');

    let app = express();

    app.use(express.json());

    let server = app.listen(undefined, '127.0.0.1', function () {
      apiAddress = `http://${server.address().address + ':' + server.address().port}`;
      console.log('Backend listening ' + server.address().address + ':' + server.address().port);
    });

    module.exports = app;

    // Expose protected methods that allow the renderer process to use
    // the ipcRenderer without exposing the entire object
    contextBridge.exposeInMainWorld("api", {
      url: () => apiAddress,
    });
  }
)();