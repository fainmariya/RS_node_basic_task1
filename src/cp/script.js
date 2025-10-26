console.log('Args:', process.argv.slice(2));
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => process.stdout.write(d.toUpperCase()));