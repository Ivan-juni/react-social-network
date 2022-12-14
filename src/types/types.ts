import { ChatMessageType } from "../api/chat-api"

// profile
export type postType = {
  map?: any
  id: number
  likes: number
  text: string
}
export type photosType = {
  small: string | null
  large: string | null 
}
export type contactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null 
}
export type profileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  contacts: contactsType
  photos: photosType
  aboutMe: string | null
  fullName: string
} 
export type profilePageType = {
  posts: postType
  profile: profileType
  status: string
}
// dialogs
export type usersDialogsType = {
  map?: any
  // map(arg0: (u: { name: string; id: number }) => JSX.Element): Array<JSX.Element>
  id: number
  name: string
} 

export type messagesDialogsType = {
  map?: any
  //map(arg0: (m: { message: string; id: number }) => JSX.Element): Array<JSX.Element>
  id: number
  message: string
}
export type dialogsPageType = {
  users: usersDialogsType
  messages: messagesDialogsType
}

// users 
export type userType = {
  id: number
  name: string
  status: string | null
  followed: boolean
  photos: photosType
}

export type FilterType = {
  term: string
  friend: null | boolean
}

export type usersPageType = {
  pageSize: number
  usersCount: number
  currentPage: number
  users: Array<userType>,
  isFetching: boolean,
  isFollowingInProgress: Array<number>, // array of user's id
  followingNow: Array<userType>,
  filter: FilterType
}
// sidebar
export type friendsType = {
  id: number
  name: string
  avatar: string
}

type sidebarType = {
  friends: Array<userType>
}

// auth
type authType = {
  userId: number | null
  email: string | null
  login: string| null
  isAuth: false
  captchaURL: string | null
}

// app
type appType = {
  initialized: boolean
}
// chat
export type statusType = 'pending' | 'ready' | 'error'
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

// useSelector
export interface RootState {
  usersPage: usersPageType
  dialogsPage: dialogsPageType
  profilePage: profilePageType
  sidebar: sidebarType
  auth: authType
  app: appType
  chat: {
    messages: ChatMessageType[]
    status: statusType
  }
}

// Formik
export type FormikType = {
  setSubmitting : (isSubmitting: boolean) => void
  setStatus: (arg0: string) => void
}