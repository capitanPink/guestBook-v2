export class SearchFormModel {

  firstName: string;
  lastName: string;
  email: string;
  commentText: string;

  constructor(firstName?: string,
              lastName?: string,
              email?: string,
              commentText?: string) {
                this.firstName = firstName ? firstName: '';
                this.lastName = lastName ? lastName: '';
                this.email = email ? email: '';
                this.commentText = commentText ? commentText: '';
              }
              
}