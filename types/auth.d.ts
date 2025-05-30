interface AuthCookie {
  auth: {
    accessToken: string
    refreshToken: string
  }
}

enum UserStatus {
  PENDING = 3,
  APPROVED = 4,
  DENIED = 5
}


interface AppUser {
  id: number
  username: string
  fullName: string
  email: string | null
  type: number
  permissions: array
  status?: number
  groupUserId?: number
  phoneNumber?: string | null
  avatarUrl?: string | null
  gender?: string
}

interface AuthMenu {
  id: string
  name: string
  href: string
  rules: string[]
  icon?: string
  current?: boolean
  roles?: number[]
  subMenu?: AuthMenu[]
  permission?: number
}

interface UserPermission {
  id: string
  name: string
}

interface LoginBody {
  username: string
  password: string
}

interface LoginResponse {
  data: {
    user: AppUser
    accessToken: string
    refreshToken: string
  }
}

interface UpdatePasswordBody {
  token: string
  newPassword: string
}

interface ChangePasswordBody {
  currentPassword: string,
  newPassword: string
}

// type UpdatePasswordResponseMessage = 'SUCCESS' | 'INVALID_TOKEN'

// interface UpdatePasswordResponse extends CommonAPIResponse {
//   message: UpdatePasswordResponseMessage
// }

interface ForgotPasswordBody {
  email: string
}

interface PublicRegisterBody {
  type: UserRole
  username: string
  password: string
  fullName: string
  email: string
  phoneNumber: string
  avatarUrl?: string
  gender?: number
}

interface UpdateUserBody {
  fullName?: string
  email?: string
  phoneNumber?: string
  avatarUrl?: string
  gender?: string
}

interface RefreshTokenResponse extends CommonAPIResponse<{
  accessToken: string
  refreshToken: string
}> { }
