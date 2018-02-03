import { LoginPage } from './app.po';

describe('the login', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should display an error if the username has whitespace', () => {
    loginPage.navigateTo();
    loginPage.writeUsernameField('with spaces');
    loginPage.clickSubmit();
    expect(loginPage.getServerErrorText()).toEqual('Username is not valid. Please reenter.');
  });

  it('should display an error if there is no username', () => {
    loginPage.navigateTo();
    loginPage.writeUsernameField('');
    loginPage.clickSubmit();
    expect(loginPage.getLocalErrorText()).toEqual('A username is required. Please enter one.');
  });

});
