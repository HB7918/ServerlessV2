import React, { useState } from 'react';
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
  Badge
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';

function CollectionDetails({ collectionName, onBack }) {
  const [activeTabId, setActiveTabId] = useState('overview');

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
          <Header
            variant="h1"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Delete</Button>
                <Button>Actions</Button>
              </SpaceBetween>
            }
          >
            {collectionName || 'awd2718'}
          </Header>
        }
      >
        <SpaceBetween size="l">
          <Container>
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
                <div>-</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Description</Box>
                <div>-</div>
              </div>
            </ColumnLayout>
          </Container>

          <Tabs
            activeTabId={activeTabId}
            onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <SpaceBetween size="l">
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

                    <Container header={<Header variant="h2">Data access</Header>}>
                      <ColumnLayout columns={2} variant="text-grid">
                        <div>
                          <Box variant="awsui-key-label">Data access policy</Box>
                          <Link>easy-collectionname</Link>
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Principals</Box>
                          <div>arn:aws:iam::*:role/Admin</div>
                        </div>
                      </ColumnLayout>
                    </Container>

                    <Container header={<Header variant="h2">Data lifecycle</Header>}>
                      <ColumnLayout columns={3} variant="text-grid">
                        <div>
                          <Box variant="awsui-key-label">Data retention</Box>
                          <div>Keep data indefinitely (Never delete)</div>
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Hot storage retention</Box>
                          <div>24 Hours</div>
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Rehydration TTL</Box>
                          <div>1 Hour</div>
                        </div>
                      </ColumnLayout>
                    </Container>

                    <Container header={<Header variant="h2">Tags</Header>}>
                      <Box>No tags</Box>
                    </Container>
                  </SpaceBetween>
                )
              },
              {
                id: 'indexes',
                label: 'Indexes',
                content: (
                  <Container>
                    <Box textAlign="center" padding={{ vertical: 'xxl' }}>
                      <SpaceBetween size="m">
                        <Box variant="strong">No indexes</Box>
                        <Box variant="p">This collection has no indexes yet.</Box>
                      </SpaceBetween>
                    </Box>
                  </Container>
                )
              },
              {
                id: 'monitoring',
                label: 'Monitoring',
                content: (
                  <Container>
                    <Box textAlign="center" padding={{ vertical: 'xxl' }}>
                      <Box variant="p">Monitoring metrics will appear here.</Box>
                    </Box>
                  </Container>
                )
              }
            ]}
          />
        </SpaceBetween>
      </ContentLayout>
    </AWSLayout>
  );
}

export default CollectionDetails;
