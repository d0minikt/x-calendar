import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import * as colors from "@material-ui/core/colors";

export class AppStore {
  @observable
  themes: { [key: string]: ThemeOptions } = {
    default: {
      palette: {
        background: { default: "#eceff1", paper: "#fff" },
        primary: { main: "#000" },
        secondary: { main: colors.teal[500] }
      },
      typography: { useNextVariants: true }
    },
    indigo: {
      palette: {
        background: { default: "#e2e7ff" },
        primary: { main: colors.indigo[500] },
        secondary: { main: colors.teal[500] }
      },
      typography: { useNextVariants: true }
    },
    "dark teal": {
      palette: {
        type: "dark",
        primary: { main: colors.teal[500] },
        secondary: { main: colors.teal[500] }
      },
      typography: { useNextVariants: true }
    },
    teal: {
      palette: {
        background: { default: "#eceff1" },
        primary: { main: colors.teal["A400"] },
        secondary: { main: colors.cyan[500] }
      },
      typography: { useNextVariants: true }
    },
    light: {
      palette: {
        background: {
          default: "#fff",
          paper: "#eceff1"
        },
        primary: { main: "#fff" }
      },
      overrides: {
        MuiAppBar: {
          root: {
            boxShadow: "none",
            borderBottom: "solid 1px rgba(0,0,0,0.12)"
          }
        },
        MuiDrawer: {
          // paper: { background: "#fff" }
        }
      },
      typography: { useNextVariants: true }
    },
    "light pink": {
      palette: {
        background: { default: "#fff", paper: "#ffedf3" },
        primary: { main: "#ffc1d8" },
        secondary: { main: colors.pink["A400"] }
      },
      typography: { useNextVariants: true }
    },
    purple: {
      palette: {
        background: { paper: "#fff", default: "#e7d7ea" },
        primary: colors.purple,
        secondary: colors.indigo
      },
      typography: { useNextVariants: true }
    }
  };

  @persist("object")
  @observable
  theme: ThemeOptions = this.themes.default;

  @persist
  @observable
  counter: number = 0;

  @action.bound
  increment() {
    this.counter++;
  }

  @action.bound
  decrement() {
    this.counter--;
  }
}
