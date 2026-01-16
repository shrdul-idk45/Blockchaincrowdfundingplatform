import { useState } from 'react';
import { CampaignList } from './components/CampaignList';
import { CampaignDetail } from './components/CampaignDetail';
import { CreateCampaign } from './components/CreateCampaign';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionHistory } from './components/TransactionHistory';

export type Milestone = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  unlocked: boolean;
  votesFor: number;
  votesAgainst: number;
  released: boolean;
};

export type Contribution = {
  id: string;
  campaignId: string;
  contributor: string;
  amount: number;
  currency: string;
  timestamp: number;
  txHash: string;
  rewardTier?: string;
};

export type Campaign = {
  id: string;
  title: string;
  creator: string;
  description: string;
  goal: number;
  raised: number;
  currency: string;
  deadline: number;
  category: string;
  imageUrl: string;
  milestones: Milestone[];
  contributions: Contribution[];
  status: 'active' | 'successful' | 'failed';
  rewardTiers: RewardTier[];
};

export type RewardTier = {
  id: string;
  title: string;
  amount: number;
  description: string;
  backers: number;
  maxBackers?: number;
};

export default function App() {
  const [view, setView] = useState<'explore' | 'create' | 'dashboard' | 'history'>('explore');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress] = useState('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Solar-Powered Water Purification for Rural Communities',
      creator: '0x1234...5678',
      description: 'Building sustainable water purification systems powered by solar energy for communities without access to clean water. Our innovative approach combines cutting-edge filtration technology with renewable energy to provide long-term solutions.',
      goal: 50000,
      raised: 35420,
      currency: 'ETH',
      deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
      category: 'Social Impact',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      status: 'active',
      milestones: [
        {
          id: 'm1',
          title: 'Research & Development',
          description: 'Complete prototype and testing phase',
          targetAmount: 15000,
          unlocked: true,
          votesFor: 142,
          votesAgainst: 8,
          released: true,
        },
        {
          id: 'm2',
          title: 'Manufacturing Setup',
          description: 'Establish production facility and source materials',
          targetAmount: 20000,
          unlocked: true,
          votesFor: 89,
          votesAgainst: 12,
          released: false,
        },
        {
          id: 'm3',
          title: 'Deployment & Training',
          description: 'Install systems and train local communities',
          targetAmount: 15000,
          unlocked: false,
          votesFor: 0,
          votesAgainst: 0,
          released: false,
        },
      ],
      contributions: [
        {
          id: 'c1',
          campaignId: '1',
          contributor: '0xabcd...efgh',
          amount: 5,
          currency: 'ETH',
          timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
          txHash: '0x9f3c...7a2b',
          rewardTier: 'bronze',
        },
      ],
      rewardTiers: [
        {
          id: 'bronze',
          title: 'Bronze Supporter',
          amount: 0.5,
          description: 'Recognition on our website + Project updates',
          backers: 45,
        },
        {
          id: 'silver',
          title: 'Silver Champion',
          amount: 2,
          description: 'Bronze rewards + Exclusive video updates + Certificate',
          backers: 28,
        },
        {
          id: 'gold',
          title: 'Gold Benefactor',
          amount: 5,
          description: 'Silver rewards + Site visit invitation + Plaque recognition',
          backers: 12,
          maxBackers: 20,
        },
      ],
    },
    {
      id: '2',
      title: 'Decentralized Education Platform for Developing Nations',
      creator: '0x9876...4321',
      description: 'Creating a blockchain-verified education platform that provides accessible learning resources and certificates for students in developing countries.',
      goal: 75000,
      raised: 62150,
      currency: 'ETH',
      deadline: Date.now() + 15 * 24 * 60 * 60 * 1000,
      category: 'Education',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      status: 'active',
      milestones: [
        {
          id: 'm1',
          title: 'Platform Development',
          description: 'Build core infrastructure and smart contracts',
          targetAmount: 30000,
          unlocked: true,
          votesFor: 234,
          votesAgainst: 15,
          released: true,
        },
        {
          id: 'm2',
          title: 'Content Creation',
          description: 'Develop curriculum and educational materials',
          targetAmount: 25000,
          unlocked: true,
          votesFor: 156,
          votesAgainst: 9,
          released: true,
        },
        {
          id: 'm3',
          title: 'Launch & Outreach',
          description: 'Deploy platform and onboard first 1000 students',
          targetAmount: 20000,
          unlocked: true,
          votesFor: 98,
          votesAgainst: 6,
          released: false,
        },
      ],
      contributions: [],
      rewardTiers: [
        {
          id: 'supporter',
          title: 'Education Supporter',
          amount: 1,
          description: 'Monthly progress reports + Community access',
          backers: 87,
        },
        {
          id: 'patron',
          title: 'Education Patron',
          amount: 5,
          description: 'Supporter rewards + Lifetime platform access + NFT Certificate',
          backers: 34,
        },
      ],
    },
    {
      id: '3',
      title: 'Ocean Cleanup Autonomous Drone System',
      creator: '0x5555...9999',
      description: 'Developing AI-powered autonomous drones to collect ocean plastic waste. Each drone uses machine learning to identify and collect debris efficiently.',
      goal: 100000,
      raised: 28750,
      currency: 'ETH',
      deadline: Date.now() + 45 * 24 * 60 * 60 * 1000,
      category: 'Environment',
      imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
      status: 'active',
      milestones: [
        {
          id: 'm1',
          title: 'Prototype Development',
          description: 'Build and test first prototype drone',
          targetAmount: 35000,
          unlocked: false,
          votesFor: 0,
          votesAgainst: 0,
          released: false,
        },
        {
          id: 'm2',
          title: 'Fleet Production',
          description: 'Manufacture 10 operational drones',
          targetAmount: 40000,
          unlocked: false,
          votesFor: 0,
          votesAgainst: 0,
          released: false,
        },
        {
          id: 'm3',
          title: 'Deployment',
          description: 'Deploy fleet to Pacific garbage patch',
          targetAmount: 25000,
          unlocked: false,
          votesFor: 0,
          votesAgainst: 0,
          released: false,
        },
      ],
      contributions: [],
      rewardTiers: [
        {
          id: 'tier1',
          title: 'Ocean Guardian',
          amount: 0.25,
          description: 'Digital thank you + Monthly impact reports',
          backers: 156,
        },
        {
          id: 'tier2',
          title: 'Wave Maker',
          amount: 2,
          description: 'Guardian rewards + Exclusive drone footage + Name on drone',
          backers: 23,
        },
        {
          id: 'tier3',
          title: 'Ocean Hero',
          amount: 10,
          description: 'Wave Maker rewards + Drone sponsorship + Annual impact trip',
          backers: 5,
          maxBackers: 10,
        },
      ],
    },
  ]);

  const handleCreateCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign]);
    setView('explore');
  };

  const handleContribute = (campaignId: string, contribution: Contribution) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          raised: c.raised + contribution.amount,
          contributions: [...c.contributions, contribution],
          rewardTiers: c.rewardTiers.map(tier => 
            tier.id === contribution.rewardTier 
              ? { ...tier, backers: tier.backers + 1 }
              : tier
          ),
        };
      }
      return c;
    }));
    
    if (selectedCampaign?.id === campaignId) {
      const updated = campaigns.find(c => c.id === campaignId);
      if (updated) {
        setSelectedCampaign({
          ...updated,
          raised: updated.raised + contribution.amount,
          contributions: [...updated.contributions, contribution],
        });
      }
    }
  };

  const handleVote = (campaignId: string, milestoneId: string, voteFor: boolean) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          milestones: c.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                votesFor: voteFor ? m.votesFor + 1 : m.votesFor,
                votesAgainst: !voteFor ? m.votesAgainst + 1 : m.votesAgainst,
              };
            }
            return m;
          }),
        };
      }
      return c;
    }));
  };

  const getAllContributions = () => {
    return campaigns.flatMap(c => c.contributions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header 
        view={view}
        setView={setView}
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
        userAddress={userAddress}
        onBack={() => setSelectedCampaign(null)}
        showBack={selectedCampaign !== null}
      />
      
      <main className="container mx-auto px-4 py-8">
        {view === 'explore' && !selectedCampaign && (
          <CampaignList 
            campaigns={campaigns}
            onSelectCampaign={setSelectedCampaign}
          />
        )}
        
        {view === 'explore' && selectedCampaign && (
          <CampaignDetail
            campaign={selectedCampaign}
            onContribute={handleContribute}
            onVote={handleVote}
            userAddress={userAddress}
            walletConnected={walletConnected}
          />
        )}
        
        {view === 'create' && (
          <CreateCampaign onCreateCampaign={handleCreateCampaign} />
        )}
        
        {view === 'dashboard' && (
          <Dashboard campaigns={campaigns} userAddress={userAddress} />
        )}
        
        {view === 'history' && (
          <TransactionHistory contributions={getAllContributions()} campaigns={campaigns} />
        )}
      </main>
    </div>
  );
}
