import { initListeners, run } from "./app";

initListeners();
run().catch((exp) => console.error(exp));
