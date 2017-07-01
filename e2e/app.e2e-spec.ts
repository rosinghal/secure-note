import { SecureNotesPage } from './app.po';

describe('secure-notes App', () => {
  let page: SecureNotesPage;

  beforeEach(() => {
    page = new SecureNotesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
