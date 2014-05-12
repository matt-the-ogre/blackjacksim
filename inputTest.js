  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var util = require('util');

  console.log('input something:');

  process.stdin.on('data', function (text) 
  {
    console.log('you', util.inspect(text));
    if (text === 'quit\n') 
    {
      done();
    }
  });

  function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
  }