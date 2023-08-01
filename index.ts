////////////////////////////////////////////////////////////
// Utility Types
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Remap and DeepRemap
//
// These are useful for "remapping" a mapped type, so that
// it produces more informative error messages.
////////////////////////////////////////////////////////////
type Remap<Type> = {
  [Key in keyof Type]: Type[Key];
};

type DeepRemap<Type> = Type extends object
  ? {
      [Key in keyof Type]: DeepRemap<Type[Key]>;
    }
  : Type;

////////////////////////////////////////////////////////////
// SomePartial
//
// This makes some keys in a type optional.
////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
// Fat Functions
//
// In Javascript functions are also objects and can have additional properties attached.
// However, it's tricky to instatiate these types without producing Typescript errors.
////////////////////////////////////////////////////////////
type DescribedFunction = {
  (x: number): number;
  description: string;
};

const triple: DescribedFunction = Object.assign((x: number) => 3 * x, {
  description: "Triples a number.",
});

console.log(triple(14));
console.log(triple.description);

////////////////////////////////////////////////////////////
// Intersection Types
//
// Makes a type (non-strictly) more restrictive by
// restricting the set of values that are compatible with
// the type.
////////////////////////////////////////////////////////////
type TestType = {
  required: string;
  optional?: string;
};

const alpha: TestType = { required: "a" };
const beta: TestType = { required: "b", optional: "b" };

type AllRequired = TestType & { optional: string };
//const error: AllRequired = { required: "e" }; // ERROR: "optional" is missing

type Redundant = TestType & { optional?: string };
const gamma: Redundant = { required: "g" };
const delta: Redundant = { required: "d", optional: "d" };

type IntersectionDoesntWeaken = TestType & { required?: string };
//const error: IntersectionDoesntWeaken = {}; // ERROR: "required" is missing
