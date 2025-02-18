import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { ROUTES } from '@/constants';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = location.pathname.slice(1) || 'cards';
  const currentRoute = ROUTES.find((route) => route.path === currentPath);
  const currentLabel = currentRoute?.label || title;

  // Split routes into primary and secondary
  const primaryRoutes = ROUTES.filter(
    (route) => route.type === 'primary' && !route.disabled
  );
  const secondaryRoutes = ROUTES.filter(
    (route) => route.type === 'secondary' && !route.disabled
  );

  return (
    <header className="sticky top-0 bg-[#1a1614]/80 backdrop-blur-sm shadow-lg border-b border-white/5 z-50 animate-slideInDown">
      <div className="mx-auto px-4 h-12 flex items-center">
        <div className="relative">
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="text-white/90 text-lg font-bold">
              Konosuba FD/A
              <span> | </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-white/90 font-medium hover:text-white transition-colors"
            >
              <span>{currentLabel}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div
                className="
                absolute top-full left-0 mt-1 z-60 ml-36
                bg-[#1a1614]/95 backdrop-blur-sm rounded-md shadow-lg
                py-1 w-[240px]
                border border-white/10
              "
              >
                {/* Primary Routes */}
                {primaryRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => {
                      navigate(`/${route.path}`);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-1.5 text-left text-sm font-bold
                      transition-colors duration-200
                      ${
                        route.path === currentPath
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    {route.label}
                  </button>
                ))}

                {/* Divider (only if there are both primary and secondary routes) */}
                {primaryRoutes.length > 0 && secondaryRoutes.length > 0 && (
                  <div className="my-1 border-t border-white/10" />
                )}

                {/* Secondary Routes */}
                {secondaryRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => {
                      navigate(`/${route.path}`);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full px-4 py-1.5 text-left text-xs
                      transition-colors duration-200
                      ${
                        route.path === currentPath
                          ? 'bg-white/10 text-white'
                          : 'text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    {route.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}
