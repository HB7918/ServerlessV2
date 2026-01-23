import React, { useState } from 'react';
import {
  Box,
  SpaceBetween,
  Alert,
  Button,
  Container,
  Header,
  FormField,
  Input,
  Link,
  Tiles,
  Select,
  RadioGroup,
  Checkbox,
  ContentLayout,
  ColumnLayout,
  ExpandableSection
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CreateCollection({ onCancel, onNavigateToV1, onCollectionCreated }) {
  const [formData, setFormData] = useState({
    collectionName: '',
    collectionType: 'timeseries',
    collectionGroup: null,
    customizeEncryption: false,
    kmsKey: '',
    accessType: 'public',
    vpcEndpoints: false,
    awsServicePrivateAccess: false
  });

  const [fixCollectionGroup, setFixCollectionGroup] = useState(false);
  const [customizeGroupSettings, setCustomizeGroupSettings] = useState(false);
  const [groupSettings, setGroupSettings] = useState({
    name: 'serverlessV2_27121',
    minIndexing: { label: '-', value: '-' },
    maxIndexing: { label: '96', value: '96', description: '576 GB RAM' },
    minSearch: { label: '-', value: '-' },
    maxSearch: { label: '96', value: '96', description: '576 GB RAM' }
  });

  const handleSubmit = () => {
    console.log('Collection created:', formData);
    onCollectionCreated(formData.collectionName || 'new-collection');
  };

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: 'Create collection', href: '#/collections/create' }
  ];

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collections"
      onBreadcrumbClick={(href) => {
        if (href === '#/collections') {
          onCancel();
        }
      }}
    >
      <ContentLayout
        header={
          <Header
            variant="h1"
            description="A collection is a logical group of indexes that work together to support your workloads. You cannot change the collection name, collection type, and encryption settings after the collection is created."
          >
            Create collection
          </Header>
        }
      >
        <SpaceBetween size="l">
          <Alert
            action={<Button onClick={onNavigateToV1}>Create Serverless v1 collection</Button>}
            type="info"
          >
            Creating latest generation of Amazon OpenSearch Serverless with instant auto scaling and scale-to-zero for cost optimization. To create previous generation of serverless collections, switch to create serverless v1 flow.
          </Alert>

          <Container header={<Header variant="h2">Collection details</Header>}>
            <SpaceBetween size="l">
              <FormField label="Collection name">
                <Input
                  placeholder="test"
                  value={formData.collectionName}
                  onChange={({ detail }) => setFormData({ ...formData, collectionName: detail.value })}
                />
              </FormField>

              <FormField
                label="Serverless version"
                info={<Link variant="info">Info</Link>}
              >
                <Box>Serverless v2</Box>
              </FormField>

              <FormField
                label="Collection type"
                description="Choose your use case."
                stretch
              >
                <Tiles
                  columns={3}
                  items={[
                    {
                      label: 'Time series',
                      description: 'Use for analyzing large volumes of semi-structured, machine-generated data and events.',
                      value: 'timeseries'
                    },
                    {
                      label: 'Search',
                      description: 'Use of full-text searches that power applications within your network.',
                      value: 'search'
                    },
                    {
                      label: 'Vector search',
                      description: 'Use for storing vector embeddings and performing semantic and similarity searches.',
                      value: 'vectorsearch'
                    }
                  ]}
                  value={formData.collectionType}
                  onChange={({ detail }) => setFormData({ ...formData, collectionType: detail.value })}
                />
              </FormField>

              {!fixCollectionGroup && (
                <Alert
                  type="error"
                  header="Collection group error"
                >
                  No collection groups exist. You can have Amazon OpenSearch Serverless fix this for you by selecting <strong>Fix it for me</strong>, or you can manually create a collection group. <Link external>Learn more</Link>
                </Alert>
              )}

              <FormField
                label="Collection group"
                description="Collections in the same group share OCUs and follow the group's min/max capacity settings. Each collection can only belong to one group. To create a new group, select Create new group (opens in a new tab), then return here and refresh to see your new group in the list."
                info={<Link variant="info">Info</Link>}
                stretch
              >
                <SpaceBetween size="m">
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Select
                      options={[
                        { label: 'Choose a collection group', value: '' }
                      ]}
                      placeholder="Choose a collection group"
                      selectedOption={formData.collectionGroup}
                      onChange={({ detail }) => setFormData({ ...formData, collectionGroup: detail.selectedOption })}
                      disabled={fixCollectionGroup}
                    />
                    <Button 
                      iconName="external" 
                      iconAlign="right"
                      onClick={() => window.open('/#/create-collection-group', '_blank')}
                      disabled={fixCollectionGroup}
                    >
                      Create new group
                    </Button>
                  </SpaceBetween>
                </SpaceBetween>
              </FormField>

              <Checkbox
                checked={fixCollectionGroup}
                onChange={({ detail }) => setFixCollectionGroup(detail.checked)}
              >
                <strong>Fix it for me</strong>
                <Box variant="p" color="text-body-secondary" margin={{ top: 'xxs' }}>
                  Amazon OpenSearch Serverless will fix this by automatically creating a collection group and adding this collection to it.
                </Box>
              </Checkbox>

              {fixCollectionGroup && (
                <ExpandableSection
                  headerText="Collection group settings"
                  defaultExpanded={true}
                >
                  <SpaceBetween size="l">
                    {!customizeGroupSettings ? (
                      <>
                        <ColumnLayout columns={3} variant="text-grid">
                          <div>
                            <Box variant="awsui-key-label">Collection group name</Box>
                            <div>{groupSettings.name}</div>
                          </div>
                          <div>
                            <SpaceBetween size="s">
                              <div>
                                <Box variant="awsui-key-label">Minimum indexing capacity (OCUs)</Box>
                                <div>0</div>
                              </div>
                              <div>
                                <Box variant="awsui-key-label">Maximum indexing capacity (OCUs)</Box>
                                <div>96</div>
                              </div>
                            </SpaceBetween>
                          </div>
                          <div>
                            <SpaceBetween size="s">
                              <div>
                                <Box variant="awsui-key-label">Minimum Search capacity (OCUs)</Box>
                                <div>0</div>
                              </div>
                              <div>
                                <Box variant="awsui-key-label">Maximum Search capacity (OCUs)</Box>
                                <div>96</div>
                              </div>
                            </SpaceBetween>
                          </div>
                        </ColumnLayout>
                        <Box>
                          <Button onClick={() => setCustomizeGroupSettings(true)}>Customize settings</Button>
                        </Box>
                      </>
                    ) : (
                      <SpaceBetween size="l">
                        <ColumnLayout columns={2}>
                          <FormField label="Collection group name">
                            <Input
                              value={groupSettings.name}
                              onChange={({ detail }) => setGroupSettings({ ...groupSettings, name: detail.value })}
                            />
                          </FormField>
                        </ColumnLayout>
                        <ColumnLayout columns={2}>
                          <FormField label="Minimum indexing capacity (OCUs)">
                            <Select
                              selectedOption={groupSettings.minIndexing}
                              onChange={({ detail }) => setGroupSettings({ ...groupSettings, minIndexing: detail.selectedOption })}
                              options={[
                                { label: '-', value: '-' },
                                { label: '96', value: '96', description: '576 GB RAM' }
                              ]}
                            />
                          </FormField>
                          <FormField label="Maximum indexing capacity (OCUs)">
                            <Select
                              selectedOption={groupSettings.maxIndexing}
                              onChange={({ detail }) => setGroupSettings({ ...groupSettings, maxIndexing: detail.selectedOption })}
                              options={[
                                { label: '96', value: '96', description: '576 GB RAM' }
                              ]}
                            />
                          </FormField>
                        </ColumnLayout>
                        <ColumnLayout columns={2}>
                          <FormField label="Minimum Search capacity (OCUs)">
                            <Select
                              selectedOption={groupSettings.minSearch}
                              onChange={({ detail }) => setGroupSettings({ ...groupSettings, minSearch: detail.selectedOption })}
                              options={[
                                { label: '-', value: '-' },
                                { label: '96', value: '96', description: '576 GB RAM' }
                              ]}
                            />
                          </FormField>
                          <FormField label="Maximum Search capacity (OCUs)">
                            <Select
                              selectedOption={groupSettings.maxSearch}
                              onChange={({ detail }) => setGroupSettings({ ...groupSettings, maxSearch: detail.selectedOption })}
                              options={[
                                { label: '96', value: '96', description: '576 GB RAM' }
                              ]}
                            />
                          </FormField>
                        </ColumnLayout>
                        <Box>
                          <Button onClick={() => {
                            setGroupSettings({
                              name: 'serverlessV2_27121',
                              minIndexing: { label: '-', value: '-' },
                              maxIndexing: { label: '96', value: '96', description: '576 GB RAM' },
                              minSearch: { label: '-', value: '-' },
                              maxSearch: { label: '96', value: '96', description: '576 GB RAM' }
                            });
                            setCustomizeGroupSettings(false);
                          }}>
                            Reset to default
                          </Button>
                        </Box>
                      </SpaceBetween>
                    )}
                  </SpaceBetween>
                </ExpandableSection>
              )}
            </SpaceBetween>
          </Container>

          <Container
            header={
              <Header
                variant="h2"
                info={<Link variant="info">Info</Link>}
              >
                Encryption
              </Header>
            }
          >
            <SpaceBetween size="l">
              <Box>
                Encryption at rest secures the indexes within your collection. For each collection, AWS KMS uses a symmetric encryption key. Encryption policies are the optimal way to manage KMS keys across multiple collections.{' '}
                <Link external>Manage encryption policies</Link>
              </Box>
              <Box>
                Your data is encrypted by default with a key that AWS owns and manages for you. To choose a different key, customize your encryption settings.
              </Box>
              <Checkbox
                checked={formData.customizeEncryption}
                onChange={({ detail }) => setFormData({ ...formData, customizeEncryption: detail.checked })}
              >
                Customize encryption settings (advanced)
              </Checkbox>
              <Box variant="small" color="text-body-secondary">
                To use the default key, clear this option.
              </Box>

              {formData.customizeEncryption && (
                <SpaceBetween size="l">
                  <FormField label="Choose an AWS KMS key">
                    <SpaceBetween direction="horizontal" size="xs">
                      <Input
                        placeholder="Choose an AWS KMS key or enter an ARN"
                        value={formData.kmsKey}
                        onChange={({ detail }) => setFormData({ ...formData, kmsKey: detail.value })}
                      />
                      <Button iconName="external" iconAlign="right">
                        Create an AWS KMS key
                      </Button>
                    </SpaceBetween>
                  </FormField>

                  <Box>
                    <Box variant="h4">AWS KMS key details</Box>
                    <Box margin={{ top: 'xs' }}>
                      <Box variant="awsui-key-label">Key ARN</Box>
                      <Link href="#">1c10ee1c-d4c7-a0e-beb4-59b6a3c990b9</Link>
                    </Box>
                  </Box>
                </SpaceBetween>
              )}
            </SpaceBetween>
          </Container>

          <Container
            header={
              <Header
                variant="h2"
                info={<Link variant="info">Info</Link>}
              >
                Network access settings
              </Header>
            }
          >
            <SpaceBetween size="l">
              <Box>
                Choose internet or VPC access. To enable VPC access, we use private IP addresses from your VPC, which provides an inherent layer of security. Collection VPC endpoints are created and managed solely within OpenSearch Serverless and are separate from domain VPC endpoints. The optimal way to manage network access and VPC endpoints across multiple collections is using network access policies.{' '}
                <Link external>View and manage network access policies</Link>
              </Box>
              <FormField label="Access type">
                <Box>
                  You can configure the same or different network settings for your collection endpoint and its corresponding OpenSearch Dashboards endpoint.
                </Box>
              </FormField>
              <FormField label="Access collections from">
                <RadioGroup
                  items={[
                    {
                      value: 'public',
                      label: 'Public'
                    },
                    {
                      value: 'private',
                      label: 'Private (recommended)'
                    }
                  ]}
                  value={formData.accessType}
                  onChange={({ detail }) => setFormData({ ...formData, accessType: detail.value })}
                />
              </FormField>

              {formData.accessType === 'private' && (
                <Box margin={{ left: 'xxl' }}>
                  <SpaceBetween size="m">
                    <Checkbox
                      checked={formData.vpcEndpoints}
                      onChange={({ detail }) => setFormData({ ...formData, vpcEndpoints: detail.checked })}
                    >
                      VPC endpoints for access
                    </Checkbox>
                    <Checkbox
                      checked={formData.awsServicePrivateAccess}
                      onChange={({ detail }) => setFormData({ ...formData, awsServicePrivateAccess: detail.checked })}
                    >
                      AWS service private access
                    </Checkbox>
                  </SpaceBetween>
                </Box>
              )}
            </SpaceBetween>
          </Container>

          <Container
            header={
              <Header variant="h2">
                Tags - <Box variant="span" fontWeight="normal" color="text-body-secondary">optional</Box>
              </Header>
            }
          >
            <SpaceBetween size="l">
              <Box>
                You can add tags to describe your collection. A tag consists of a case-sensitive key-value pair. For example, you can define a tag with a key-value pair of Environment Name=Development.
              </Box>
              <Box>No tags associated with this collection</Box>
              <Button>Add new tag</Button>
              <Box variant="small" color="text-body-secondary">
                You can add up to 50 tags.
              </Box>
            </SpaceBetween>
          </Container>

          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Create collection
              </Button>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </ContentLayout>
      <CommentsPanel screenName="Create Collection" />
    </AWSLayout>
  );
}

export default CreateCollection;
