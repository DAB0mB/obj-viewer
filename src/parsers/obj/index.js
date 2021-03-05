import Cursor from '../Cursor';
import ObjParser from './ObjParser';

export const parseObj = (str) => {
  const cursor = new Cursor(str);
  const objParser = new ObjParser(cursor);

  return objParser.parse();
};
