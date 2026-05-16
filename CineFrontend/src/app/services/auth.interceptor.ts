import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("🔥 INTERCEPTOR CALLED"); // MUST SHOW

  const token = localStorage.getItem('token');

  if (!token) return next(req);

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};