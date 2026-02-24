import { ReactNode } from 'react';
import Navigation from './Navigation';
import { Heart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'adaware-app';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">AdAware</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explainable AI for Adolescent Health
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-teal-600 dark:hover:text-teal-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/predict" className="hover:text-teal-600 dark:hover:text-teal-400">
                    Predict
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-teal-600 dark:hover:text-teal-400">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Academic Project</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Final Year Major Project
                <br />
                Public Health & AI Research
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} AdAware. All rights reserved.
            </p>
            <p className="mt-2">
              Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
