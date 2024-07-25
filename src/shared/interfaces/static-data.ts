import { IAuthUser } from 'src/theme/app/modules/auth/interfaces/auth.interface';


export const initialAuthUserValues: IAuthUser = {
  profilePublicId: null,
  createdAt: null,
  email: null,
  emailVerificationToken: null,
  emailVerified: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  profilePicture: null,
  updatedAt: null,
  username: null,
  browserName: null,
  deviceType: null,
  uId: null,
  avatarColor: null,
  authId: null
};


export const PASSWORD_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password'
};
