import { HomeRoutingModule } from './home-routing.module';

describe('HomeRoutingModule', () => {
  let homeRoutingModule: HomeRoutingModule;

  beforeEach(() => {
    homeRoutingModule = new HomeRoutingModule();
  });

  it('should create an instance', () => {
    expect(homeRoutingModule).toBeTruthy();
  });
});
