import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './EditProfileForm.module.scss'
import {
  EditProfileFormValues,
  UserProfileData,
} from '../model/types/edit-profile.types'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'

interface EditProfileFormProps {
  userData: UserProfileData
  onSubmit: (data: EditProfileFormValues) => void
}

const schema = yup.object({
  userName: yup.string().min(2, 'Минимум 2 символа'),
  newPassword: yup.string().min(6, 'Минимум 6 символов').optional(),
})

export const EditProfileForm: FC<EditProfileFormProps> = ({
  userData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: userData.userName,
      newPassword: '',
    },
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_group}>
        <label>Email:</label>
        <div className={styles.email_text}>{userData.email}</div>
      </div>

      <div className={styles.form_group}>
        <label>Имя пользователя:</label>
        <input type='text' {...register('userName')} className={styles.input} />
        {errors.userName && (
          <span className={styles.error}>{errors.userName.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <label>Новый пароль:</label>
        <input
          type='password'
          {...register('newPassword')}
          className={styles.input}
        />
        {errors.newPassword && (
          <span className={styles.error}>{errors.newPassword.message}</span>
        )}
      </div>

      <DefaultButton
        type='submit'
        className={cn('action_button', styles.submit_button)}
      >
        Сохранить изменения
      </DefaultButton>
    </form>
  )
}
