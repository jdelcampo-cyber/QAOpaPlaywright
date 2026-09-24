class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.signInbutton  = page.locator('#login');
        this.userEmail = page.locator('#userEmail');
        this.userPassword  = page.locator('#userPassword');
    }

    async navigatePage()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/");
    }

    async validLogin(username, password)
    {
        await this.userEmail.type(username);
        await this.userPassword.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};