import React from 'react';
import {
  UserButton, SignInButton, SignedIn, SignedOut,
} from '@clerk/clerk-react';

export default () => (
  <>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal">
        <button type="button" className="link" style={{ paddingTop: '0.1rem' }}>Login</button>
      </SignInButton>
    </SignedOut>
  </>
);
