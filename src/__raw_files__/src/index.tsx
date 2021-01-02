import ReactDOM from "react-dom";
import * as MobX from "mobx";

import App from "src/app";

MobX.configure({ enforceActions: "always" });

ReactDOM.render(<App />, document.getElementById("root"));
