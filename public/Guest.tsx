export type Guest = {
    name: string,
    allergies: string,
    kids: number,
    kidinfo?: {
        names: string[]
        allergies: string[]
    }
    plusone: boolean,
    plusoneinfo?: {
        name: string
        allergies: string
    }
}