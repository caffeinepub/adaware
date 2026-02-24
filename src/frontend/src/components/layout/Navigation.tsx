import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/predict', label: 'Predict' },
    { path: '/results', label: 'Results' },
    { path: '/model-insights', label: 'Model Insights' },
    { path: '/admin', label: 'Admin' },
    { path: '/about', label: 'About' },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('/')}
            className="text-2xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            AdAware
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPath === item.path ? 'default' : 'ghost'}
                onClick={() => handleNavigation(item.path)}
                className={
                  currentPath === item.path
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-950'
                }
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={currentPath === item.path ? 'default' : 'ghost'}
                      onClick={() => handleNavigation(item.path)}
                      className={
                        currentPath === item.path
                          ? 'bg-teal-600 hover:bg-teal-700 text-white justify-start'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-950 justify-start'
                      }
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
