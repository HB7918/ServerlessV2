import { useState } from 'react';
import {
  Form,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
  Table,
  Box,
  Link,
  TextFilter,
  Pagination,
  RadioGroup,
  Select,
  ColumnLayout
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CreateIndex({ collectionName, onCancel, onIndexCreated }) {
  const [indexName, setIndexName] = useState('');
  const [dataLifecycle, setDataLifecycle] = useState('indefinite');
  const [retentionValue, setRetentionValue] = useState('');
  const [retentionUnit, setRetentionUnit] = useState('days');
  const [hotStorageValue, setHotStorageValue] = useState('24');
  const [hotStorageUnit, setHotStorageUnit] = useState('hours');

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: collectionName || 'awd62718', href: '#/collection-details' },
    { text: 'Create vector index', href: '#/create-index' }
  ];

  const handleCreate = () => {
    const indexData = {
      name: indexName,
      dataRetention: dataLifecycle === 'indefinite' 
        ? 'Keep data indefinitely (Never delete)' 
        : `${retentionValue} ${retentionUnit}`,
      hotStorageRetention: `${hotStorageValue} ${hotStorageUnit}`,
      size: '0',
      documentCount: '0',
      timeSeriesFieldCount: '0',
      semanticFieldCount: '0',
      createdDate: new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
    
    if (onIndexCreated) {
      onIndexCreated(indexData);
    }
  };

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collections"
      onBreadcrumbClick={(href) => {
        if (href === '#/collections') {
          onCancel();
        } else if (href === '#/collection-details') {
          onCancel();
        }
      }}
    >
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          </SpaceBetween>
        }
        header={
          <Header variant="h1" info={<Link variant="info">Info</Link>}>
            Create index
          </Header>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Index details</Header>}>
            <SpaceBetween size="s">
              <Box variant="p" color="text-body-secondary">
                An index consists of vector embeddings along with other fields such as metadata and descriptive information to add more context to the stored vectors.
              </Box>
              
              <FormField
                label="Index name"
                description="The name must be between 3 and 64 characters. Valid characters are a-z (lowercase only), 0-9 (numbers), - (hyphen) and _ (underscore)"
              >
                <Input
                  value={indexName}
                  onChange={({ detail }) => setIndexName(detail.value)}
                  placeholder="Enter index name"
                />
              </FormField>

              <FormField
                label="Data lifecycle"
                info={<Link variant="info">Info</Link>}
                description="You can customize for this index or use the collection default."
              >
                <RadioGroup
                  value={dataLifecycle}
                  onChange={({ detail }) => setDataLifecycle(detail.value)}
                  items={[
                    { value: 'indefinite', label: 'Keep data indefinitely (Never delete)' },
                    { value: 'custom', label: 'Set custom retention period' }
                  ]}
                />
              </FormField>

              {dataLifecycle === 'custom' && (
                <FormField
                  label="Data retention"
                  description="Input must be an integer number from 24 to 87600 hours, or 1 to 3650 days"
                >
                  <ColumnLayout columns={2}>
                    <Input
                      value={retentionValue}
                      onChange={({ detail }) => setRetentionValue(detail.value)}
                      placeholder="Input value"
                      type="number"
                    />
                    <Select
                      selectedOption={{ label: retentionUnit === 'days' ? 'Day(s)' : 'Hour(s)', value: retentionUnit }}
                      onChange={({ detail }) => setRetentionUnit(detail.selectedOption.value)}
                      options={[
                        { label: 'Day(s)', value: 'days' },
                        { label: 'Hour(s)', value: 'hours' }
                      ]}
                    />
                  </ColumnLayout>
                </FormField>
              )}

              <FormField
                label="Hot storage retention"
                description="Input must be an integer number from 24 to 87600 hours, or 1 to 3650 days"
              >
                <ColumnLayout columns={2}>
                  <Input
                    value={hotStorageValue}
                    onChange={({ detail }) => setHotStorageValue(detail.value)}
                    placeholder="Input value"
                    type="number"
                  />
                  <Select
                    selectedOption={{ label: hotStorageUnit === 'hours' ? 'Hour(s)' : 'Day(s)', value: hotStorageUnit }}
                    onChange={({ detail }) => setHotStorageUnit(detail.selectedOption.value)}
                    options={[
                      { label: 'Hour(s)', value: 'hours' },
                      { label: 'Day(s)', value: 'days' }
                    ]}
                  />
                </ColumnLayout>
              </FormField>
            </SpaceBetween>
          </Container>

          <Container
            header={
              <Header
                variant="h2"
                description={
                  <>
                    Automatic semantic enrichment improves search relevance. OpenSearch Service automatically generates vector embeddings during data ingestion and stores them in designated semantic enrichment fields. Ensure the required permissions are in place to create automatic semantic enrichment fields. <Link external>Learn more</Link>
                  </>
                }
              >
                Automatic Semantic Enrichment fields (0)
              </Header>
            }
          >
            <Table
              columnDefinitions={[
                {
                  id: 'inputField',
                  header: 'Input fields for semantic enrichment',
                  cell: item => item.inputField,
                  minWidth: 200
                },
                {
                  id: 'dataType',
                  header: 'Input field data type',
                  cell: item => item.dataType,
                  minWidth: 180
                },
                {
                  id: 'language',
                  header: 'Language',
                  cell: item => item.language,
                  minWidth: 150
                }
              ]}
              items={[]}
              loadingText="Loading fields"
              empty={
                <Box textAlign="center" color="inherit">
                  <SpaceBetween size="m">
                    <Box variant="strong">No automatic semantic enrichment fields</Box>
                    <Box variant="p">Start by creating an automatic semantic enrichment field.</Box>
                    <Button>Add</Button>
                  </SpaceBetween>
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
              <Header
                variant="h2"
                description={
                  <>
                    Store large volumes of semi-structured data. Analyze in real-time for operational, security, user behavior, and business insights. <Link external>Learn more</Link>
                  </>
                }
              >
                Time series search fields (0)
              </Header>
            }
          >
            <Table
              columnDefinitions={[
                {
                  id: 'field',
                  header: 'Time series search field',
                  cell: item => item.field,
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
                  <SpaceBetween size="m">
                    <Box variant="strong">No time series fields</Box>
                    <Box variant="p">Start by creating a time series field.</Box>
                    <Button>Add</Button>
                  </SpaceBetween>
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
      </Form>
      <CommentsPanel screenName="Create Index" />
    </AWSLayout>
  );
}

export default CreateIndex;
