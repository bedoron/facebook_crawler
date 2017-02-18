fs = require('fs')
path = require('path')

var Runner = (function() {
    var configuration = null;
    var chromedriver = require('chromedriver'); // So selenium-webdriver will recognize the chromedriver
    var selenium = require('selenium-webdriver');
    var driver = null;

    var createDriver = function() {
        return new selenium.Builder().forBrowser('chrome').build() // Browser is created here when we evaluate this part
    }

    var getDriver = function() {
        if (driver) {
            return driver
        }
        driver = createDriver()
        return driver
    }

    var terminationHandler = function (options, err) {
        if (options.exit) {
            console.log("App aborted by user")
        }

        if (driver) {
            console.log("Shutting down browser")
            driver.quit()
            driver = null
        }

        if (err) {
            console.log(err)
        }
        
        process.exit()
    }

    var setupTerminationHandler = function() {
        process.stdin.resume()

        process.on('exit', terminationHandler.bind(null, {cleanup: true})) // App is closing
        process.on('SIGINT', terminationHandler.bind(null, {exit: true})) // CTRL+C
        process.on('uncaughtException', terminationHandler.bind(null, {exit: true}))
    }

    var appRunner = function() {
        console.log("Running in node.js version", process.version, "from", __dirname);
        console.log("Registering termination methods");
        setupTerminationHandler();
        
        var configuration_data = fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf8')
        
        console.log("Parsing configuration file")
        configuration = JSON.parse(configuration_data)
        
        driver = getDriver()
        driver.get("Https://google.com")
    }

    return {
        run: appRunner,
        configuration: configuration
    }
}());

Runner.run()
