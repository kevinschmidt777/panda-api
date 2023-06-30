export interface IRoutePostAuthSignUpBody {
  email: string;
  password: string;
}

export interface IRoutePostAuthLoginBody {
  email: string;
  password: string;
}

export interface IRoutePostChangePwBody {
  oldPassword: string;
  newPassword: string;
}
