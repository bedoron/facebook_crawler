fs = require('fs')
path = require('path')

var Runner = (function() {
    var configuration = null
    var chromedriver = require('chromedriver') // So selenium-webdriver will recognize the chromedriver
    var selenium = require('selenium-webdriver')
    var driver = new selenium.Builder().forBrowser('chrome').build()

    var appRunner = function() {
        console.log("Running in node.js version", process.version, "from", __dirname)
        
        var configuration_data = fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf8')
        
        console.log("Parsing configuration file")
        configuration = JSON.parse(configuration_data)
        console.log("Loaded configuration:\n", configuration)

        driver.get("Https://google.com")
    }

    return {
        run: appRunner,
        configuration: configuration
    }
}());

Runner.run()
