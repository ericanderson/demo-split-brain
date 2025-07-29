import { defineThings } from "mylib";

export const myThing = defineThings((myArg: number) => {
  console.log("inside my defined thing", { myArg });
}, {
  a: 1,
  b: "hello",
  c: true,
});
