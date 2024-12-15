const propositionalLogic = {
  NOT: (x: boolean): boolean => !x,
  AND: (x: boolean, y: boolean): boolean => x && y,
  INCLUSIVE_OR: (x: boolean, y: boolean): boolean => x || y,
  EXCLUSIVE_OR: (x: boolean, y: boolean): boolean => (x || y) && !(x && y),
  IMPLIES: (x: boolean, y: boolean): boolean => !x || y,
  BICONDITIONAL: (x: boolean, y: boolean): boolean => (!x && !y) || (x && y),
};

import { test, expect } from 'bun:test';

test('implies should match the following table', () => {
  const table = [
    [false, false, true],
    [false, true, true],
    [true, false, false],
    [true, true, true],
  ];

  for (const scenarios of table) {
    expect(propositionalLogic.IMPLIES(scenarios[0], scenarios[1])).toBe(
      scenarios[2]
    );
  }
});

test('biconditional should match the following table', () => {
  const table = [
    [false, false, true],
    [false, true, false],
    [true, false, false],
    [true, true, true],
  ];

  for (const scenarios of table) {
    console.log(
      `testing: ${scenarios[0]} and ${scenarios[1]} to be ${scenarios[2]}`
    );
    expect(propositionalLogic.BICONDITIONAL(scenarios[0], scenarios[1])).toBe(
      scenarios[2]
    );
  }
});

type Expect<T extends true> = T;

type Equal<T extends K, K> = true;

type Not<T extends boolean> = T extends true ? false : true;

type And<T extends boolean, K extends boolean> = T extends true
  ? K extends true
    ? true
    : false
  : false;

type InclusiveOr<T extends boolean, K extends boolean> = T extends true
  ? true
  : K extends true
  ? true
  : false;

type ExclusiveOr<T extends boolean, K extends boolean> = T extends true
  ? K extends true
    ? false
    : true
  : K extends true
  ? true
  : false;

type Implies<T extends boolean, K extends boolean> = T extends true
  ? K extends true
    ? true
    : false
  : true;

type Biconditional<T extends boolean, K extends boolean> = T extends true
  ? K extends true
    ? true
    : false
  : K extends false
  ? true
  : false;

type Case = [
  Expect<Equal<And<true, true>, true>>,
  Expect<Equal<And<false, true>, false>>,
  Expect<Equal<And<true, false>, false>>,
  Expect<Equal<And<false, false>, false>>,

  Expect<Equal<Not<true>, false>>,
  Expect<Equal<Not<false>, true>>,

  Expect<Equal<InclusiveOr<true, true>, true>>,
  Expect<Equal<InclusiveOr<false, true>, true>>,
  Expect<Equal<InclusiveOr<true, false>, true>>,
  Expect<Equal<InclusiveOr<false, false>, false>>,

  Expect<Equal<ExclusiveOr<true, true>, false>>,
  Expect<Equal<ExclusiveOr<false, true>, true>>,
  Expect<Equal<ExclusiveOr<true, false>, true>>,
  Expect<Equal<ExclusiveOr<false, false>, false>>,

  Expect<Equal<Implies<true, true>, true>>,
  Expect<Equal<Implies<false, true>, true>>,
  Expect<Equal<Implies<true, false>, false>>,
  Expect<Equal<Implies<false, false>, true>>
];
