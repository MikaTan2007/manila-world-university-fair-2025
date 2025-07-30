'use client';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export function useNavigation() {
  const router = useRouter();

  const navigate = (path: string) => {
    NProgress.start();
    router.push(path);
  };

  const replace = (path: string) => {
    NProgress.start();
    router.replace(path);
  };

  const back = () => {
    NProgress.start();
    router.back();
  };

  return {
    navigate,
    replace,
    back,
    // Still expose original router methods if needed
    router
  };
}