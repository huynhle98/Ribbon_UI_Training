import { ActiveDirective } from './active.directive';

describe('ActiveDirective', () => {
  it('should create an instance', () => {
    // tslint:disable-next-line: prefer-const
    let el: any;
    const directive = new ActiveDirective(el);
    expect(directive).toBeTruthy();
  });
});
