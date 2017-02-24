module.exports = function () {
    this.crawl = crawl
};

/** @param {WebDriver} webdriver */
function CrawlContext(webdriver, config) {
    this.user = config.user;
    this.password = config.password;
    this.webdriver = webdriver;
}

CrawlContext.prototype.login = function() {
    console.log("Logging in");
    this.webdriver.get("Https://facebook.com");

    this.webdriver.findElement({"id": "email"}).sendKeys(this.user);
    this.webdriver.findElement({"id": "pass"}).sendKeys(this.password);
    return this.webdriver.findElement({"id": "loginbutton"}).click();
};

CrawlContext.prototype.crawl = function () {
    console.log("Crawling....");


    /*
    1. select crawl strategy
    2. initialize strategy
    3. run crawl method
     */
};

CrawlContext.prototype.finalize = function () {
    console.log("Finalizing crawl and closing browser");
    this.webdriver.close()
};

var crawl = function(webdriver, config) {
    var crawlContext = new CrawlContext(webdriver, config)
    crawlContext.login().then(function () {

        crawlContext.webdriver.getCurrentUrl().then(function (url) {
            if (url.toString().includes("login")) {
                console.log("Failed logging in, please fix your credentials");
                return false;
            }
            return true;
        }).then(function (loginSuccess) {
            if (loginSuccess) {
                crawlContext.crawl();
            }
            crawlContext.finalize();
        });
    });

    return crawlContext;
};
