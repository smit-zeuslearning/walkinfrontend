export interface ResetPasswordRequest{
    readonly oldPassword: string,
    readonly newPassword: string,
    readonly confirmNewPassword: string
}