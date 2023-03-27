export interface IContactCreateRequest {
    name: string
    email: string
    password: string
    clientsId: string
}

export interface IContactResponse {
    id: string
    name: string
    email: string
    createdAt: Date
}

export interface IContactUpdate {
    name?: string
    email?: string
    password?: string
    clientsId?: string
}

export interface IContactResponseUpdate {
    id: string
    name?: string
    email?: string
    clientsId?: string
    createdAt: Date
}