import { SecureNotePage } from './app.po';

describe('secure-note App', function() {
  let page: SecureNotePage;

  beforeEach(() => {
    page = new SecureNotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
