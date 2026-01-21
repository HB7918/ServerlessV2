import React, { useState } from 'react';
import {
  Wizard,
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
  ColumnLayout
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';

function ConfigureCollectionStep({ formData, setFormData, onNavigateToV1 }) {
  return (
    <Box margin={{ bottom: 'l' }}>
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

            <FormField
              label="Collection group"
              description="Collections in the same group share OCUs and follow the group's min/max capacity settings. Each collection can only belong to one group. To create a new group, select Create new group (opens in a new tab), then return here and refresh to see your new group in the list."
              info={<Link variant="info">Info</Link>}
            >
              <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                <Select
                  options={[
                    { label: 'Choose a collection group', value: '' }
                  ]}
                  placeholder="Choose a collection group"
                  selectedOption={formData.collectionGroup}
                  onChange={({ detail }) => setFormData({ ...formData, collectionGroup: detail.selectedOption })}
                />
                <Button iconName="external" iconAlign="right">
                  Create new group
                </Button>
              </SpaceBetween>
            </FormField>
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
      </SpaceBetween>
    </Box>
  );
}

function ReviewStep({ formData, onEdit }) {
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <Header
          variant="h2"
          actions={<Button onClick={onEdit}>Edit</Button>}
        >
          Step 1: Collection settings
        </Header>

        <Container header={<Header variant="h3">Collection details</Header>}>
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="awsui-key-label">Name</Box>
              <div>{formData.collectionName || 'collectionname'}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Serverless version</Box>
              <div>Serverless v2</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Collection group</Box>
              <div>{formData.collectionGroup?.label || 'group1'}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">Collection type</Box>
              <div>{formData.collectionType === 'timeseries' ? 'Time-Series' : formData.collectionType === 'search' ? 'Search' : 'Vector search'}</div>
            </div>
          </ColumnLayout>
        </Container>

        <Container header={<Header variant="h3">Encryption</Header>}>
          <SpaceBetween size="xs">
            <Box variant="awsui-key-label">Selected AWS KMS key</Box>
            <div>{formData.customizeEncryption && formData.kmsKey ? formData.kmsKey : 'AWS owned key'}</div>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h3">Network access</Header>}>
          <SpaceBetween size="xs">
            <Box variant="awsui-key-label">Access type</Box>
            <div>{formData.accessType === 'public' ? 'Public' : 'Private'}</div>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h3">Tags</Header>}>
          <div>-</div>
        </Container>
      </SpaceBetween>
    </Box>
  );
}

function CreateCollection({ onCancel, onNavigateToV1 }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
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

  const handleNavigate = ({ detail }) => {
    setActiveStepIndex(detail.requestedStepIndex);
  };

  const handleSubmit = () => {
    console.log('Collection created:', formData);
    onCancel();
  };

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: 'Create collection', href: '#/collections/create' }
  ];

  const steps = [
    {
      title: 'Configure collection settings',
      info: <Link variant="info">Info</Link>,
      description: 'A collection is a logical group of indexes that work together to support your workloads. You cannot change the collection name, collection type, and encryption settings after the collection is created.',
      content: <ConfigureCollectionStep formData={formData} setFormData={setFormData} onNavigateToV1={onNavigateToV1} />
    },
    {
      title: 'Review and create',
      content: <ReviewStep formData={formData} onEdit={() => setActiveStepIndex(0)} />
    }
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
      <Wizard
        steps={steps}
        activeStepIndex={activeStepIndex}
        onNavigate={handleNavigate}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        i18nStrings={{
          stepNumberLabel: stepNumber => `Step ${stepNumber}`,
          collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
          navigationAriaLabel: 'Steps',
          cancelButton: 'Cancel',
          previousButton: 'Previous',
          nextButton: 'Next',
          submitButton: 'Create collection',
          optional: 'optional'
        }}
      />
    </AWSLayout>
  );
}

export default CreateCollection;
