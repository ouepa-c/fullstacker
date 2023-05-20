import { Roles } from '../../../enum/global'

export interface PermissionsMap {
  [key: number]: Roles[]
}

/**
 * @description 权限映射关系
 * */
export const permissionMap: PermissionsMap = {
  [Roles.SUPER_ADMIN]: [Roles.AREA_ADMIN, Roles.ORDINARY],
  [Roles.AREA_ADMIN]: [Roles.ORDINARY],
  [Roles.ORDINARY]: []
}
