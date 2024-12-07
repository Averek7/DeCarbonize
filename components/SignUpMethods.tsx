import { useState } from 'react';

import AuthMethods from './AuthMethods';
import WalletMethods from './WalletMethods';
import WebAuthn from './WebAuthn';
import StytchOTP from './StytchOTP';
import { SELECTED_LIT_NETWORK } from '../utils/lit';

interface SignUpProps {
    handleGoogleLogin: () => Promise<void>;
    handleDiscordLogin: () => Promise<void>;
    authWithEthWallet: any;
    registerWithWebAuthn: any;
    authWithWebAuthn: any;
    authWithStytch: any;
    goToLogin: any;
    error?: Error;
}

type AuthView = 'default' | 'email' | 'phone' | 'wallet' | 'webauthn';

export default function SignUpMethods({
    handleGoogleLogin,
    handleDiscordLogin,
    authWithEthWallet,
    registerWithWebAuthn,
    authWithWebAuthn,
    authWithStytch,
    goToLogin,
    error,
}: SignUpProps) {
    const [view, setView] = useState<AuthView>('default');

    return (
        <div className="">
            <div className="wrapper">
                {error && (
                    <div className="alert alert--error">
                        <p>{error.message}</p>
                    </div>
                )}
                {view === 'default' && (
                    <>
                        <h1>Get started on the {SELECTED_LIT_NETWORK} network</h1>
                        <p>
                            Create a wallet that is secured by accounts you already have. With
                            Lit-powered programmable MPC wallets, you won&apos;t have to worry
                            about seed phrases.
                        </p>
                        <AuthMethods
                            handleGoogleLogin={handleGoogleLogin}
                            handleDiscordLogin={handleDiscordLogin}
                            setView={setView as any}
                        />
                    </>
                )}
                {view === 'email' && (
                    <StytchOTP
                        method={'email'}
                        authWithStytch={authWithStytch}
                        setView={setView as any}
                    />
                )}
                {view === 'phone' && (
                    <StytchOTP
                        method={'phone'}
                        authWithStytch={authWithStytch}
                        setView={setView as any}
                    />
                )}
                {view === 'wallet' && (
                    <WalletMethods
                        authWithEthWallet={authWithEthWallet}
                        setView={setView as any}
                    />
                )}
                {view === 'webauthn' && (
                    <WebAuthn
                        start={'register'}
                        authWithWebAuthn={authWithWebAuthn}
                        setView={setView as any}
                        registerWithWebAuthn={registerWithWebAuthn}
                    />
                )}
            </div>
        </div>
    );
}