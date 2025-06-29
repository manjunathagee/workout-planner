import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils/test-utils'
import { FeatureCard } from '../FeatureCard'

describe('FeatureCard', () => {
  it('renders feature card with icon, title, and description', () => {
    const props = {
      icon: '⚡',
      title: 'Test Feature',
      description: 'This is a test feature description',
    }

    render(<FeatureCard {...props} />)

    expect(screen.getByText('⚡')).toBeInTheDocument()
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
  })

  it('renders shadcn/ui Card structure correctly', () => {
    const props = {
      icon: '🚀',
      title: 'Another Feature',
      description: 'Another description',
    }

    const { container } = render(<FeatureCard {...props} />)
    const card = container.firstChild as HTMLElement

    // Check card has proper shadcn/ui structure and classes
    expect(card).toHaveAttribute('data-slot', 'card')
    expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow')
    
    // Check card header exists
    const header = card.querySelector('[data-slot="card-header"]')
    expect(header).toBeInTheDocument()
    
    // Check card content exists
    const content = card.querySelector('[data-slot="card-content"]')
    expect(content).toBeInTheDocument()
    
    // Check title is in a card title element
    const title = card.querySelector('[data-slot="card-title"]')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Another Feature')
  })
})