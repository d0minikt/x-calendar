import React from "react";
import { Typography } from "@material-ui/core";
import Center from "../../components/Center/Center";

class NotFoundPage extends React.Component {
  render() {
    return (
      <Center style={{ textAlign: "center" }}>
        <Typography variant="h2">Page not found</Typography>
      </Center>
    );
  }
}
export default NotFoundPage;
