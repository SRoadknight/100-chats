import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthProvider'
import MainComponent from './MainComponent'
import Account from './Account'



export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}