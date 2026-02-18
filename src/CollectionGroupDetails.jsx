import {
  ContentLayout,
  Header,
  SpaceBetween,
  Container,
  ColumnLayout,
  Box,
  Button,
  Alert
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CollectionGroupDetails({ groupName, onBack }) {
  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Collection group', href: '#/collection-groups' },
    { text: groupName || 'test', href: '#/collection-group-details' }
  ];

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collection-groups"
      onBreadcrumbClick={(href) => {
        if (href === '#/collection-groups') {
          onBack();
        }
      }}
    >
      <ContentLayout
        header={
          <Header
            variant="h1"
            actions={
              <Button>Delete</Button>
            }
          >
            {groupName || 'test'}
          </Header>
        }
      >
        <SpaceBetween size="l">
          <Alert type="info" header="Optimize your capacity settings">
            <SpaceBetween size="xs">
              <Box variant="p">
                Monitor your Collection Group's OCU usage and latency metrics to decide whether to adjust capacity.
              </Box>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>If you experience latency spikes, consider increasing the minimum OCUs to keep warm capacity available.</li>
                <li>If your usage consistently hits the upper limit, increase the maximum OCUs to prevent throttling.</li>
                <li>If your usage is much lower than your current min/max, reduce OCUs to save on cost.</li>
              </ul>
            </SpaceBetween>
          </Alert>

          <Container
            header={
              <Header
                variant="h2"
                actions={<Button>Edit</Button>}
              >
                Group details
              </Header>
            }
          >
            <SpaceBetween size="l">
              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Collection group name</Box>
                  <div>{groupName || 'test'}</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Collection group description</Box>
                  <div>-</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Creation date</Box>
                  <div>January 21, 2026, 15:09 (UTC-05:00)</div>
                </div>
              </ColumnLayout>

              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Collection group ARN</Box>
                  <div style={{ wordBreak: 'break-all' }}>arn:aws:aoss:us-east-1:478031150931:collection-group/xm6pvq34kwti7cu6ndu7</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Collections</Box>
                  <div>0</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Serverless version</Box>
                  <div>Serverless V2</div>
                </div>
              </ColumnLayout>

              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Indexing OCU usage</Box>
                  <div>-</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Minimum indexing capacity</Box>
                  <div>-</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Maximum indexing capacity</Box>
                  <div>96</div>
                </div>
              </ColumnLayout>

              <ColumnLayout columns={3} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Search OCU usage</Box>
                  <div>-</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Minimum search capacity</Box>
                  <div>-</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Maximum search capacity</Box>
                  <div>96</div>
                </div>
              </ColumnLayout>
            </SpaceBetween>
          </Container>

          <Box textAlign="center" padding={{ vertical: 'xxl' }}>
            <Box color="text-body-secondary" fontSize="heading-l">No change to existing content - Only added Serverless Version key value pair</Box>
          </Box>
        </SpaceBetween>
      </ContentLayout>
      <CommentsPanel screenName="Collection Group Details" />
    </AWSLayout>
  );
}

export default CollectionGroupDetails;
