import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Guest } from "./Guest";
import { remove, save } from "./server";
import { Show } from "./App";

const KID_LIMIT: number = 20

type GiProps = {
    guest: Guest
    openGL: (page: Show) => void
}

type GiState = {
    name: string,
    allergies: string,
    kids: string,
    plusone: boolean,
    kidinfo?: {
        names: string[]
        allergies: string[]
    }
    plusoneinfo?: {
        name: string
        allergies: string
    }
    errormsg: "" |
        "Can't have negative kids" |
        "Please stop having kids" |
        "Name can't be blank" |
        "Plus one's name can't be blank" |
        "None of the kid's names can be blank"
}

export class GuestInfo extends Component<GiProps, GiState> {
    constructor(props: GiProps){
        super(props)

        this.state = {
            name: props.guest.name,
            allergies: props.guest.allergies,
            kids: props.guest.kids.toString(),
            plusone: props.guest.plusone,
            kidinfo: props.guest.kidinfo,
            plusoneinfo: props.guest.plusoneinfo,
            errormsg: ""
        }
    }

    render = (): JSX.Element => {
        return <main>
            <h2>
                Guest Information
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
            <button onClick={this.addGuest}>Save</button>
            <button onClick={this.goBack}>Back</button>
            <button onClick={this.deleteGuest}>Delete</button>
            <p>{this.state.errormsg}</p>
        </main>
    }

    renderKids = (): JSX.Element => {
        const html: JSX.Element[] = []
        for(let i:number = 0; i<Number(this.state.kids); i++){
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

    deleteGuest = (evt: MouseEvent<HTMLButtonElement>): void => {
        remove(this.props.guest.name)
        this.props.openGL("guestlist")
    }

    goBack = (evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.openGL("guestlist")
    }

    addGuest = (evt: MouseEvent<HTMLButtonElement>): void => {
        if(this.state.name === ""){
            this.setState({errormsg: "Name can't be blank"})
            return;
        }
        if(this.state.plusoneinfo?.name === ""){
            this.setState({errormsg: "Plus one's name can't be blank"})
            return;
        }
        if(this.state.kidinfo?.names.includes("")){
            this.setState({errormsg: "None of the kid's names can be blank"})
            return;
        }
        if(Number(this.state.kids) < 0){
            this.setState({errormsg: "Can't have negative kids"})
            return;
        }
        save({
            name: this.state.name, 
            kids: Number(this.state.kids), 
            allergies: this.state.allergies,
            plusone: this.state.plusone,
            plusoneinfo: this.state.plusoneinfo,
            kidinfo: this.state.kidinfo
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
        if(n > KID_LIMIT){
            this.setState({errormsg: "Please stop having kids"})
            return;
        }
        this.setState({
            errormsg: "",
            kids: evt.target.value,
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