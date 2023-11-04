import { TextInput, PasswordInput, Text, Group, Button, Stack, Grid, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'

import { useAuth } from 'app/hooks'

import authLogo from 'features/auth/assets/logo.png'

import { ALT_CONSTANTS } from 'common/constants'
import { Utils } from 'common/utils'

import { AUTH_FORM_KEYS_CONSTANTS } from 'features/auth/constants/auth-form-keys.constants'
import { AUTH_INIT_VALUES } from 'features/auth/constants/auth-form-value'
import { AUTH_CONSTANTS } from 'features/auth/constants/auth.constants'
import type { IAuthLogin } from 'features/auth/schemas/auth.schema'
import { AUTH_SCHEMA } from 'features/auth/schemas/auth.schema'

import styles from './auth-content.module.scss'

export const AuthContent = () => {
  const { handleLogin, isLoading } = useAuth()
  const form = useForm({
    initialValues: AUTH_INIT_VALUES,
    validate: (values: IAuthLogin) => Utils.validateZodSchema(AUTH_SCHEMA, values),
  })

  return (
    <Grid columns={2} className={styles.parent}>
      <Grid.Col className={styles.parentBackground}>
        <img src={authLogo} alt={ALT_CONSTANTS.LOGO} />
      </Grid.Col>
      <Grid.Col className={styles.parentForm}>
        <Box className={styles.parentFormContent}>
          <Text size='lg' weight={500}>
            {AUTH_CONSTANTS.TITLE}
          </Text>

          <form onSubmit={form.onSubmit(handleLogin)}>
            <Stack>
              <TextInput
                required
                radius='md'
                icon={<IconAt size='1rem' />}
                label={AUTH_CONSTANTS.EMAIL_LABEL}
                placeholder={AUTH_CONSTANTS.EMAIL_PLACEHOLDER}
                {...form.getInputProps(AUTH_FORM_KEYS_CONSTANTS.EMAIL)}
              />

              <PasswordInput
                required
                radius='md'
                icon={<IconLock size='1rem' />}
                label={AUTH_CONSTANTS.PASSWORD_LABEL}
                placeholder={AUTH_CONSTANTS.PASSWORD_PLACEHOLDER}
                {...form.getInputProps(AUTH_FORM_KEYS_CONSTANTS.PASSWORD)}
              />
            </Stack>

            <Group position='apart' mt='xl'>
              <Button loading={isLoading} type='submit' radius='md'>
                {AUTH_CONSTANTS.LOGIN}
              </Button>
            </Group>
          </form>
        </Box>
      </Grid.Col>
    </Grid>
  )
}
