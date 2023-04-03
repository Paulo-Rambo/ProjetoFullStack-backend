export interface IClientCreateRequest {
    name: string
    email: string
    telephone: string
    password: string
}

export interface IClient{
    id: string
    name: string
    email: string
    telephone: string
    createdAt: Date
}

export interface IClientResponse {
    data:IClient
    message:string
    
}

export interface IClientUpdate {
    name?: string
    email?: string
    telephone?: string
    password?: string
}