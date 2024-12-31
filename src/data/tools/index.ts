import { AITool } from '../types';

export const tools: AITool[] = [
  {
    id: '1',
    name: 'Bolt',
    description: 'An AI-powered development environment that helps you code faster and smarter.',
    features: [
      'Real-time code suggestions',
      'Natural language to code conversion',
      'Automated code reviews',
      'Context-aware completions'
    ],
    url: 'https://bolt.new',
    pricing: 'Free tier available',
    category: 'IDE',
    logo: 'zap'
  },
  {
    id: '2',
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer that helps you write code faster with smart suggestions.',
    features: [
      'Code completion',
      'Natural language understanding',
      'Multi-language support',
      'IDE integration'
    ],
    url: 'https://github.com/features/copilot',
    pricing: 'Subscription based',
    category: 'Copilot',
    logo: 'github'
  },
  {
    id: '3',
    name: 'Vercel AI SDK',
    description: 'Build AI-powered applications with Vercel\'s comprehensive SDK.',
    features: [
      'Streaming responses',
      'AI model integration',
      'Type-safe interfaces',
      'Edge runtime support'
    ],
    url: 'https://vercel.com',
    pricing: 'Pay as you go',
    category: 'Assistant',
    logo: 'triangle'
  }
];