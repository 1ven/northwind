import { Nothing } from "./Nothing";
import { Just } from "./Just";

export const empty = () => Nothing();

export const zero = () => Nothing();

export const of = <T>(value: T) => Just<T>(value);
