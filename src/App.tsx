import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { PatternBackground } from '@/components/common/PatternBackground';
import { Footer } from '@/components/Footer';
import { ROUTES, DEFAULT_ROUTE_PROPS } from '@/constants';

function BackgroundGradient({ className }: { className: string }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all duration-700 ease-in-out ${className}`}
      style={{
        transitionProperty: 'background, background-color',
      }}
    />
  );
}

function AppContent() {
  const location = useLocation();
  const path = location.pathname.slice(1) || 'cards';
  const currentRoute = ROUTES.find((route) => route.path === path);
  const shouldShowFooter = path !== 'title';

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient
        className={currentRoute?.backgroundClass || ROUTES[0].backgroundClass}
      />
      {/* <BackgroundPattern_Legacy /> */}
      <PatternBackground
        color={currentRoute?.patternColor || DEFAULT_ROUTE_PROPS.patternColor}
        scale={currentRoute?.patternScale || DEFAULT_ROUTE_PROPS.patternScale}
      />
      <div className="relative z-10 flex-1">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/title" replace />} />
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={`/${route.path}`}
                element={<route.view />}
              />
            ))}
          </Routes>
        </main>
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
