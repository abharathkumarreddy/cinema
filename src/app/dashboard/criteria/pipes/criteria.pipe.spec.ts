import { CriteriaPipe } from './criteria.pipe';

describe('CriteriaPipe', () => {
  it('create an instance', () => {
    const pipe = new CriteriaPipe();
    expect(pipe).toBeTruthy();
  });

  it('should remove underscores', () => {
    const pipe = new CriteriaPipe();
    expect(pipe.transform('bharath_kumar')).toBe('bharath kumar');
  });

});
