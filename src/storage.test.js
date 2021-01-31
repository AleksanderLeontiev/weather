import "@babel/polyfill";
import { getStorage, setStorage } from "./storage";
import "regenerator-runtime/runtime";

describe("receives data from localStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	it("saves a list of localStorage", () => {
		jest.spyOn(global.localStorage.__proto__, "setItem");
		global.localStorage.__proto__.setItem = jest.fn();
		const key = "cities";
		const list = ["Yoshkar-Ola", "Moscow"];
		const value = JSON.stringify(list);
		setStorage(key, value);
		expect(global.localStorage.setItem).toHaveBeenLastCalledWith(
			key,
			JSON.stringify(value)
		);
	});
	it("reads a list of localStorage", () => {
		jest.spyOn(window.localStorage.__proto__, "getItem");
		window.localStorage.__proto__.setItem = jest.fn();
		const key = "cities";
		getStorage(key);
		expect(localStorage.getItem).toHaveBeenCalledWith(key);
	});
});
