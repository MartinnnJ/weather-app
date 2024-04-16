export default class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public avatarId: string,
  ) {}
}