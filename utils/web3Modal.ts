import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
} from "@web3modal/wagmi/vue";
import { mainnet } from "viem/chains";

// Define constants
const projectId = "3fbb6bba6f1de962d911bb5b5c9dba88";

// Create wagmiConfig
const metadata = {
  name: "Questora",
  description: "Questora Network",
  url: 'https://questora.io/airdrop/',
  icons: [],
};

const chains = [mainnet];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableCoinbase: true,
  auth: {
    email: false,
  },
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableOnramp: true,
});
const modal = useWeb3Modal();

export { modal, config };
