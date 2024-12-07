import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { ORIGIN, registerWebAuthn, signInWithDiscord, signInWithGoogle } from '../utils/lit';
import { useGlobalContext } from "../context/GlobalContext";
import useAuthenticate from '../hooks/useAuthenticate';
import useSession from '../hooks/useSession';
import useAccounts from '../hooks/useAccounts';
import { useRouter } from 'next/router';
import Loading from "./Loading";
import AccountSelection from "./AccountSelection";
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";
import { AuthMethodType } from '@lit-protocol/constants';

function Header({
  sidebar,
  toggleSidebar,
}: {
  sidebar: boolean;
  toggleSidebar: () => void;
}) {
  const { isModalOpen, setModalOpen } = useGlobalContext();
  const redirectUri = ORIGIN;

  const {
    authMethod,
    authWithEthWallet,
    authWithWebAuthn,
    authWithStytch,
    loading: authLoading,
    error: authError,
  } = useAuthenticate(redirectUri);

  const {
    fetchAccounts,
    setCurrentAccount,
    currentAccount,
    accounts,
    loading: accountsLoading,
    error: accountsError,
    createAccount,
  } = useAccounts();

  const {
    initSession,
    sessionSigs,
    loading: sessionLoading,
    error: sessionError,
  } = useSession();

  const router = useRouter();
  const [coinBalance, setCoinBalance] = useState(0);
  const error = authError || accountsError || sessionError;

  if (error) {
    if (authError) {
      console.error('Auth error:', authError);
    }

    if (accountsError) {
      console.error('Accounts error:', accountsError);
    }

    if (sessionError) {
      console.error('Session error:', sessionError);
    }
  }

  async function handleGoogleLogin() {
    await signInWithGoogle(redirectUri);
  }

  async function handleDiscordLogin() {
    await signInWithDiscord(redirectUri);
  }

  function goToSignUp() {
    router.push('/');
  }

  async function registerWithWebAuthn() {
    const newPKP = await registerWebAuthn();
    if (newPKP) {
      setCurrentAccount(newPKP);
    }
  }

  useEffect(() => {
    // If user is authenticated, fetch accounts
    if (authMethod) {
      router.replace(window.location.pathname, undefined, { shallow: true });
      fetchAccounts(authMethod);
    }
  }, [authMethod, fetchAccounts]);

  useEffect(() => {
    // If user is authenticated and has selected an account, initialize session
    if (authMethod && currentAccount) {
      initSession(authMethod, currentAccount);
    }
  }, [authMethod, currentAccount, initSession]);


  useEffect(() => {
    if (currentAccount) {
      setCoinBalance(100);
    }
  }, [currentAccount]);

  const handleLogout = () => {
    setCurrentAccount(null);
    router.push("/");
  };

  // If user is authenticated and has selected an account, initialize session
  if (currentAccount && sessionSigs) {
    return (
      <Dashboard currentAccount={currentAccount} sessionSigs={sessionSigs} />
    );
  }

  // If user is authenticated and has more than 1 account, show account selection
  if (authMethod && accounts.length > 0) {
    return (
      <AccountSelection
        accounts={accounts}
        setCurrentAccount={setCurrentAccount}
        error={error}
      />
    );
  }

  // If user is authenticated but has no accounts, prompt to create an account
  if (authMethod && accounts.length === 0) {
    return <CreateAccount signUp={goToSignUp} error={error} />;
  }

  if (currentAccount && sessionSigs) {
    return (
      <Dashboard currentAccount={currentAccount} sessionSigs={sessionSigs} />
    );
  }

  useEffect(() => {
    // If user is authenticated, create an account
    // For WebAuthn, the account creation is handled by the registerWithWebAuthn function
    if (authMethod && authMethod.authMethodType !== AuthMethodType.WebAuthn) {
      router.replace(window.location.pathname, undefined, { shallow: true });
      createAccount(authMethod);
    }
  }, [authMethod, createAccount]);

  useEffect(() => {
    // If user is authenticated and has at least one account, initialize session
    if (authMethod && currentAccount) {
      initSession(authMethod, currentAccount);
    }
  }, [authMethod, currentAccount, initSession]);


  // Loadings................................

  if (authLoading) {
    return (
      <Loading copy={'Authenticating your credentials...'} error={error} />
    );
  }

  if (accountsLoading) {
    return <Loading copy={'Looking up your accounts...'} error={error} />;
  }

  if (sessionLoading) {
    return <Loading copy={'Securing your session...'} error={error} />;
  }

  const handleLoginModal = () => {
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="w-full flex flex-row justify-between items-center h-16 bg-gradient-to-r from-[#6E67F4] to-[#4D3EB3] px-3">
      <div className="">Logo</div>
      <div className="max-w-full">
        {currentAccount && (
          <div className="flex items-center">
            <div className="flex flex-row items-center">
              {/* Profile Circle */}
              <div className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center text-white">
                {currentAccount?.slice(0, 1)} {/* Placeholder for profile initials */}
              </div>

              {/* Coin Balance */}
              <div className="ml-4 text-white font-semibold">
                {coinBalance} Coins
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Login Button */}
        {!currentAccount && (
          <div className="max-w-full">
            <button onClick={handleLoginModal} className="cursor-pointer bg-[#192634] hover:bg-[#121D28] transition-all w-full sm:w-fit flex items-center rounded-md min-w-[8rem] h-10 px-5">
              <span className="connect-wallet text-white font-semibold rounded-md text-sm">
                Connect to Wallet
              </span>
            </button>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onClose={closeLoginModal}
        handleGoogleLogin={handleGoogleLogin}
        handleDiscordLogin={handleDiscordLogin}
        authWithEthWallet={authWithEthWallet}
        authWithWebAuthn={authWithWebAuthn}
        authWithStytch={authWithStytch}
        signUp={goToSignUp}
        error={error}
        registerWithWebAuthn={registerWithWebAuthn}
      />
    </div>
  );
}

export default Header;
