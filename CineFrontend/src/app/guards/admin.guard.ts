import { CanActivateFn }
from '@angular/router';

import { inject }
from '@angular/core';

import { Router }
from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const role = localStorage.getItem('role');

  if (role !== 'Admin') {

    router.navigate(['/']);

    return false;
  }

  return true;
};