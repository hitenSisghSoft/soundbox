// Mock all icon imports BEFORE importing anything else
jest.mock('../icons/index', () => {
  const React = require('react')
  return {
    GridIcon: () => React.createElement('svg', { 'data-testid': 'grid-icon' }),
    UserCircleIcon: () => React.createElement('svg', { 'data-testid': 'user-circle-icon' }),
    BoxCubeIcon: () => React.createElement('svg', { 'data-testid': 'box-cube-icon' }),
  }
})

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RoleProvider, useRole } from '@/context/RoleContext'
import { UserRole } from '@/types/roles'


// Test component that uses the RoleContext
function TestComponent() {
  const { userRole, menuItems } = useRole()
  
  return (
    <div>
      <h1>Current Role: {userRole}</h1>
      <ul>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <li key={index}>
              <IconComponent />
              <span>{item.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

describe('RoleContext', () => {
  it('renders without errors for ADMIN role', () => {
    render(
      <RoleProvider>
        <TestComponent />
      </RoleProvider>
    )
    
    expect(screen.getByText(/Current Role:/)).toBeInTheDocument()
  })

  it('renders without errors for MERCHANT role', () => {
    // Mock localStorage to set merchant role
    Storage.prototype.getItem = jest.fn(() => UserRole.MERCHANT)
    
    render(
      <RoleProvider>
        <TestComponent />
      </RoleProvider>
    )
    
    expect(screen.getByText(/Current Role:/)).toBeInTheDocument()
  })

  it('renders menu items with icon components', () => {
    render(
      <RoleProvider>
        <TestComponent />
      </RoleProvider>
    )
    
    // Check that menu items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('does not throw serialization errors with icons', () => {
    // This test ensures that icons stored as component references
    // don't cause "expected a string or class/function but got: object" errors
    expect(() => {
      render(
        <RoleProvider>
          <TestComponent />
        </RoleProvider>
      )
    }).not.toThrow()
  })
})
