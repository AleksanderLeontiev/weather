import { getSrcMap, getWeather } from "./api";

describe("receive card data from the server", () => {
	test("receive map", async () => {
		const mock = "Yoshkar-Ola";
		const urlUmg = getSrcMap(mock);
		expect(urlUmg).toEqual(
			`https://maps.googleapis.com/maps/api/staticmap?center=Yoshkar-Ola,RU&zoom=14&size=400x400&key=AIzaSyDW6zlQYQGTpgsfqOILRe2WkMcoOPalSEo`
		);
	});

	describe("receives data from the server", () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ json: () => Promise.resolve("Yoshkar-Ola") })
		);
		test("shows the weather in the city", async () => {
			const data = await getWeather();
			expect(data).toEqual("Yoshkar-Ola");
		});
	});
});
