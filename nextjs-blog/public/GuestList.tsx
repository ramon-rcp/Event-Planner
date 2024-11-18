import React, { Component, MouseEvent } from "react";
import { load, names } from "./server";
import { Show } from "./App";
import { Guest } from "./Guest";

type GlState = {
    list?: string[];
}

type GlProps = {
    openPage: (page: Show) => void
}

export class GuestList extends Component<GlProps, GlState> {
    constructor(props: GlProps){
        super(props)

        this.state = {}
    }

    render = (): JSX.Element => {
        console.log(this.state.list);
        
        if(this.state.list === undefined){
            this.getList()
            return <main>LOADING...</main>
        }
        return <main>
            <h2>
                Guest List
            </h2>
            {this.renderList()}
            <button onClick={this.openAg}>Add Guest</button>
        </main>
    }

    renderList = (): JSX.Element => {
        if(this.state.list === undefined) throw new Error("list is undefined")
        const html: JSX.Element[] = []
        for(const name of this.state.list){
            html.push(
                <li><a onClick={this.openGi}>
                    {name}
                    </a></li>
            )
        }
        return <ul>{html}</ul>
    }

    openGi = (evt: MouseEvent<HTMLAnchorElement>): void => {
        const target = evt.target as HTMLElement
        const g: Guest = load(target.innerHTML);
        this.props.openPage({kind: "guestinfo", guest: g})
    }

    getList = (): void => {
        this.setState({list: names()})
    }

    openAg = (evt: MouseEvent<HTMLElement>): void => {
        this.props.openPage("addguest")
    }
}