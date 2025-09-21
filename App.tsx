import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { SiteDataProvider } from './data/siteDataContext';
import { RouterContext } from './types';

const LazyMainSite = lazy(() => import('./pages/MainSite'));
const LazyAdminPanel = lazy(() => import('./pages/AdminPanel'));
const LazyPrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const LazyTermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname + window.location.hash);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setRoute(path); // Let components handle scrolling
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname + window.location.hash);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);
  
  let content;
  const pathName = route.split('#')[0];

  if (pathName.startsWith('/admin')) {
    content = <LazyAdminPanel />;
  } else if (pathName === '/privacy-policy') {
    content = <LazyPrivacyPolicy />;
  } else if (pathName === '/terms-and-conditions') {
    content = <LazyTermsAndConditions />;
  } else {
    content = <LazyMainSite route={route} />;
  }

  return (
    <RouterContext.Provider value={{ navigate, route }}>
      <SiteDataProvider>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-slate-900 text-slate-200">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        }>
          {content}
        </Suspense>
      </SiteDataProvider>
    </RouterContext.Provider>
  );
};

export default App;