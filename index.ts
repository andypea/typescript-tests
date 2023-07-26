// Utility Types
type Remap<Type> = {
  [Key in keyof Type]: Type[Key];
};

type DeepRemap<Type> = Type extends object
  ? {
      [Key in keyof Type]: DeepRemap<Type[Key]>;
    }
  : Type;

type SomePartial<Type, Keys extends keyof Type> = Omit<Type, Keys> &
  Partial<Pick<Type, Keys>>;

type Point = { x: number; y: number; z: number };
type SmallPoint = DeepRemap<SomePartial<Point, "y" | "z">>;

const a: SmallPoint = { x: 1 };
const b: SmallPoint = { x: 1, y: 2 };
const c: SmallPoint = { x: 1, z: 3 };
const d: SmallPoint = { x: 1, y: 2, z: 3 };
// const e: SmallPoint = { y: 2 }; // ERROR: x is missing.
// const e: SmallPoint = { x: 1, w: 4 }; // ERROR: w is not in the type.
