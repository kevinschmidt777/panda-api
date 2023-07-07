export interface IRoutePostAuthSignUpBody {
  email: string;
  password: string;
}

export interface IRoutePostAuthLoginBody {
  email: string;
  password: string;
}

export interface IRoutePostAuthChangePwBody {
  oldPassword: string;
  newPassword: string;
}
