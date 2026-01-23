import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@cloudscape-design/global-styles/index.css'
import './index.css'
import App from './App.jsx'

// Configure AWS Amplify if aws-exports.js exists
try {
  const { Amplify } = await import('aws-amplify');
  const awsconfig = await import('./aws-exports.js');
  Amplify.configure(awsconfig.default);
  console.log('✅ AWS Amplify configured');
} catch (error) {
  console.log('ℹ️ AWS Amplify not configured - using localStorage for comments');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
