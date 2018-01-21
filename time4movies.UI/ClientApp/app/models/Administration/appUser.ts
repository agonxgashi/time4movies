export class AppUser{

    constructor() {

    }

    id        : number;
    firstName : string;
    lastName  : string;
    username  : string;
    email     : string;
    password: string;
    newpassword: string;
    userTypeId: number;
    userType  : string;
    createDate: Date;
    isActive: boolean;
    bio: string;
    profileQr: string;
}