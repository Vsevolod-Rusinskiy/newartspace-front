export interface EditProfileFormValues {
  userName: string
  newPassword?: string
}

export interface EditProfileResponse {
  message: string
}

export interface UserProfileData {
  id: number
  userName: string
  email: string
}
