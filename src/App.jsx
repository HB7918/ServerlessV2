import { useState } from 'react'
import CollectionList from './CollectionList'
import CreateCollection from './CreateCollection'
import CreateCollectionV1 from './CreateCollectionV1'
import CollectionDetails from './CollectionDetails'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('list')
  const [selectedCollection, setSelectedCollection] = useState(null)

  const handleViewCollection = (collectionName) => {
    setSelectedCollection(collectionName)
    setCurrentView('details')
  }

  return (
    <div>
      {currentView === 'list' && (
        <CollectionList 
          onCreateClick={() => setCurrentView('create')}
          onViewCollection={handleViewCollection}
        />
      )}
      {currentView === 'create' && (
        <CreateCollection 
          onCancel={() => setCurrentView('list')} 
          onNavigateToV1={() => setCurrentView('create-v1')}
        />
      )}
      {currentView === 'create-v1' && (
        <CreateCollectionV1 
          onCancel={() => setCurrentView('list')}
          onNavigateToV2={() => setCurrentView('create')}
        />
      )}
      {currentView === 'details' && (
        <CollectionDetails
          collectionName={selectedCollection}
          onBack={() => setCurrentView('list')}
        />
      )}
    </div>
  )
}

export default App
