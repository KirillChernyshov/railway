import {setup, $fetch} from "@nuxt/test-utils-edge";
import {describe, test, expect,} from "vitest";
import {IAuth} from "~/types/auth";

await setup({
    // rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    browser: true,
    nuxtConfig: {
        runtimeConfig: {
            dbName: 'railway_test',
        }
    }
})

describe('server auth api', () => {
    let token = '';

    test('bad log-in', async () => {
        const userLogInData: IAuth = {
            name: 'not_sign_up',
            password: 'empty'
        }

        try {
            await $fetch('/api/auth', {
                method: 'post',
                body: userLogInData,
            });
        } catch (e) {
            console.dir(e);
            expect(String(e)).contain('404 Not Found');
        }
    })

    test('log-in', async () => {
        const userLogInData: IAuth = {
            name: 'admin',
            password: 'admin'
        }

        const user = await $fetch('/api/auth', {
            method: 'post',
            body: userLogInData,
        });

        token = user.token;

        expect(user).toHaveProperty('name', 'admin');
    })

    test('auth by token', async () => {
        const user = await $fetch('/api/auth', {
            method: 'get',
            headers: {
                authorization: `Bearer: ${token}`,
            },
        });

        expect(user).toHaveProperty('name', 'admin');
    })
});