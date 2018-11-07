import React from "react";
import ReactDOM from "react-dom";

// state management
import { Provider, observer, inject } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import DevTools from "mobx-react-devtools";
import { create } from "mobx-persist";
import { AppStore } from "./services/app.store";

// theming
import {
  createMuiTheme,
  MuiThemeProvider as MuiThemeProviderBase
} from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store: { [key: string]: any } = {
  app: new AppStore(),
  router: new RouterStore()
};

// persist
const hydrate = create({
  storage: localStorage
});
for (let key in store) {
  if (key !== "router") hydrate(key, store[key]);
}

interface MuiThemeProviderProps {
  children: React.ReactNode;
  app?: AppStore;
}

@inject("app")
@observer
class MuiThemeProvider extends React.Component<MuiThemeProviderProps> {
  // updating the meta theme has a smaller delay than changing the MuiTheme,
  // therefore change the meta theme after to get them to sync as much as possible
  componentDidUpdate() {
    const theme = createMuiTheme(this.props.app!.theme);
    const metaThemeColor = document.querySelector("meta[name=theme-color]")!;
    metaThemeColor.setAttribute("content", theme.palette.primary.dark);
  }
  render() {
    const { app, ...props } = this.props;
    const theme = createMuiTheme(app!.theme);

    return <MuiThemeProviderBase theme={theme} {...props} />;
  }
}

ReactDOM.render(
  <Provider {...store}>
    <>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
      {process.env.NODE_ENV === "development" && <DevTools />}
    </>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
