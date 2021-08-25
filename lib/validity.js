class Validity {
  static isArray(obj) {
    return Validity.isDefined(obj) && Array.isArray(obj);
  }

  static isInteger(obj) {
    return Number.isInteger(obj);
  }

  static isDefined(obj) {
    return typeof obj !== 'undefined';
  }

  static isBoolean(obj) {
    if (typeof obj === 'boolean') return true;
    if (typeof obj === 'string') {
      const value = obj.toLowerCase();
      switch(value) {
        case '0':
        case 'no':
        case 'off':
        case 'false':
        case '1':
        case 'yes':
        case 'on':
        case 'true':
          return true;
        default:
          return false;
      }
    }

    return false;
  }

  static isObject(obj) {
    return typeof obj === 'object';
  }

  static isValidEmail(email) {
    if (typeof email !== 'string') return false;
    // https://stackoverflow.com/a/46181
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
  }

  static isValidPassword(password) {
    if (typeof password !== 'string') return false;
    // https://stackoverflow.com/a/46181
    // Validate length, letters, digits
    // const letters = /[a-zA-Z]/g;
    // const digits = /[0-9]/g;
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g;
    return regex.test(password);
  }

  static isValidCurrency(text, prefix = '') {
    if (typeof text !== 'string') return false;
    const re = /^[$£€] ?(?=\(.*\)|[^()]*$)\(?\d{1,3}(,?\d{3})?(\.\d\d?)?\)?$/;
    if (prefix && prefix !== '') return re.test(text.replace(prefix, ''));
    return re.test(text);
  }

  static isValidDate(date) {
    return typeof date === 'object' && date instanceof Date;
  }

  static isValidNumber(value, min = undefined, max = undefined, exclude = undefined) {
    if (typeof value === 'undefined' || typeof value !== 'number') return false;
    return !((min && +value < min) || (max && +value > max) || (exclude && exclude.includes(+value)));
  }

  static isValidInteger(value, min = undefined, max = undefined, exclude = undefined) {
    return Validity.isInteger(value) && Validity.isValidNumber(value, min, max, exclude);
  }

  static isValidString(text, min = 1, max = undefined) {
    if (typeof text !== 'string') return false;
    // min = 0 -> empty string is allowed
    // min = 1 -> empty string is not allowed
    return !(typeof text === 'undefined' || (min && text.length < min) || (max && text.length > max));
  }

  static isUndefinedOrEmptyString(text) {
    if (typeof text !== 'string') return false;
    return typeof text === 'undefined' || text === '';
  }
}

module.exports = Validity;
