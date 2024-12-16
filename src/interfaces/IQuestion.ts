import Answer from "./IAnswer";

export default interface IQuestion {
  _id?: string;
  question?: string;
  answers?: Answer[];
}
