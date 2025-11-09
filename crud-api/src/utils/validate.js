export function validateUserPayload(body) {
    if (typeof body !== 'object' || body === null) {
      return { valid: false, message: 'Body must be a JSON object' };
    }
  
    const { username, age, hobbies } = body;
  
    if (typeof username !== 'string') {
      return { valid: false, message: 'Field "username" must be a string' };
    }
  
    if (typeof age !== 'number' || Number.isNaN(age)) {
      return { valid: false, message: 'Field "age" must be a number' };
    }
  
    if (!Array.isArray(hobbies)) {
      return { valid: false, message: 'Field "hobbies" must be an array' };
    }
  
    const allStringInArray = hobbies.every((h) => typeof h === 'string');
    if (!allStringInArray) {
      return { valid: false, message: 'All hobbies must be strings' };
    }
  
    return { valid: true };
  }
  
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  export function isValidUuid(id) {
    return typeof id === 'string' && uuidV4Regex.test(id);
  }