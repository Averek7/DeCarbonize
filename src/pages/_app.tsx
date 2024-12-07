import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { StytchProvider } from '@stytch/nextjs';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createStytchUIClient } from '@stytch/nextjs/ui';

import { config } from '../wagmi';

import Layout from '../../components/Layout';
import { useRouter } from "next/router";

import { GlobalProvider } from '../../context/GlobalContext';

const client = new QueryClient();

const stytch = createStytchUIClient(
  "public-token-test-7e8b680a-9bf4-4cd8-8354-2e688c9afa05"
);

function MyApp({ Component, pageProps }: AppProps) {
  const content = <Component {...pageProps} />;
  const router = useRouter();

  const wrappedContent =
    router.pathname === "/api-doc" ? (
      content
    ) : (
      <div
        id="main-parent"
        className={`w-[100dvw] h-[100dvh] flex flex-1 flex-col bg-[#0C0D12] overflow-hidden nobar unselectable`}
      >
        <Layout>{content}</Layout>
      </div>
    );

  return (
    <StytchProvider stytch={stytch}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          {/* <RainbowKitProvider> */}
          <GlobalProvider>{wrappedContent}</GlobalProvider>
          {/* </RainbowKitProvider> */}
        </QueryClientProvider>
      </WagmiProvider>
    </StytchProvider>
  );
}

export default MyApp;
