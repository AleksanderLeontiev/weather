import { getStorage, setStorage } from "./storage";

describe("receives data from localStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	test("saves a list of localStorage", () => {
		jest.fn(global.localStorage.setItem);
		const key = "cities";
		const list = ["Yoshkar-Ola", "Moscow"];
		const value = JSON.stringify(list);
		setStorage(key, value);
		expect(global.localStorage.setItem).toHaveBeenLastCalledWith(
			key,
			JSON.stringify(value)
		);
	});
	test("reads a list of localStorage", () => {
		jest.fn(window.localStorage.getItem);
		const key = "cities";
		getStorage(key);
		expect(localStorage.getItem).toHaveBeenCalledWith(key);
	});
});
