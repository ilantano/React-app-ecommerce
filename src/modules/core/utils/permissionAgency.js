import { ROLES } from '@/router/constants';

const roleAgencys = [
  ROLES.ROLE_ADMIN_AGENCY,
  ROLES.ROLE_SUPER_ADMIN_AGENCY,
  ROLES.ROLE_AGENCY,
];

const hasPermissionAgency = (item) => roleAgencys.includes(item) === true;

export default hasPermissionAgency;
