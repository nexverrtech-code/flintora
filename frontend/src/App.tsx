import { Route, Routes } from 'react-router';
import { SiteLayout } from '@/layouts/SiteLayout';
import { notFound, routes } from '@/routes/routes';

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<notFound.Component />} />
      </Routes>
    </SiteLayout>
  );
}
