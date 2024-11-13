import React, { Component, MouseEvent } from "react"
import { AddGuest } from "./AddGuest"

export type Show = "home" | "guestlist" | "addguest" | "guestpage"

type State = {
    showing: Show
}

export class App extends Component<{}, State> {
    constructor(props: {}){
        super(props)

        this.state = {showing: "addguest"}
    }

    render = (): JSX.Element => {
        let page: JSX.Element = <div></div>
        if(this.state.showing === "addguest"){
            page = <AddGuest openGL={this.openPage}/>
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