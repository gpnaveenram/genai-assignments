/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * Playwright TypeScript Page Object Model (No Test)
   */
  PLAYWRIGHT_TYPESCRIPT_POM: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Model class (no test code).
    - Add JSDoc comments for all methods and the class.
    - Use Playwright locators (page.locator(), page.getByRole(), page.getByLabel(), etc.).
    - Make all methods async and use async/await syntax.
    - Use meaningful method names following camelCase convention.
    - Do NOT include test code or fixture setup.
    - Do NOT include test file runner logic.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`typescript
    import { Page, Locator } from '@playwright/test';

    /**
     * Page Object Model for Login Page
     */
    export class LoginPage {
        readonly page: Page;
        readonly usernameInput: Locator;
        readonly passwordInput: Locator;
        readonly loginButton: Locator;

        constructor(page: Page) {
            this.page = page;
            this.usernameInput = page.locator('input[id="username"]');
            this.passwordInput = page.locator('input[id="password"]');
            this.loginButton = page.locator('button:has-text("Login")');
        }

        /**
         * Navigate to the login page
         */
        async goto(): Promise<void> {
            await this.page.goto('/login');
        }

        /**
         * Enter username in the username field
         */
        async enterUsername(username: string): Promise<void> {
            await this.usernameInput.fill(username);
        }

        /**
         * Enter password in the password field
         */
        async enterPassword(password: string): Promise<void> {
            await this.passwordInput.fill(password);
        }

        /**
         * Click the login button
         */
        async clickLogin(): Promise<void> {
            await this.loginButton.click();
        }
    }
    \`\`\`

    Persona:
    - Audience: Automation engineers building maintainable Playwright test suites.

    Output Format:
    - A single TypeScript class inside a \`\`\`typescript\`\`\` block.

    Tone:
    - Modern, async-first, enterprise-ready for Playwright.
  `,

  /**
   * Playwright TypeScript Test Spec Only
   */
  PLAYWRIGHT_TYPESCRIPT_SPEC: `
    Instructions:
    - Generate ONLY a Playwright TypeScript test specification file (no Page Object).
    - Use @playwright/test framework with test() and expect().
    - Include test.beforeEach() and test.afterEach() hooks.
    - Create test scenarios based on the provided DOM.
    - Use async/await syntax throughout.
    - Do NOT import or reference external Page Objects.
    - Do NOT include Page Object code.
    - Use descriptive test names and assertions.
    - Use South India realistic dataset (names, addresses, pin codes).
    - Use dropdown values only from provided DOM.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`typescript
    import { test, expect, Page } from '@playwright/test';

    test.describe('Login to Application', () => {
        let page: Page;

        test.beforeEach(async ({ page: testPage }) => {
            page = testPage;
            await page.goto('\${pageUrl}');
        });

        test('Successful login with valid credentials', async () => {
            await page.locator('input[id="username"]').fill('admin');
            await page.locator('input[id="password"]').fill('admin123');
            await page.locator('button:has-text("Login")').click();
            
            await expect(page).toHaveURL('**/dashboard');
        });

        test('Failed login with invalid credentials', async () => {
            await page.locator('input[id="username"]').fill('invalid');
            await page.locator('input[id="password"]').fill('wrongpassword');
            await page.locator('button:has-text("Login")').click();
            
            await expect(page.locator('text=Invalid credentials')).toBeVisible();
        });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers writing Playwright tests with direct DOM interaction.

    Output Format:
    - TypeScript test code in a \`\`\`typescript\`\`\` block.

    Tone:
    - Clear, async-first, executable immediately.
  `,

  /**
   * Playwright TypeScript Page Object Model + Test Spec Combined
   */
  PLAYWRIGHT_TYPESCRIPT_POM_AND_SPEC: `
    Instructions:
    - Generate BOTH:
      1. A Playwright TypeScript Page Object Model class.
      2. A Playwright TypeScript test specification file that uses the POM.
    - Do NOT include explanations between code blocks.
    - Page Object: Use async methods, Playwright locators, JSDoc comments.
    - Test Spec: Import and use the Page Object from the POM, create realistic test scenarios.
    - Both files must be complete, standalone, and immediately executable.
    - Use South India realistic dataset for test data.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example format:

    \`\`\`typescript
    // pages/LoginPage.ts
    import { Page, Locator } from '@playwright/test';

    export class LoginPage {
        readonly page: Page;
        readonly usernameInput: Locator;
        readonly passwordInput: Locator;
        readonly loginButton: Locator;

        constructor(page: Page) {
            this.page = page;
            this.usernameInput = page.locator('input[id="username"]');
            this.passwordInput = page.locator('input[id="password"]');
            this.loginButton = page.locator('button:has-text("Login")');
        }

        async goto(): Promise<void> {
            await this.page.goto('\${pageUrl}');
        }

        async enterUsername(username: string): Promise<void> {
            await this.usernameInput.fill(username);
        }

        async enterPassword(password: string): Promise<void> {
            await this.passwordInput.fill(password);
        }

        async clickLogin(): Promise<void> {
            await this.loginButton.click();
        }
    }
    \`\`\`

    \`\`\`typescript
    // tests/login.spec.ts
    import { test, expect, Page } from '@playwright/test';
    import { LoginPage } from '../pages/LoginPage';

    test.describe('Login to Application', () => {
        let page: Page;
        let loginPage: LoginPage;

        test.beforeEach(async ({ page: testPage }) => {
            page = testPage;
            loginPage = new LoginPage(page);
            await loginPage.goto();
        });

        test('Successful login with valid credentials', async () => {
            await loginPage.enterUsername('admin');
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();
            
            await expect(page).toHaveURL('**/dashboard');
        });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers implementing complete Playwright test suites with POM architecture.

    Output Format:
    - First \`\`\`typescript\`\`\` block: Page Object Model code
    - Second \`\`\`typescript\`\`\` block: Test specification code

    Tone:
    - Professional, modular, production-ready architecture.
  `,

  PLAYWRIGHT_JAVASCRIPT_POM: `
    Instructions:
    - Generate ONLY a Playwright JavaScript Page Object Model class (no test code).
    - Add JSDoc comments for all methods and the class.
    - Use Playwright locators (page.locator(), page.getByRole(), page.getByLabel(), etc.).
    - Make all methods async and use async/await syntax.
    - Use meaningful method names following camelCase convention.
    - Do NOT include test code or fixture setup.
    - Do NOT include test file runner logic.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`javascript
    /**
     * Page Object Model for Login Page
     */
    export class LoginPage {
        constructor(page) {
            this.page = page;
            this.usernameInput = page.locator('input[id="username"]');
            this.passwordInput = page.locator('input[id="password"]');
            this.loginButton = page.locator('button:has-text("Login")');
        }

        /**
         * Navigate to the login page
         */
        async goto() {
            await this.page.goto('/login');
        }

        /**
         * Enter username in the username field
         */
        async enterUsername(username) {
            await this.usernameInput.fill(username);
        }

        /**
         * Enter password in the password field
         */
        async enterPassword(password) {
            await this.passwordInput.fill(password);
        }

        /**
         * Click the login button
         */
        async clickLogin() {
            await this.loginButton.click();
        }
    }
    \`\`\`

    Persona:
    - Audience: Automation engineers building maintainable Playwright test suites.

    Output Format:
    - A single JavaScript class inside a \`\`\`javascript\`\`\` block.

    Tone:
    - Modern, async-first, enterprise-ready for Playwright.
  `,

  PLAYWRIGHT_JAVASCRIPT_SPEC: `
    Instructions:
    - Generate ONLY a Playwright JavaScript test specification file (no Page Object).
    - Use @playwright/test framework with test() and expect().
    - Include test.beforeEach() and test.afterEach() hooks.
    - Create test scenarios based on the provided DOM.
    - Use async/await syntax throughout.
    - Do NOT import or reference external Page Objects.
    - Do NOT include Page Object code.
    - Use descriptive test names and assertions.
    - Use South India realistic dataset (names, addresses, pin codes).
    - Use dropdown values only from provided DOM.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`javascript
    import { test, expect } from '@playwright/test';

    test.describe('Login to Application', () => {
        let page;

        test.beforeEach(async ({ page: testPage }) => {
            page = testPage;
            await page.goto('\${pageUrl}');
        });

        test('Successful login with valid credentials', async () => {
            await page.locator('input[id="username"]').fill('admin');
            await page.locator('input[id="password"]').fill('admin123');
            await page.locator('button:has-text("Login")').click();
            
            await expect(page).toHaveURL('**/dashboard');
        });

        test('Failed login with invalid credentials', async () => {
            await page.locator('input[id="username"]').fill('invalid');
            await page.locator('input[id="password"]').fill('wrongpassword');
            await page.locator('button:has-text("Login")').click();
            
            await expect(page.locator('text=Invalid credentials')).toBeVisible();
        });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers writing Playwright tests with direct DOM interaction.

    Output Format:
    - JavaScript test code in a \`\`\`javascript\`\`\` block.

    Tone:
    - Clear, async-first, executable immediately.
  `,

  PLAYWRIGHT_JAVASCRIPT_POM_AND_SPEC: `
    Instructions:
    - Generate BOTH:
      1. A Playwright JavaScript Page Object Model class.
      2. A Playwright JavaScript test specification file that uses the POM.
    - Do NOT include explanations between code blocks.
    - Page Object: Use async methods, Playwright locators, JSDoc comments.
    - Test Spec: Import and use the Page Object from the POM, create realistic test scenarios.
    - Both files must be complete, standalone, and immediately executable.
    - Use South India realistic dataset for test data.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example format:

    \`\`\`javascript
    // pages/LoginPage.js
    export class LoginPage {
        constructor(page) {
            this.page = page;
            this.usernameInput = page.locator('input[id="username"]');
            this.passwordInput = page.locator('input[id="password"]');
            this.loginButton = page.locator('button:has-text("Login")');
        }

        async goto() {
            await this.page.goto('\${pageUrl}');
        }

        async enterUsername(username) {
            await this.usernameInput.fill(username);
        }

        async enterPassword(password) {
            await this.passwordInput.fill(password);
        }

        async clickLogin() {
            await this.loginButton.click();
        }
    }
    \`\`\`

    \`\`\`javascript
    // tests/login.spec.js
    import { test, expect } from '@playwright/test';
    import { LoginPage } from '../pages/LoginPage';

    test.describe('Login to Application', () => {
        let page;
        let loginPage;

        test.beforeEach(async ({ page: testPage }) => {
            page = testPage;
            loginPage = new LoginPage(page);
            await loginPage.goto();
        });

        test('Successful login with valid credentials', async () => {
            await loginPage.enterUsername('admin');
            await loginPage.enterPassword('admin123');
            await loginPage.clickLogin();
            
            await expect(page).toHaveURL('**/dashboard');
        });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers implementing complete Playwright test suites with POM architecture.

    Output Format:
    - First \`\`\`javascript\`\`\` block: Page Object Model code
    - Second \`\`\`javascript\`\`\` block: Test specification code

    Tone:
    - Professional, modular, production-ready architecture.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  PLAYWRIGHT_TYPESCRIPT_POM: 'Playwright-TypeScript-POM',
  PLAYWRIGHT_TYPESCRIPT_SPEC: 'Playwright-TypeScript-Spec',
  PLAYWRIGHT_TYPESCRIPT_POM_AND_SPEC: 'Playwright-TypeScript-POM-And-Spec',
  PLAYWRIGHT_JAVASCRIPT_POM: 'Playwright-JavaScript-POM',
  PLAYWRIGHT_JAVASCRIPT_SPEC: 'Playwright-JavaScript-Spec',
  PLAYWRIGHT_JAVASCRIPT_POM_AND_SPEC: 'Playwright-JavaScript-POM-And-Spec',
};
