import InitialsAvatar from 'react-initials-avatar'

import classNames from 'classnames'

import styles from './home-user-list.module.scss'

import 'react-initials-avatar/lib/ReactInitialsAvatar.css'

export const HomeUserList = ({ users, activeUser, setActiveUser }: any) => {
  return (
    <div className={styles.parent}>
      {users?.map((user: any) => (
        <>
          <div
            onClick={() => setActiveUser(user)}
            className={classNames(styles.parentCard, {
              [styles.parentActiveCard]: activeUser?.email === user?.email,
            })}>
            <InitialsAvatar name={user?.name} />
            <div className={styles.parentCardInfo}>
              <p className={styles.parentName}>{user?.name}</p>
              <p className={styles.parentLastMessage}>{user?.email}</p>
            </div>
            {activeUser?.email === user?.email && <div className={styles.parentActive} />}
          </div>

          <hr />
        </>
      ))}
    </div>
  )
}
