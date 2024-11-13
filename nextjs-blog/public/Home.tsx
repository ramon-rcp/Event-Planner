import React, { Component, MouseEvent } from "react";

type HomeProps = {
    openGL: () => void
    openAG: () => void
}


export class Home extends Component<HomeProps, {}> {
    constructor(props: HomeProps){
        super(props)
    }

    render = (): JSX.Element => {
        return <div>
            <h2>
                HOME
            </h2>
            <p><a onClick={this.props.openGL}>GuestList</a></p>
            <p><a onClick={this.props.openGL}>AddGuest</a></p>
        </div>
    }
}