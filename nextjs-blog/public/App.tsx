import React, { Component } from "react";
import { AddGuest } from "./AddGuest";
import { Home } from "./Home";
import { GuestList } from "./GuestList";
import { Guest } from "./Guest";
import { GuestInfo } from "./GuestInfo";
import styles from '../styles/Home.module.css';

export type Show = "home" | "guestlist" | "addguest" | { kind: "guestinfo"; guest: Guest };

type State = {
  showing: Show;
};

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { showing: "home" };
  }

  render = (): JSX.Element => {
    let page: JSX.Element = <div></div>;
    if (this.state.showing === "addguest") {
      page = <AddGuest openGL={this.openPage} />;
    } else if (this.state.showing === "home") {
      page = <Home openPage={this.openPage} />;
    } else if (this.state.showing === "guestlist") {
      page = <GuestList openPage={this.openPage} />;
    } else if (this.state.showing.kind === "guestinfo") {
      page = <GuestInfo guest={this.state.showing.guest} openGL={this.openPage} />;
    }

    return (
      <div>
        <header className={styles.mainHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>Event Planner</h1>
            <nav className={styles.nav}>
              <a onClick={() => this.openPage("home")}>Home</a>
              <a onClick={() => this.openPage("guestlist")}>Guest List</a>
              <a onClick={() => this.openPage("addguest")}>Add Guest</a>
            </nav>
          </div>
        </header>
        <main>{page}</main>
      </div>
    );
  }

  openPage = (page: Show): void => {
    this.setState({ showing: page });
  }
}
