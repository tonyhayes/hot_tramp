import { Pages } from './pages.component';

describe('Pages', () => {

  const page = new Pages();
  //specs
  it('should create Pages', () => {
    console.log(page)
    expect(page).toBeDefined();
  });

}) 

