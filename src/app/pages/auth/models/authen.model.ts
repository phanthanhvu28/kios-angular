export interface AuthenUserDto {
    access_token: string;
    token_type:string;
    id_token: string;
    scope: string;
    expires_in: string;  
}

export interface LoginUser {
    username: string;
    password:string;  
}

