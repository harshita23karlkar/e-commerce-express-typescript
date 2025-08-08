export type signupRequestData = {
    name: string,
    email: string,
    password: string,
    address: "",
    phoneNumber: "",
    role: string,
    profileImage: string
}


export type jwtPayloadType = {
    id: string,
    email: string,
    role: string
}

export interface decodedUserType {
    id: string,
    email: string,
    role: string
}