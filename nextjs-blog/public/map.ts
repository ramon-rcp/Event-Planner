import { Guest } from "./Guest";

export interface MutableMap<T> {
    set: (key: string, value: T) => void;

    // returns undefined if the key didn't exist
    get: (key: string) => T;

    // returns undefined if the key didn't exist
    delete: (key: string) => T | undefined; 

    has: (key: string) => boolean;

    names: () => string[];
}

class MyMap<T> implements MutableMap<T> {
    map: Map<string, T>;

    constructor(){
        this.map = new Map();
    }

    set = (key: string, val: T): void => {
        this.map.set(key, val)
    }

    get = (key: string): T => {
        const obj: T | undefined = this.map.get(key)
        if(obj === undefined){
            throw new Error("key doesn't exist")
        }
        return obj
    }

    delete = (key: string): T | undefined => {
        const item: T | undefined = this.map.get(key)
        this.map.delete(key)
        return item
    }

    has = (key: string): boolean => {
        return this.map.has(key)
    }

    names = (): string[] => {
        return Array.from(this.map.keys())
    }
}

export const makeGuestList = (): MutableMap<Guest> => {return new MyMap<Guest>}