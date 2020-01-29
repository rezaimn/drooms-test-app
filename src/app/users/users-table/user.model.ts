export class UserModel {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
  latitude: number;
  longitude: number;

  constructor(user: any = {}) {
    this._id = user._id || '';
    this.index = user.index || -1;
    this.guid = user.guid || '';
    this.isActive = user.isActive || false;
    this.balance = user.balance || '';
    this.picture = user.picture || '';
    this.age = user.age || 0;
    this.eyeColor = user.eyeColor || '';
    this.name = user.name || '';
    this.gender = user.gender || '';
    this.company = user.company || '';
    this.email = user.email || '';
    this.phone = user.phone || '';
    this.address = user.address || '';
    this.registered = user.registered || '';
    this.latitude = user.latitude || 0;
    this.longitude = user.longitude || 0;
  }
}
