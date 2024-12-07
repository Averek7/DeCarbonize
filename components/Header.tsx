import React, { useEffect } from "react";
import LoginModal from "./LoginModal";
import { ORIGIN, signInWithDiscord, signInWithGoogle } from '../utils/lit';
import { useGlobalContext } from "../context/GlobalContext";
import useAuthenticate from '../hooks/useAuthenticate';
import useSession from '../hooks/useSession';
import useAccounts from '../hooks/useAccounts';
import { useRouter } from 'next/router';
import Loading from "./Loading";
import AccountSelection from "./AccountSelection";
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";

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
  } = useAccounts();

  const {
    initSession,
    sessionSigs,
    loading: sessionLoading,
    error: sessionError,
  } = useSession();

  const router = useRouter();

  const error = authError || accountsError || sessionError;

  async function handleGoogleLogin() {
    await signInWithGoogle(redirectUri);
  }

  async function handleDiscordLogin() {
    await signInWithDiscord(redirectUri);
  }

  function goToSignUp() {
    router.push('/');
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
        <button onClick={handleLoginModal} className="cursor-pointer bg-[#192634] hover:bg-[#121D28] transition-all w-full sm:w-fit flex items-center rounded-md min-w-[8rem] h-10 px-5">
          <span className="connect-wallet text-white font-semibold rounded-md text-sm">
            Connect to Wallet
          </span>
        </button>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={closeLoginModal} handleGoogleLogin={handleGoogleLogin}
        handleDiscordLogin={handleDiscordLogin}
        authWithEthWallet={authWithEthWallet}
        authWithWebAuthn={authWithWebAuthn}
        authWithStytch={authWithStytch}
        signUp={goToSignUp}
        error={error} />
    </div>
  );
}

export default Header;
