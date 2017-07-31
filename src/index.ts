import * as M from "./Maybe";

export const Maybe = M;
export type Maybe<T> = M.Maybe<T>;

declare module "icecrown/lib/types/Functor" {
  export interface MapFunction {
    <T, T1>(f: (x: T) => T1, a: Maybe<T>): Maybe<T1>;
  }
}
