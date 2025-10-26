// RSS_name1=value1; RSS_name2=value2


export function parseEnv(){
    const entries = Object.entries(process.env);
    const onlyRss = entries.filter(([k]) => k.startsWith('RSS_'));
    const pairs   = onlyRss.map(([k, v]) => `${k}=${v ?? ''}`);
    const out     = pairs.join('; ');

    console.log(Object.keys(process.env).filter(k => k.startsWith('RSS_')));
}

// опционально для локальной проверки:
if (import.meta.url === `file://${process.argv[1]}`) {
  parseEnv();
}