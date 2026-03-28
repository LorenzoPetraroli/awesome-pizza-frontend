import { Route, Routes } from 'react-router-dom'
import { CustomerPage } from '../pages/CustomerPage.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { KitchenPage } from '../pages/KitchenPage.tsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/kitchen" element={<KitchenPage />} />
    </Routes>
  )
}
