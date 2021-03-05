class Parser {
  constructor(cursor, options) {
    this.cursor = cursor;
    this.options = options;
  }

  parse() {
    throw Error('parse() was not implemented');
  }
}

export default Parser;
