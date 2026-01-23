import { useState } from 'react';
import {
  ContentLayout,
  Header,
  SpaceBetween,
  Container,
  ColumnLayout,
  Box,
  Button,
  StatusIndicator,
  Link,
  Tabs,
  Alert,
  Table,
  TextFilter,
  Pagination
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CollectionDetails({ collectionName, onBack, onCreateIndex, onViewIndex, indexes }) {
  const [activeTabId, setActiveTabId] = useState('overview');
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: collectionName || 'Collection details', href: '#/collection-details' }
  ];

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collections"
      onBreadcrumbClick={(href) => {
        if (href === '#/collections') {
          onBack();
        }
      }}
    >
      <ContentLayout
        header={
          <SpaceBetween size="m">
            <Alert
              type="info"
              action={<Button onClick={onCreateIndex}>Create index</Button>}
            >
              Start indexing your data. A index consists of embeddings that describes the data.
            </Alert>

            <Header
              variant="h1"
              info={<Link variant="info">Info</Link>}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button>Delete collection</Button>
                  <Button iconName="external" iconAlign="right">
                    OpenSearch Application
                  </Button>
                </SpaceBetween>
              }
            >
              {collectionName || 'awd2718'}
            </Header>

            <div style={{ marginTop: '-8px' }}>
              <Tabs
                activeTabId={activeTabId}
                onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'monitor', label: 'Monitor' },
                  { id: 'snapshots', label: 'Snapshots' },
                  { id: 'indexes', label: 'Indexes' },
                  { id: 'tags', label: 'Tags' }
                ]}
              />
            </div>
          </SpaceBetween>
        }
      >
        <div style={{ marginTop: '-20px' }}>
          {activeTabId === 'overview' && (
            <SpaceBetween size="m">
            <Container header={<Header variant="h2">General information</Header>}>
              <ColumnLayout columns={4} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Collection ID</Box>
                  <div>abc123xyz789</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Status</Box>
                  <StatusIndicator type="success">Active</StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">Collection type</Box>
                  <div>Timeseries</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Serverless version</Box>
                  <div>Serverless v2</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">ARN</Box>
                  <div>arn:aws:aoss:us-east-1:123456789012:collection/abc123xyz789</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Creation date</Box>
                  <div>October 30, 2025, 10:19 (UTC-07:00)</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Collection group</Box>
                  <div>group1</div>
                </div>
              </ColumnLayout>
            </Container>
            <Container header={<Header variant="h2">Endpoints</Header>}>
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Collection endpoint</Box>
                  <Link external>
                    https://abc123xyz789.us-east-1.aoss.amazonaws.com
                  </Link>
                </div>
                <div>
                  <Box variant="awsui-key-label">OpenSearch Dashboards URL</Box>
                  <Link external>
                    https://abc123xyz789.us-east-1.aoss.amazonaws.com/_dashboards
                  </Link>
                </div>
              </ColumnLayout>
            </Container>

            <Container header={<Header variant="h2">Encryption</Header>}>
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Encryption type</Box>
                  <div>AWS owned key</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">KMS key ARN</Box>
                  <div>-</div>
                </div>
              </ColumnLayout>
            </Container>

            <Container header={<Header variant="h2">Network access</Header>}>
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Access type</Box>
                  <div>Public</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Network policy</Box>
                  <Link>View policy</Link>
                </div>
              </ColumnLayout>
            </Container>
          </SpaceBetween>
        )}

        {activeTabId === 'monitor' && (
          <Container>
            <Box textAlign="center" padding={{ vertical: 'xxl' }}>
              <Box variant="p">Monitoring metrics will appear here.</Box>
            </Box>
          </Container>
        )}

        {activeTabId === 'snapshots' && (
          <Container>
            <Box textAlign="center" padding={{ vertical: 'xxl' }}>
              <SpaceBetween size="m">
                <Box variant="strong">No snapshots</Box>
                <Box variant="p">This collection has no snapshots yet.</Box>
              </SpaceBetween>
            </Box>
          </Container>
        )}

        {activeTabId === 'indexes' && (
          <Container>
            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Index name',
                  cell: item => (
                    <Link 
                      onFollow={(e) => {
                        e.preventDefault();
                        onViewIndex(item.name);
                      }}
                    >
                      {item.name}
                    </Link>
                  ),
                  sortingField: 'name',
                  minWidth: 180
                },
                {
                  id: 'hotStorageRetention',
                  header: 'Hot storage retention',
                  cell: item => item.hotStorageRetention,
                  sortingField: 'hotStorageRetention',
                  minWidth: 180
                },
                {
                  id: 'dataRetention',
                  header: 'Data retention',
                  cell: item => item.dataRetention,
                  sortingField: 'dataRetention',
                  minWidth: 150
                },
                {
                  id: 'size',
                  header: 'Size (bytes)',
                  cell: item => item.size,
                  sortingField: 'size',
                  minWidth: 120
                },
                {
                  id: 'documentCount',
                  header: 'Document count',
                  cell: item => item.documentCount,
                  sortingField: 'documentCount',
                  minWidth: 150
                },
                {
                  id: 'timeSeriesFieldCount',
                  header: 'Time series field count',
                  cell: item => item.timeSeriesFieldCount,
                  sortingField: 'timeSeriesFieldCount',
                  minWidth: 180
                },
                {
                  id: 'semanticFieldCount',
                  header: 'Automatic semantic enrichment field count',
                  cell: item => item.semanticFieldCount,
                  sortingField: 'semanticFieldCount',
                  minWidth: 300
                },
                {
                  id: 'createdDate',
                  header: 'Created date',
                  cell: item => item.createdDate,
                  sortingField: 'createdDate',
                  minWidth: 180
                }
              ]}
              items={indexes || []}
              selectedItems={selectedIndexes}
              onSelectionChange={({ detail }) => setSelectedIndexes(detail.selectedItems)}
              selectionType="single"
              trackBy="name"
              loadingText="Loading indexes"
              empty={
                <Box textAlign="center" color="inherit">
                  <SpaceBetween size="m">
                    <Box variant="p">Start by creating index.</Box>
                    <Button onClick={onCreateIndex}>Create index</Button>
                  </SpaceBetween>
                </Box>
              }
              filter={
                <TextFilter
                  filteringPlaceholder="Search"
                  filteringText=""
                />
              }
              header={
                <Header
                  counter={`(${indexes?.length || 0})`}
                  description={
                    <Box variant="p" color="text-body-secondary">
                      Indexing is the method by which search engines organize data for fast retrieval. <Link external>Learn more</Link>
                    </Box>
                  }
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button iconName="refresh" />
                      <Button disabled={selectedIndexes.length === 0}>Delete</Button>
                      <Button onClick={onCreateIndex}>Create index</Button>
                    </SpaceBetween>
                  }
                >
                  Indexes
                </Header>
              }
              pagination={
                <Pagination
                  currentPageIndex={1}
                  pagesCount={1}
                />
              }
              preferences={
                <Button iconName="settings" variant="icon" />
              }
              variant="full-page"
            />
          </Container>
        )}

        {activeTabId === 'tags' && (
          <Container header={<Header variant="h2">Tags</Header>}>
            <SpaceBetween size="m">
              <Box>No tags associated with this collection</Box>
              <Button>Manage tags</Button>
            </SpaceBetween>
          </Container>
        )}
        </div>
      </ContentLayout>
      <CommentsPanel screenName="Collection Details" />
    </AWSLayout>
  );
}

export default CollectionDetails;
