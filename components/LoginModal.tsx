import React, { useState } from "react";

import AuthMethods from './AuthMethods';
import WalletMethods from './WalletMethods';
import WebAuthn from './WebAuthn';
import StytchOTP from './StytchOTP';
import SignUpMethods from './SignUpMethods';
import { useRouter } from "next/router";

type AuthView = 'default' | 'email' | 'phone' | 'wallet' | 'webauthn' | 'signup';

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    handleGoogleLogin: () => Promise<void>;
    handleDiscordLogin: () => Promise<void>;
    authWithEthWallet: any;
    authWithWebAuthn: any;
    authWithStytch: any;
    signUp: any;
    error?: Error;
    registerWithWebAuthn: () => Promise<void>;
}

const LoginModal = ({
    isOpen,
    onClose,
    handleGoogleLogin,
    handleDiscordLogin,
    authWithEthWallet,
    authWithWebAuthn,
    authWithStytch,
    signUp,
    error,
    registerWithWebAuthn,
}: LoginProps) => {
    if (!isOpen) return null;
    const router = useRouter()
    const [view, setView] = useState<AuthView>('default');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/4 relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 w-10 h-10"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &#x2715;
                </button>
                <div className="container">
                    <div className="wrapper">
                        {error && (
                            <div className="alert alert--error">
                                <p>{error.message}</p>
                            </div>
                        )}
                        {view === 'default' && (
                            <>
                                <h1>Welcome back</h1>
                                <p>Access your Lit wallet.</p>
                                <AuthMethods
                                    handleGoogleLogin={handleGoogleLogin}
                                    handleDiscordLogin={handleDiscordLogin}
                                    setView={setView as any}
                                />
                                <div className="buttons-container">
                                    <button
                                        type="button"
                                        className="btn btn--link"
                                        onClick={() => setView('signup')}
                                    >
                                        Need an account? Sign up
                                    </button>
                                </div>
                            </>
                        )}
                        {view === 'signup' && (
                            <>
                                <h1>Create your account</h1>
                                <SignUpMethods
                                    handleGoogleLogin={handleGoogleLogin}
                                    handleDiscordLogin={handleDiscordLogin}
                                    authWithEthWallet={authWithEthWallet}
                                    registerWithWebAuthn={registerWithWebAuthn}
                                    authWithWebAuthn={authWithWebAuthn}
                                    authWithStytch={authWithStytch}
                                    goToLogin={() => router.push('/')}
                                    error={error}
                                />
                                <div className="buttons-container">
                                    <button
                                        type="button"
                                        className="btn btn--link"
                                        onClick={() => setView('default')}
                                    >
                                        Already have an account? Log in
                                    </button>
                                </div>
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
                                start={'authenticate'}
                                authWithWebAuthn={authWithWebAuthn}
                                setView={setView as any}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
