import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RoleProvider } from '@/context/RoleContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { CustomAlertContext } from '@/context/CustomAlertContext'
import MerchantPage from './page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/agent/merchant',
}))

// Mock CustomAlertContext
const mockSetToastNotification = jest.fn()
 
describe('MerchantPage', () => {
  it('renders a heading', () => {
    render(
      <CustomAlertContext.Provider value={{ setToastNotification: mockSetToastNotification }}>
        <SidebarProvider>
          <RoleProvider>
            <MerchantPage />
          </RoleProvider>
        </SidebarProvider>
      </CustomAlertContext.Provider>
    )
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})