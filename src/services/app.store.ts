import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import * as colors from "@material-ui/core/colors";

export class AppStore {
  @persist("object")
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
