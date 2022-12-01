export class Staff {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    contactNo: string;
    roleId: number;
    roleName: string;
    fullName: string;
    constructor() {
        this.id = 0;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.address = '';
        this.contactNo = '';
        this.roleId = 0;
        this.roleName = '';
        this.fullName = this.firstName + ' ' + this.lastName;
    }
}