import { useState, useEffect } from 'react'
import CollectionList from './CollectionList'
import CreateCollection from './CreateCollection'
import CreateCollectionV1 from './CreateCollectionV1'
import CollectionDetails from './CollectionDetails'
import CreateIndex from './CreateIndex'
import IndexDetails from './IndexDetails'
import CollectionGroup from './CollectionGroup'
import CreateCollectionGroup from './CreateCollectionGroup'
import './App.css'

function App() {
  const getInitialView = () => {
    const hash = window.location.hash;
    if (hash === '#/collection-groups') return 'collection-groups';
    if (hash === '#/create-collection-group') return 'create-collection-group';
    if (hash === '#/collections') return 'list';
    return 'list';
  };

  const [currentView, setCurrentView] = useState(getInitialView())
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [indexes, setIndexes] = useState([])
  const [showIndexCreatedMessage, setShowIndexCreatedMessage] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/collection-groups') setCurrentView('collection-groups');
      else if (hash === '#/create-collection-group') setCurrentView('create-collection-group');
      else if (hash === '#/collections') setCurrentView('list');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (href) => {
    if (href === '#/collections') {
      setCurrentView('list');
      window.location.hash = '#/collections';
    } else if (href === '#/collection-groups') {
      setCurrentView('collection-groups');
      window.location.hash = '#/collection-groups';
    }
  };

  const handleViewCollection = (collectionName) => {
    setSelectedCollection(collectionName)
    setCurrentView('details')
  }

  const handleCreateIndex = () => {
    setCurrentView('create-index')
  }

  const handleIndexCreated = (indexData) => {
    console.log('Index created:', indexData)
    setIndexes([...indexes, indexData])
    setSelectedIndex(indexData.name)
    setShowIndexCreatedMessage(true)
    setCurrentView('index-details')
  }

  const handleViewIndex = (indexName) => {
    setSelectedIndex(indexName)
    setShowIndexCreatedMessage(false)
    setCurrentView('index-details')
  }

  return (
    <div>
      {currentView === 'list' && (
        <CollectionList 
          onCreateClick={() => setCurrentView('create')}
          onViewCollection={handleViewCollection}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === 'collection-groups' && (
        <CollectionGroup 
          onCreateClick={() => setCurrentView('create-collection-group')}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === 'create-collection-group' && (
        <CreateCollectionGroup
          onCancel={() => setCurrentView('collection-groups')}
          onGroupCreated={(groupName) => {
            console.log('Collection group created:', groupName);
            setCurrentView('collection-groups');
          }}
        />
      )}
      {currentView === 'create' && (
        <CreateCollection 
          onCancel={() => setCurrentView('list')} 
          onNavigateToV1={() => setCurrentView('create-v1')}
          onCollectionCreated={handleViewCollection}
        />
      )}
      {currentView === 'create-v1' && (
        <CreateCollectionV1 
          onCancel={() => setCurrentView('list')}
          onNavigateToV2={() => setCurrentView('create')}
          onCollectionCreated={handleViewCollection}
        />
      )}
      {currentView === 'details' && (
        <CollectionDetails
          collectionName={selectedCollection}
          onBack={() => setCurrentView('list')}
          onCreateIndex={handleCreateIndex}
          onViewIndex={handleViewIndex}
          indexes={indexes}
        />
      )}
      {currentView === 'create-index' && (
        <CreateIndex
          collectionName={selectedCollection}
          onCancel={() => setCurrentView('details')}
          onIndexCreated={handleIndexCreated}
        />
      )}
      {currentView === 'index-details' && (
        <IndexDetails
          indexName={selectedIndex}
          collectionName={selectedCollection}
          onBack={() => setCurrentView('details')}
          showSuccessMessage={showIndexCreatedMessage}
        />
      )}
    </div>
  )
}

export default App
