import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import * as Sentry from "@sentry/react";
import ConnectedErrorBoundary from './components/ErrorBoundary.tsx';

if (window.location.host === 'puzzle.araratchess.com') {
    Sentry.init({
        dsn: "https://35a44e3ed1490f16eb7e9da6f5c6d241@o4507420277997568.ingest.de.sentry.io/4507421007675472",
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
          }),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost"],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store()}>
      <ConnectedErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ConnectedErrorBoundary>
    </Provider>
)
