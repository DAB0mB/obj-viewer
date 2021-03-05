import Parser from '../Parser';

class FaceParser extends Parser {
  parse() {
    const values = [];
    this.cursor.nextWhile(/ /);

    while (this.cursor.value !== '\n') {
      const value = Number(this.cursor.nextWhile(/[^\s]/, this.cursor));
      values.push(value);
      this.cursor.nextWhile(/ /, this.cursor);
    }

    return values;
  }
}

export default FaceParser;
