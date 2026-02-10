import React, { useState } from 'react';
import {
  Table,
  Link,
  StatusIndicator,
  Box,
  SpaceBetween,
  Button,
  TextFilter,
  Header,
  Pagination,
  CollectionPreferences,
  Flashbar
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

const ALL_ITEMS = [
  {
    creationDate: 'October 30, 2025, 10:19 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'awd2718',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'June 12, 2024, 13:10 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'awstest',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'June 12, 2024, 13:46 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'awstest2',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'August 25, 2025, 13:45 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'cloudwatch-logs-opensearch-3r',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'January 13, 2025, 10:52 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection-1726782959504',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'February 9, 2025, 10:57 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection-1759115442785',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'February 24, 2025, 14:50 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection-1740426643191',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'February 24, 2025, 14:54 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection-1740426837466',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'May 22, 2023, 10:21 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection2',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'July 16, 2025, 10:22 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 's3vectors-collection-175262',
    status: 'Active',
    type: 'Vectorsearch',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'July 16, 2025, 10:27 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 's3vectors-collection-175263',
    status: 'Active',
    type: 'Vectorsearch',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'March 15, 2025, 09:30 (UTC-07:00)',
    description: 'Production logs collection',
    group: 'prod-group',
    name: 'prod-logs-collection',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'March 20, 2025, 14:15 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'dev-test-collection-001',
    status: 'Active',
    type: 'Search',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'April 5, 2025, 11:45 (UTC-07:00)',
    description: 'Analytics data',
    group: 'analytics',
    name: 'analytics-collection-2025',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'April 12, 2025, 16:20 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'staging-collection-v2',
    status: 'Active',
    type: 'Search',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'May 1, 2025, 08:00 (UTC-07:00)',
    description: 'Vector embeddings',
    group: 'ml-group',
    name: 'ml-vectors-collection',
    status: 'Active',
    type: 'Vectorsearch',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'May 10, 2025, 13:30 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'backup-collection-may',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'June 3, 2025, 10:10 (UTC-07:00)',
    description: 'Customer data search',
    group: 'customer-data',
    name: 'customer-search-index',
    status: 'Active',
    type: 'Search',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'June 18, 2025, 15:45 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'temp-collection-june',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'July 2, 2025, 09:20 (UTC-07:00)',
    description: 'Security logs',
    group: 'security',
    name: 'security-logs-collection',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'July 25, 2025, 12:00 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'test-collection-july-25',
    status: 'Active',
    type: 'Search',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'August 8, 2025, 14:30 (UTC-07:00)',
    description: 'Application metrics',
    group: 'monitoring',
    name: 'app-metrics-collection',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'September 1, 2025, 10:00 (UTC-07:00)',
    description: '-',
    group: '-',
    name: 'collection-sept-2025',
    status: 'Active',
    type: 'Timeseries',
    serverlessVersion: 'Serverless v2'
  },
  {
    creationDate: 'September 15, 2025, 16:45 (UTC-07:00)',
    description: 'Document search',
    group: 'documents',
    name: 'document-search-collection',
    status: 'Active',
    type: 'Search',
    serverlessVersion: 'Serverless v1'
  },
  {
    creationDate: 'October 1, 2025, 11:30 (UTC-07:00)',
    description: 'AI embeddings',
    group: 'ml-group',
    name: 'ai-embeddings-collection',
    status: 'Active',
    type: 'Vectorsearch',
    serverlessVersion: 'Serverless v2'
  }
];

function CollectionList({ onCreateClick, onViewCollection, onNavigate }) {
  const COLUMN_DEFINITIONS = [
    {
      cell: (item) => (
        <Link 
          fontSize="inherit" 
          href="#" 
          onFollow={(e) => {
            e.preventDefault();
            onViewCollection(item.name);
          }}
        >
          {item.name}
        </Link>
      ),
      header: 'Collection name',
      id: 'name',
      minWidth: 180,
      sortingField: 'name'
    },
    {
      cell: (item) => <Link external fontSize="inherit" href="#">{item.serverlessVersion === 'Serverless v2' ? 'OpenSearch UI' : 'Dashboard'}</Link>,
      header: 'OpenSearch Dashboards',
      id: 'dashboard',
      minWidth: 180
    },
    {
      cell: (item) => <StatusIndicator type="success">{item.status}</StatusIndicator>,
      header: 'Status',
      id: 'status',
      minWidth: 120
    },
    {
      cell: (item) => item.type,
      header: 'Collection type',
      id: 'type',
      minWidth: 150
    },
    {
      cell: (item) => item.serverlessVersion,
      header: 'Serverless version',
      id: 'serverlessVersion',
      minWidth: 150
    },
    {
      cell: (item) => item.group,
      header: 'Collection group',
      id: 'group',
      minWidth: 150
    },
    {
      cell: (item) => item.creationDate,
      header: 'Creation date',
      id: 'creationDate',
      minWidth: 200,
      sortingField: 'creationDate'
    }
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [preferences, setPreferences] = useState({
    pageSize: 20,
    contentDensity: 'comfortable',
    stripedRows: false,
    wrapLines: false
  });

  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'info',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      header: 'Introducing Serverless v2 for Amazon OpenSearch Serverless',
      content: 'Experience instant autoscaling from zero to hundreds of requests in seconds, scale-to-zero when idle for up to 40% cost savings, and near-instant data freshness with newly indexed data searchable in seconds. Serverless v2 supports search, time-series, and vector workloads with the same APIs you\'re already using.',
      action: <Button iconName="external" iconAlign="right" href="#" target="_blank">Learn more</Button>,
      id: 'serverless-v2-announcement'
    }
  ]);

  // Filter items based on search text
  const filteredItems = ALL_ITEMS.filter(item => {
    if (!filteringText) return true;
    const searchText = filteringText.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / preferences.pageSize);
  const startIndex = (currentPageIndex - 1) * preferences.pageSize;
  const endIndex = startIndex + preferences.pageSize;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when filtering changes
  React.useEffect(() => {
    setCurrentPageIndex(1);
  }, [filteringText]);

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked for items:', selectedItems);
    if (selectedItems.length === 0) {
      console.log('No items selected to delete');
    }
  };

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' }
  ];

  return (
    <AWSLayout 
      breadcrumbs={breadcrumbs} 
      activeHref="#/collections"
      onBreadcrumbClick={(href) => {
        if (href === '#/collections') {
          onCreateClick();
        }
      }}
      onNavigate={onNavigate}
    >
      <SpaceBetween size="l">
        {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}
        <Table
        columnDefinitions={COLUMN_DEFINITIONS}
        items={paginatedItems}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectionType="multi"
        trackBy="name"
        loading={false}
        loadingText="Loading collections"
        empty={
          <Box color="inherit" textAlign="center">
            <SpaceBetween size="m">
              <Box color="inherit" variant="strong">
                No collections
              </Box>
              <Box color="inherit" variant="p">
                You don't have any collections yet.
              </Box>
              <Button onClick={onCreateClick} variant="primary">
                Create collection
              </Button>
            </SpaceBetween>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Search by collection name, description"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
            countText={`${filteredItems.length} match${filteredItems.length === 1 ? '' : 'es'}`}
          />
        }
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button iconName="refresh" onClick={handleRefresh} />
                <Button onClick={handleDelete} disabled={selectedItems.length === 0}>
                  Delete
                </Button>
                <Button onClick={onCreateClick} variant="primary">
                  Create collection
                </Button>
              </SpaceBetween>
            }
            counter={`(${filteredItems.length})`}
            info={<Link variant="info">Info</Link>}
            variant="awsui-h1-sticky"
          >
            Collections
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={totalPages}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber}`
            }}
          />
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
            pageSizePreference={{
              title: 'Page size',
              options: [
                { label: '10 collections', value: 10 },
                { label: '20 collections', value: 20 },
                { label: '50 collections', value: 50 }
              ]
            }}
            contentDensityPreference={{
              label: 'Compact mode',
              description: 'Display content in a more compact format'
            }}
            stripedRowsPreference={{
              label: 'Striped rows',
              description: 'Add alternating row colors'
            }}
            wrapLinesPreference={{
              label: 'Wrap lines',
              description: 'Wrap text content across multiple lines'
            }}
          />
        }
        resizableColumns
        stickyHeader
        variant="full-page"
        contentDensity={preferences.contentDensity}
        stripedRows={preferences.stripedRows}
        wrapLines={preferences.wrapLines}
      />
      </SpaceBetween>
      <CommentsPanel screenName="Collections" />
    </AWSLayout>
  );
};

export default CollectionList;
