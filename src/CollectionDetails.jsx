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
  Pagination,
  Icon,
  ExpandableSection
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

            <ExpandableSection
              headerText="Next steps for your collection"
              variant="container"
              defaultExpanded={true}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, paddingRight: '24px', display: 'flex', gap: '16px' }}>
                  <div style={{ width: '120px', height: '80px', backgroundColor: '#1a2b3c', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="/Illustration.svg" alt="OpenSearch Application" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <SpaceBetween size="s">
                    <Box variant="awsui-key-label">Start using OpenSearch application</Box>
                    <Box variant="p">
                      • Create visualizations and dashboards<br />
                      • Set up workspaces for team collaboration
                    </Box>
                    <Button 
                      iconName="external" 
                      iconAlign="right"
                      onClick={() => window.open('https://future.playground.opensearch.org/app/login?', '_blank')}
                    >
                      OpenSearch application
                    </Button>
                  </SpaceBetween>
                </div>
                <div style={{ width: '1px', backgroundColor: '#e9ebed', margin: '0 24px' }} />
                <div style={{ flex: 1, paddingLeft: '24px', display: 'flex', gap: '16px' }}>
                  <div style={{ width: '120px', height: '80px', backgroundColor: '#1a2b3c', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="/Illustration.svg" alt="Index your data" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <SpaceBetween size="s">
                    <Box variant="awsui-key-label">Index your data</Box>
                    <Box variant="p">
                      • Start indexing your data<br />
                      • An index consists of embeddings that describes the data
                    </Box>
                    <Button onClick={onCreateIndex}>
                      Create index
                    </Button>
                  </SpaceBetween>
                </div>
              </div>
            </ExpandableSection>

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
                  <Link>serverless_v2_27121</Link>
                </div>
                <div>
                  <Box variant="awsui-key-label">OpenSearch Application</Box>
                  <Link>opensearchui-1769533298515</Link>
                </div>
              </ColumnLayout>
            </Container>
            <Container header={<Header variant="h2">Endpoints</Header>}>
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">OpenSearch endpoint</Box>
                  <Box fontWeight="normal">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ cursor: 'pointer', color: '#5f6b7a' }} onClick={() => navigator.clipboard.writeText('https://abc123xyz789.us-east-1.aoss.amazonaws.com')}>
                        <Icon name="copy" size="small" />
                      </span>
                      <span>https://abc123xyz789.us-east-1.aoss.amazonaws.com</span>
                    </div>
                  </Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">OpenSearch application URL</Box>
                  <Box fontWeight="normal">
                    <Link external>
                      https://abc123xyz789.us-east-1.aoss.amazonaws.com/_dashboards
                    </Link>
                  </Box>
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
