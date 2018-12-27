import { SklCommonModule } from './common.module';

describe('SklCommonModule', () => {
  let sklCommonModule: SklCommonModule;

  beforeEach(() => {
    sklCommonModule = new SklCommonModule();
  });

  it('should create an instance', () => {
    expect(sklCommonModule).toBeTruthy();
  });
});
