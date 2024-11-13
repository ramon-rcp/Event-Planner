import React, { ChangeEvent, Component, MouseEvent } from "react";
import { Guest } from "./Guest";
import { Show } from "./App";
import { save } from "./server";

type AgState = {
    name: string,
    allergies: string,
    kids: number,
    plusone: boolean,
    kidinfo?: {
        names: string[]
        allergies: string[]
    }
    plusoneinfo?: {
        name: string
        allergies: string
    }
}

type AgProps = {
    openGL: (page: Show) => void
}

export class AddGuest extends Component<AgProps, AgState> {
    constructor(props: AgProps){
        super(props)

        this.state = {
            name: "",
            allergies: "",
            kids: 0,
            plusone: false
        }
    }

    render = (): JSX.Element => {
        return <div>
            <h2>
                Add Guest
            </h2>
            <p>
                Name: 
                <input type="text" value={this.state.name} onChange={this.updateName}></input>
            </p>
            <p>
                Allergies:
                <textarea rows={4} cols={60} value={this.state.allergies} onChange={this.updateAllergies}></textarea> 
            </p>
            <p>
                Plus One:
                <input type="radio" name="plusone" value="1" 
                    checked={this.state.plusone} onChange={this.updatePlusOne}></input> Yes 
                <input type="radio" name="plusone" value="0" 
                    checked={!this.state.plusone} onChange={this.updatePlusOne}></input> No             
            </p>
            {this.renderPlusOne()}
            <p>
                Kids:
                <input type="number" value={this.state.kids} onChange={this.updateKids}></input>
            </p>
            {this.renderKids()}
            <button onClick={this.addGuest}>Add</button>
        </div>
    }

    renderKids = (): JSX.Element => {
        const html: JSX.Element[] = []
        for(let i:number = 0; i<this.state.kids; i++){
            html.push(<div><p>
                Kid {i+1} Name:
                <input type="text" name={i.toString()} onChange={this.updateKidName} value={this.state.kidinfo?.names[i]}></input>
            </p>
            <p>
                Kid {i+1} Allergies:
                <textarea rows={4} cols={60} name={i.toString()} value={this.state.kidinfo?.allergies[i]} onChange={this.updateKidAllergies}></textarea>
            </p></div>)
        }
        return <div>{html}</div>
    }

    renderPlusOne = (): JSX.Element => {
        if(!this.state.plusone){
            return <div></div>
        }
        return <div>
            <p>
                Plus One Name: 
                <input type="text" value={this.state.plusoneinfo?.name} onChange={this.updatePoName}></input>
            </p>
            <p>
                Plus One Allergies:
                <textarea rows={4} cols={60} value={this.state.plusoneinfo?.allergies} onChange={this.updatePoAllergies}></textarea>
            </p>
        </div>
    }

    addGuest = (evt: MouseEvent<HTMLButtonElement>): void => {
        save({
            name: this.state.name, 
            kids: this.state.kids, 
            allergies: this.state.allergies,
            plusone: this.state.plusone
        })
        this.props.openGL("guestlist")
    }

    updateKidAllergies = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
        let newAlls: string[] | undefined = this.state.kidinfo?.allergies.slice(0)
        if(newAlls === undefined) throw new Error("y is kidinfo undefined");
        newAlls[Number(evt.target.name)] = evt.target.value 
        this.setState({kidinfo: {
            allergies: newAlls,
            names: (this.state.kidinfo !== undefined) ? this.state.kidinfo?.names : []
        }})
    }

    updateKidName = (evt: ChangeEvent<HTMLInputElement>): void => {
        let newNames: string[] | undefined = this.state.kidinfo?.allergies.slice(0)
        if(newNames === undefined) throw new Error("y is kidinfo undefined");
        newNames[Number(evt.target.name)] = evt.target.value 
        this.setState({kidinfo: {
            names: newNames,
            allergies: (this.state.kidinfo !== undefined) ? this.state.kidinfo?.allergies : []
        }})
    }

    updatePoAllergies = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({plusoneinfo: {
            allergies: evt.target.value,
            name: (this.state.plusoneinfo !== undefined) ? this.state.plusoneinfo?.name : ""
        }})
    }

    updatePoName = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({plusoneinfo: {
            name: evt.target.value,
            allergies: (this.state.plusoneinfo !== undefined) ? this.state.plusoneinfo?.allergies : ""
        }})
    }

    updateKids = (evt: ChangeEvent<HTMLInputElement>): void => {
        const n: number = Number(evt.target.value);
        this.setState({
            kids: n,
            kidinfo: (n <= 0) ? undefined : {names: new Array(n).fill(''), allergies: new Array(n).fill('')}
        })
    }

    updateName = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({name: evt.target.value})
    }

    updateAllergies = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({allergies: evt.target.value})
    }

    updatePlusOne = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            plusone: (evt.target.value === "0") ? false : true,
            plusoneinfo: (evt.target.value === "0") ? undefined : {name: "", allergies: ""}
        })
    }
}