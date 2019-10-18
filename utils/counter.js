module.exports.counter = 0;

exports.resetCounter = function() {
    this.counter = 0;
}

exports.incrementCounter = function() {
    this.counter++;
}

exports.rateLimit = function() {
    return this.counter > 9 ? true : false;
}
