import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';
import Layout from '../../components/Layout';
import { useRouter } from "next/router";
import { GlobalProvider } from '../../context/GlobalContext';

const client = new QueryClient();

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <GlobalProvider>{wrappedContent}</GlobalProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
