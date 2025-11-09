export function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
      let data = '';
  
      req.on('data', (chunk) => {
        data += chunk.toString('utf-8');
      });
  
      req.on('end', () => {
        if (!data) {
          return resolve(null);
        }
  
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(new Error('Invalid JSON'));
        }
      });
  
      req.on('error', (err) => {
        reject(err);
      });
    });
  }