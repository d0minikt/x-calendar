import React from "react";
import styles from "./Center.module.css";

class Center extends React.Component<any> {
  render() {
    const { className, ...rest } = this.props;
    return <div className={`${styles.root} ${className}`} {...rest} />;
  }
}
export default Center;
