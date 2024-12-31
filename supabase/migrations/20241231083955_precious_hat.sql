/*
  # Add AI coding tools

  1. New Data
    - Adds initial set of AI coding tools:
      - Bolt
      - Lovable
      - CLine
      - Gemini Coder

  2. Changes
    - Inserts new records into the tools table
*/

INSERT INTO tools (name, description, features, url, pricing, category, logo)
VALUES
  (
    'Bolt',
    'An intelligent AI assistant that helps developers write better code faster with context-aware suggestions and real-time assistance.',
    ARRAY[
      'Context-aware code completion',
      'Natural language processing',
      'Intelligent code suggestions',
      'Multi-language support'
    ],
    'https://bolt.new',
    'Free tier available',
    'IDE',
    'zap'
  ),
  (
    'Lovable',
    'AI-powered code review assistant that helps maintain code quality and consistency across your projects.',
    ARRAY[
      'Automated code reviews',
      'Style guide enforcement',
      'Security vulnerability detection',
      'Performance optimization suggestions'
    ],
    'https://lovable.dev',
    'Starting at $10/month',
    'Assistant',
    'triangle'
  ),
  (
    'CLine',
    'Command-line AI coding assistant that enhances your terminal workflow with intelligent suggestions.',
    ARRAY[
      'Terminal integration',
      'Git operations assistance',
      'Command suggestions',
      'Shell script optimization'
    ],
    'https://cline.tools',
    'Free for open source',
    'Copilot',
    'triangle'
  ),
  (
    'Gemini Coder',
    'Advanced AI pair programmer powered by Google''s Gemini model for sophisticated code generation and analysis.',
    ARRAY[
      'Advanced code generation',
      'Contextual understanding',
      'Multi-file analysis',
      'Documentation generation'
    ],
    'https://gemini-coder.dev',
    'Pay as you go',
    'Copilot',
    'github'
  );