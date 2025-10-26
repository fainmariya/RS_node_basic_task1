import { argv } from 'node:process';


export function parseArgs(){
    const args = argv.slice(2); //received string array
    const obj = [];
    for (let i =0; i<args.length; i += 2){
       
        const k= args[i].replace("--","");
       const v = args[i+1]
       obj.push(`${k} is ${v}`);

    }

    console.log(obj.join(', '));
}
if (import.meta.url === `file://${process.argv[1]}`) {
    parseArgs();
  }
