import React, { Component, MouseEvent } from "react";
import { Show } from "./App";
import styles from '../styles/Home.module.css';

type HomeProps = {
    openPage: (page: Show) => void
}


export class Home extends Component<HomeProps, {}> {
    constructor(props: HomeProps){
        super(props)
    }

    render = (): JSX.Element => {
        return (
            <main>
            <h2>
                HOME
            </h2>
            <p><a onClick={this.openGL}>GuestList</a></p>
            <p><a onClick={this.openAG}>AddGuest</a></p>
        </main>
        );
    }

    openAG = (evt: MouseEvent<HTMLElement>): void => {
        this.props.openPage("addguest")
    }

    openGL = (evt: MouseEvent<HTMLElement>): void => {
        this.props.openPage("guestlist")
    }
}