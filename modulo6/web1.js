import { browser } from 'k6/browser';
import { sleep, check } from 'k6';

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 3,
            duration: '10s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
    thresholds: {
        checks: ['rate==1.0'],
    },
};

export default async function () {
    const page = await browser.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php');

        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        const submitButton = page.locator('input[type="submit"]');

        await Promise.all([submitButton.click(), page.waitForNavigation()]);

        const headerText = await page.locator('h2').textContent();
        console.log('H2 encontrado:', headerText);

        check(page, {
            'validação do header': () => headerText === 'Welcome, admin!',
        });
        
        sleep(1)
    } finally {
        page.close();
    }
}