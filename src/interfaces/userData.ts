export interface UserData {
    email: string;
    is_admin: number;
    last_login: string;
    name: string;
    phone: string;
    runs_visited: number;
}

export const userDataInitialState: UserData = {
    email: '',
    is_admin: 0,
    last_login: '',
    name: '',
    phone: '',
    runs_visited: 0,
}