import dayjs from 'dayjs';

export default function main(arr: string[]) {

  const firstMsOfToday = dayjs().set('h', 0).set('m', 0).set('s', 0).set('ms', 0);

  const generator = new RandomGen(firstMsOfToday.valueOf());

  const randVals = [0, 1, 2].map(_ => generator.next())

  const indices = randVals.map(val => val % arr.length);

  const output = indices.map(i => arr[i].toUpperCase());

  return output;
}


/**
 * Credit: https://gist.github.com/blixt/f17b47c62508be59987b
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */

class RandomGen {
  private _seed: number;
  constructor(seed: number) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  }
  next(): number {
    return this._seed = this._seed * 16807 % 2147483647;
  }
}
