import { useState } from 'react';
import {
  ContentLayout,
  Header,
  SpaceBetween,
  Container,
  ColumnLayout,
  Box,
  Button,
  Table,
  TextFilter,
  Pagination,
  Flashbar
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function IndexDetails({ indexName, collectionName, onBack, showSuccessMessage }) {
  const [flashbarItems, setFlashbarItems] = useState(
    showSuccessMessage
      ? [
          {
            type: 'success',
            content: (
              <span style={{ color: 'white' }}>
                Index {indexName || 'test'} created successfully.
              </span>
            ),
            dismissible: true,
            onDismiss: () => setFlashbarItems([]),
            id: 'success_message'
          }
        ]
      : []
  );
  
  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: collectionName || 'awd62718', href: '#/collection-details' },
    { text: indexName || 'test', href: '#/index-details' }
  ];

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collections"
      onBreadcrumbClick={(href) => {
        if (href === '#/collections' || href === '#/collection-details') {
          onBack();
        }
      }}
    >
      <SpaceBetween size="l">
        <Flashbar items={flashbarItems} />
        
        <Header
          variant="h1"
          actions={
            <Button>Delete index</Button>
          }
        >
          {indexName || 'test'}
        </Header>

        <SpaceBetween size="l">
          <Container header={<Header variant="h2">General information</Header>}>
            <ColumnLayout columns={3} variant="text-grid">
              <div>
                <Box variant="awsui-key-label">Index name</Box>
                <div>{indexName || 'test'}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Collection</Box>
                <div>{collectionName || 'awd62718'}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Created date</Box>
                <div>2026-01-22 01:18 UTC</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Total size (bytes)</Box>
                <div>-</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Total document count</Box>
                <div>-</div>
              </div>
            </ColumnLayout>
          </Container>

          <Container
            header={
              <Header variant="h2">
                Automatic Semantic Enrichment fields - new (0)
              </Header>
            }
          >
            <Table
              columnDefinitions={[
                {
                  id: 'inputFields',
                  header: 'Input fields for semantic enrichment',
                  cell: item => item.inputFields,
                  minWidth: 200
                },
                {
                  id: 'inputFieldDataType',
                  header: 'Input field data type',
                  cell: item => item.inputFieldDataType,
                  minWidth: 180
                },
                {
                  id: 'language',
                  header: 'Language',
                  cell: item => item.language,
                  minWidth: 150
                },
                {
                  id: 'semanticField',
                  header: 'Automatic semantic enrichment field',
                  cell: item => item.semanticField,
                  minWidth: 250
                },
                {
                  id: 'semanticFieldDataType',
                  header: 'Automatic semantic enrichment field data type',
                  cell: item => item.semanticFieldDataType,
                  minWidth: 300
                }
              ]}
              items={[]}
              loadingText="Loading fields"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box variant="p">No automatic semantic enrichment fields</Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringPlaceholder="Search"
                  filteringText=""
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={1}
                  pagesCount={1}
                />
              }
              variant="embedded"
            />
          </Container>

          <Container
            header={
              <Header variant="h2">
                Time series fields (0)
              </Header>
            }
          >
            <Table
              columnDefinitions={[
                {
                  id: 'fieldName',
                  header: 'Field name',
                  cell: item => item.fieldName,
                  minWidth: 200
                },
                {
                  id: 'dataType',
                  header: 'Data type',
                  cell: item => item.dataType,
                  minWidth: 150
                }
              ]}
              items={[]}
              loadingText="Loading fields"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box variant="p">No time series fields</Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringPlaceholder="Search"
                  filteringText=""
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={1}
                  pagesCount={1}
                />
              }
              variant="embedded"
            />
          </Container>
        </SpaceBetween>
      </SpaceBetween>
      <CommentsPanel screenName="Index Details" />
    </AWSLayout>
  );
}

export default IndexDetails;
