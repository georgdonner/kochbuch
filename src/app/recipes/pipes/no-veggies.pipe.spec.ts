import { NoVeggiesPipe } from './no-veggies.pipe';

describe('NoVeggiesPipe', () => {
  it('create an instance', () => {
    const pipe = new NoVeggiesPipe();
    expect(pipe).toBeTruthy();
  });
});
