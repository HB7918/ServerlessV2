import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@cloudscape-design/global-styles/index.css'
import './index.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports.js'

// Configure AWS Amplify
Amplify.configure(awsconfig);
console.log('✅ AWS Amplify configured');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
