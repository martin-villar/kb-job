module.exports.counter = 0;

exports.resetCounter = function() {
    console.log('reseting counter')
    this.counter = 0;
    console.log(this.counter);
}

exports.incrementCounter = function() {
    this.counter++;
    console.log(this.counter);
}

exports.rateLimit = function() {
    return this.counter > 10 ? true : false;
}
