import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { AUTHOR_ROUTERS } from './routes';

const getArrayParentFromChildName = (
  name,
  routers = { name: '', children: AUTHOR_ROUTERS },
  // eslint-disable-next-line
) => {
  if (routers.name === name) return [];
  if (Array.isArray(routers.children)) {
    // eslint-disable-next-line
    for (const router of routers.children) {
      const result = getArrayParentFromChildName(name, router);
      if (Array.isArray(result)) {
        return [router.path].concat(result);
      }
    }
  }
};

export const getPathRouterByName = (name) =>
  getArrayParentFromChildName(name).join('');

const currentRole = getLocalStorage(LOCAL_STORAGE_KEY.ROLE);

export const hasPermission = (item) =>
  item?.meta?.roles.includes(currentRole) === true;
