/*
 * Package Import
 */
import React from 'react';

/*
 * Local Import
 */
import { Auth as AuthProvider } from './index.js';

/*
 * HoC
 */
export const withAuth = (Component) => (props) =>
  (
    <AuthProvider>
      <Component {...props} />
    </AuthProvider>
  );
