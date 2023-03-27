export interface IClientCreateRequest {
    name: string
    email: string
    password: string
}

export interface IClientResponse {
    id: string
    name: string
    email: string
    createdAt: Date
}

export interface IClientUpdate {
    name?: string
    email?: string
    password?: string
}