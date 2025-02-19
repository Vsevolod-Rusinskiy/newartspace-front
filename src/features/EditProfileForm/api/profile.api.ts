import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'
import {
  EditProfileFormValues,
  UserProfileData,
} from '../model/types/edit-profile.types'

export const profileApi = {
  async getUserInfo(): Promise<UserProfileData> {
    const authData = getAuthDataFromLS('auth')
    const response = await axiosInstance.get('/profile/info', {
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    })
    return response.data
  },

  async updateProfile(data: EditProfileFormValues) {
    const authData = getAuthDataFromLS('auth')
    const response = await axiosInstance.patch('/profile/info', data, {
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    })
    return response.data
  },
}
