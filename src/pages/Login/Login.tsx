import React from "react";
import {
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  Button,
  createMuiTheme
} from "@material-ui/core";
import Center from "../../components/Center/Center";
import { ReactComponent as GoogleIcon } from "./GoogleIcon.svg";
import { ApiStore } from "../../services/api/api.store";
import { inject, observer } from "mobx-react";

const styles = (theme: Theme) =>
  createStyles({
    icon: { width: 25, height: 25, marginRight: 15 }
  });

interface LoginPageProps extends WithStyles<typeof styles> {
  api?: ApiStore;
  theme: Theme;
}

@inject("api")
@observer
class LoginPage extends React.Component<LoginPageProps> {
  render() {
    const { classes, theme } = this.props;
    const { signIn } = this.props.api!;

    return (
      <Center>
        <Button
          variant={
            createMuiTheme(theme).palette.type === "dark" ? "flat" : "contained"
          }
          style={{ textTransform: "none" }}
          onClick={signIn}
        >
          <GoogleIcon className={classes.icon} />
          Sign in with Google
        </Button>
      </Center>
    );
  }
}
export default withStyles(styles, { withTheme: true })(LoginPage);
