import ReactDOM from "react-dom";
import * as MobX from "mobx";

import App from "src/app";

MobX.configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

ReactDOM.render(<App />, document.getElementById("root"));
