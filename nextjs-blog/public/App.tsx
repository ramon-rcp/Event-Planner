import React, { Component, MouseEvent } from "react"
import { AddGuest } from "./AddGuest"
import { Home } from "./Home"
import { GuestList } from "./GuestList"
import { Guest } from "./Guest"
import { GuestInfo } from "./GuestInfo"

export type Show = "home" | "guestlist" | "addguest" | {kind: "guestinfo", guest: Guest}

type State = {
    showing: Show
}

export class App extends Component<{}, State> {
    constructor(props: {}){
        super(props)

        this.state = {showing: "home"}
    }

    render = (): JSX.Element => {
        let page: JSX.Element = <div></div>
        if(this.state.showing === "addguest") {
            page = <AddGuest openGL={this.openPage}/>
        }
        else if(this.state.showing === "home") {
            page = <Home openPage={this.openPage}/>
        }
        else if(this.state.showing === "guestlist") {
            page = <GuestList openPage={this.openPage}/>
        }
        else if(this.state.showing.kind === "guestinfo") {
            page = <GuestInfo guest={this.state.showing.guest} openGL={this.openPage}/>
        }

        return <div>
            <header>

            </header>

            {page}

            <footer>

            </footer>
        </div>
    }

    openPage = (page: Show): void => {
        this.setState({showing: page})
    }
}