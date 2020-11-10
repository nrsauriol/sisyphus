module.exports = {
  "src_folders": ["/action/tests"],
  "page_objects_path": "",
  "globals_path": "",

  //"webdriver": {
  //    "start_process": true,
  //    "server_path": "./node_modules/chromedriver/bin/chromedriver",
  //    "port": 9515
  //},

  "selenium": {
      "start_process": false,
      "host" : process.env.SELENIUM_REMOTE_HOST,
      "port" : process.env.SELENIUM_REMOTE_PORT,
      "cli_args" : {
        "webdriver.chrome.driver" : "./bin/chromedriver"
      }
  },

  "test_settings": {
      "default": {
        "screenshots": {
          "enabled": true,
          "path": '/action/tests_output/screenshots',
          },
          "desiredCapabilities": {
              "browserName": "chrome"
          }
      }
  },
  "globals": {
    "waitForConditionTimeout": 15000,
    "test_settings":{
    "videos": {
      "fileName": "example", // Required field
      "nameAfterTest": true,
      "format": "mp4",
      "enabled": true,
      "deleteOnSuccess": false,
      "path": "/action/tests_output/screenshots",
      "resolution": "1366x768",
      "fps": 7,
      "input": "",
      "videoCodec": "libx264",
      }
    }
  }
}

