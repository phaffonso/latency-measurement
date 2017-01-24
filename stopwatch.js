var stats = require('simple-statistics');

class Stopwatch{
  constructor(){
    this.last = null;
    this.records = [];
  }

  tic(){
    var time = new Date();
    if(this.last != null){
      this.records.push(time.getTime() - this.last.getTime());
    }
    this.last = time;
  }

  stats(){
    return {
      measurements: this.records.length,
      sd: stats.standardDeviation(this.records),
      mean: stats.mean(this.records),
      max: stats.max(this.records),
      min: stats.min(this.records)
    }
  }
}

module.exports = Stopwatch;
