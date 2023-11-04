import { useEffect, useRef, useState } from 'react'
import InitialsAvatar from 'react-initials-avatar'

import { Badge, Button, Input } from '@mantine/core'
import classNames from 'classnames'

import { useApiResponse, useAuth } from 'app/hooks'

import { HomeUserList } from 'features/home/components/home-user-list/home-user-list'
import empty from 'features/home/empty.png'
import {
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetChatsQuery,
  useGetUsersQuery,
} from 'features/home/store/api/home.api'

import styles from './home-content.module.scss'

import 'react-initials-avatar/lib/ReactInitialsAvatar.css'

export const HomeContent = () => {
  const ref = useRef(null)
  const { user, handleLogout } = useAuth()
  const { processApiResponse } = useApiResponse()
  const [activeUser, setActiveUser] = useState(null)
  const { data: users } = useGetUsersQuery(null, { pollingInterval: 500 })
  const { data: chats } = useGetChatsQuery(null, {
    skip: !activeUser,
    pollingInterval: 10000,
  })

  const [createChat, { isLoading: isCreating }] = useCreateChatMutation()
  const [createMessage, { isLoading }] = useCreateMessageMutation()

  useEffect(() => {
    if (users?.length && !activeUser) {
      setActiveUser(users[0])
    }
  }, [users])

  const chat = chats?.find((chat: any) => chat?.receiverEmail === activeUser?.email)

  const handleCreateMessage = async () => {
    if (!ref.current.value) return
    if (!chat) {
      const response = await createChat({ receiverId: activeUser.id, content: ref.current.value })
      processApiResponse(response, {
        successCallback: () => {
          ref.current.value = ''
          ref.current.focus()
        },
      })
      return
    }
    const response = await createMessage({ id: chat.id, data: { content: ref.current.value } })
    processApiResponse(response, {
      successCallback: () => {
        ref.current.value = ''
        ref.current.focus()
      },
    })
  }

  return (
    <>
      <header className={styles.parentHeader}>
        <span>Welcome: {user?.name}</span>
        <Button onClick={handleLogout}>Logout</Button>
      </header>

      <div className={styles.parent}>
        <HomeUserList users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
        <div className={styles.parentChat}>
          <div className={styles.parentMessages}>
            <div className={styles.parentHead}>
              {!chat ? (
                <h1>You have no messages with {activeUser?.email}</h1>
              ) : (
                <h1>Your message history with {activeUser?.email}</h1>
              )}
            </div>

            {!chat ? (
              <div className={styles.parentNoMessages}>
                <img src={empty} alt='' />
              </div>
            ) : (
              <div className={styles.parentMessages}>
                {chat?.messages?.map((message: any) => (
                  <div
                    key={message.id}
                    className={classNames(styles.parentMessage, {
                      [styles.parentMyMessage]: message.senderId !== chat.receiverId,
                    })}>
                    {message.senderId === chat.receiverId ? (
                      <>
                        <InitialsAvatar name={chat?.receiverName} />
                      </>
                    ) : (
                      <>
                        <InitialsAvatar name={user.name} />
                      </>
                    )}
                    <Badge>{message.content}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.parentSubmit}>
            <Input ref={ref} style={{ width: '100%' }} placeholder='Type here' />
            <Button onClick={handleCreateMessage} loading={isLoading || isCreating}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
