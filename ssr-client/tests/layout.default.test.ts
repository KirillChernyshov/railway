import {setup, $fetch} from "@nuxt/test-utils-edge";
import {describe, test, expect, beforeEach} from "vitest";
import {createPinia, setActivePinia} from "pinia";

await setup({
    rootDir: '../',
    server: true,
    browser: false
});

describe('Default layout:', async () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    test('Ссылка на /timetable', async () => {
        const html = await $fetch('/');
        expect(html).toContain('/timetable');
    })

    test('Ссылка на авторизацию "Войти"', async () => {
        const html = await $fetch('/');
        expect(html).toContain('Войти');
    })
})
