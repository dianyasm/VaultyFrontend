export default interface User{
    id: number
    name: string
    surname?: string
    email: string
    password: string
    active: boolean
    acceptNotifications: boolean
    role: string
}