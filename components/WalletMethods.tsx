import { useConnect } from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';
import Image from 'next/image';
import Coinbase from '../assets/coinbase.png';
import Metamask from '../assets/metamask.png';
import { useEffect } from 'react';

interface WalletMethodsProps {
    authWithEthWallet: (connector: any) => Promise<void>;
    setView: React.Dispatch<React.SetStateAction<string>>;
}

const WalletMethods = ({ authWithEthWallet, setView }: WalletMethodsProps) => {
    const isMounted = useIsMounted();
    const { connectors } = useConnect();

    // Filter connectors to only include MetaMask and Coinbase Wallet
    const filteredConnectors = connectors.filter(connector =>
        ['metaMask', 'coinbaseWalletSDK'].includes(connector.id)
    );

    useEffect(() => {
        console.log('filteredConnectors', filteredConnectors);
        console.log('connectors', connectors);
    }, [filteredConnectors]);

    if (!isMounted) return null;

    return (
        <>
            <h1>Connect your web3 wallet</h1>
            <p>
                Connect your wallet then sign a message to verify you&apos;re the owner
                of the address.
            </p>
            <div className="buttons-container">
                {filteredConnectors.map(connector => (
                    <button
                        type="button"
                        className="btn btn--outline"
                        key={connector.id}
                        onClick={() => authWithEthWallet({ connector })}
                    >
                        <Image
                            src={connector.id === 'metaMask' ? Metamask : Coinbase}
                            alt={connector.name}
                            width={24}
                            height={24}/>

                        <span className="btn__label">Continue with {connector.name}</span>
                    </button>
                ))}
                <button onClick={() => setView('default')} className="btn btn--link">
                    Back
                </button>
            </div>
        </>
    );
};

export default WalletMethods;
