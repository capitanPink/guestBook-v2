export class SearchObjectModel {
    
    firstName: string;
    lastName: string;
    email: string;
    commentsPerPage: number;
    
    constructor(firstName?: string,
                lastName?: string,
                email?: string,
                commentsPerPage?: number) {
                    this.firstName = firstName ? firstName: '';
                    this.lastName = lastName ? lastName: '';
                    this.email = email ? email: '';
                    this.commentsPerPage = commentsPerPage ? commentsPerPage: 10;
    }
}