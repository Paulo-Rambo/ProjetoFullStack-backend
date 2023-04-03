export interface IContactCreateRequest {
    name: string
    email: string
    telephone: string
    password: string
}

export interface IContact {
    id: string
    name: string
    email: string
    telephone: string
    createdAt: Date
}

export interface IContactResponse {
    data: IContact
    message: string
}

export interface IContactUpdate {
    name?: string
    email?: string
    telephone?: string
    password?: string
}

export interface IContactResponseUpdate {
    id: string
    name: string
    email: string
    telephone: string
    createdAt: Date
}