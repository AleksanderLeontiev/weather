import "@babel/polyfill";
import {getSrcMap, getWeather} from "./api";
import 'regenerator-runtime/runtime';
// jest.mock("./api");
describe("getSrcMap", () => {
it("getSrcMap", async () => {
  // let mock = getSrcMap.mockImplementation(
  //     () =>
  //       `https://maps.googleapis.com/maps/api/staticmap?center=Yoshkar-Ola,RU&zoom=14&size=400x400&key=AIzaSyDWml8rMJVcvqf6WhD0a9Z6q-PhrnnLb7A`
  //   );
  let mock = "Yoshkar-Ola"
  const urlUmg = getSrcMap(mock);
  expect(urlUmg).toEqual(
    `https://maps.googleapis.com/maps/api/staticmap?center=Yoshkar-Ola,RU&zoom=14&size=400x400&key=AIzaSyDWml8rMJVcvqf6WhD0a9Z6q-PhrnnLb7A`
  );
});
  describe("receives data from the server", () =>{

    global.fetch = jest.fn(() =>
      Promise.resolve({json: () => Promise.resolve("Yoshkar-Ola")}
      ));
    it("shows the weather in the city", async () => {
      const data = await getWeather();
      expect(data).toEqual("Yoshkar-Ola");

    });
  });
});