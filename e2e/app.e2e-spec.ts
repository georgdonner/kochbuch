import { GeorgsRecipesPage } from './app.po';

describe('georgs-recipes App', () => {
  let page: GeorgsRecipesPage;

  beforeEach(() => {
    page = new GeorgsRecipesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
