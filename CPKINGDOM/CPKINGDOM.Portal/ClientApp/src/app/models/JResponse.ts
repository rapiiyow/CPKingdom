export class JResponse {
    success: boolean;
    message: string;
    errorCode: string;
    data: any;
    total: number;
    constructor() {
        this.success = true;
        this.data = {};
        this.total = 0;
        this.errorCode = '';
        this.message = '';
    }
}
