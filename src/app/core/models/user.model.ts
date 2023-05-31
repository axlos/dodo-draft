export interface User {
  readonly _id: string;
  readonly fullName: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly sub: string;
  readonly setupProfile: number;
}
