import React from "react";
import styles from "./Container.module.css";

export default ({ className = "", ...props }: any) => (
  <div className={`${styles.container} ${className}`} {...props} />
);
