export interface ResetForgotPasswordRequest{
    readonly Token: string,
    readonly Password: string,
    readonly ConfirmPassword: string
}