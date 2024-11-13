import { Guest } from "./Guest";
import { makeGuestList, MutableMap } from "./map";

const guestlist: MutableMap<Guest> = makeGuestList()

export const save = (guest: Guest): void => {
    guestlist.set(guest.name, guest)
}

export const load = (name: string): Guest => {
    return guestlist.get(name)
}

export const names = (): string[] => {
    return guestlist.names()
}

export const remove = (name: string): Guest | undefined => {
    return guestlist.delete(name)
}