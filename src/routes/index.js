import { Route, Routes } from 'react-router-dom';
import CreateUpdateUser from '../components/create_update_user';
import Dashboard from '../components/dashboard';

export default function AllRoutes() {
  return (
      <Routes>
          <Route path="/" element={Dashboard} />
          <Route path=":userId" element={<CreateUpdateUser />} />
      </Routes>
  )
}