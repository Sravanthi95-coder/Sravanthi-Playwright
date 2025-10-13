class loginPO
{
  
    constructor(page) // In constructor we have to write locators
    {
        this.page=page;
        this.signInButton= page.locator('#login');
        this.userName= page.locator('#userEmail');
        this.passWord= page.locator('#userPassword');
    }
    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(username,password) // Here we need to write actions of the locators
    {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
module.exports ={loginPO}; // need to export from here 