import React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: `solid 2px ${
        theme.palette.type === "dark"
          ? "rgba(255,255,255,.4)"
          : "rgba(0,0,0,.2)"
      }`
    }
  });

interface ColorDotProps extends WithStyles<typeof styles> {
  color: string;
}

class ColorDot extends React.Component<ColorDotProps> {
  render() {
    const { classes, color } = this.props;
    return <div className={classes.root} style={{ background: color }} />;
  }
}
export default withStyles(styles)(ColorDot);
