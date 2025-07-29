export function defineThings<X extends (...args: any[]) => any>(fn: X, args: {
  a: number;
  b: string;
  c: boolean;
}): X;
