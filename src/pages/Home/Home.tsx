import * as React from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import styles from "./Home.module.css";
import Logo from "./Logo";

export default class HomePage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className={styles.app}>
          <header className={styles.header}>
            <Logo className={styles.logo} />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className={styles.link}
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </DefaultLayout>
    );
  }
}
