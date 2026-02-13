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
  Textarea,
  Link,
  Tiles,
  RadioGroup,
  Checkbox
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function ConfigureCollectionStep({ formData, setFormData, onNavigateToV2 }) {
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">Collection details</Header>}>
          <SpaceBetween size="l">
            <FormField label="Collection name">
              <Input
                placeholder="Enter collection name"
                value={formData.collectionName}
                onChange={({ detail }) => setFormData({ ...formData, collectionName: detail.value })}
              />
            </FormField>

            <FormField label="Description - optional">
              <Textarea
                placeholder="Enter description"
                value={formData.description}
                onChange={({ detail }) => setFormData({ ...formData, description: detail.value })}
              />
            </FormField>

            <FormField
              label="Serverless version"
              description="This is the previous generation serverless v1 collections create flow."
              info={<Link variant="info">Info</Link>}
            >
              <Box>Serverless v1</Box>
            </FormField>

            <FormField
              label="Collection type"
              description={
                <>
                  Depending on your collection type, you can configure a timeseries serverless search, lexical search, and vector search.{' '}
                  <Link external>Learn more</Link>
                </>
              }
            >
              <Tiles
                columns={3}
                items={[
                  {
                    label: 'Time series',
                    description: 'Use for ingesting large volumes of semi-structured, machine-generated data in near-real time.',
                    value: 'timeseries'
                  },
                  {
                    label: 'Search',
                    description: 'Use for fast searches that power applications within your network.',
                    value: 'search'
                  },
                  {
                    label: 'Vector search',
                    description: 'Use for storing vector embeddings and performing semantic or similarity searches.',
                    value: 'vectorsearch'
                  }
                ]}
                value={formData.collectionType}
                onChange={({ detail }) => setFormData({ ...formData, collectionType: detail.value })}
              />
            </FormField>

            <FormField
              label="Deployment type"
              description="Specify the deployment settings for your use case."
            >
              <Checkbox
                checked={formData.enableRedundancy}
                onChange={({ detail }) => setFormData({ ...formData, enableRedundancy: detail.checked })}
              >
                Enable redundancy (active replicas)
              </Checkbox>
              <Box variant="p" color="text-body-secondary" margin={{ top: 'xs' }}>
                The default configuration includes active replicas enabled, which is optimal for production workloads. Clear this option if you want to reduce costs by disabling redundancy active replicas. Availability will be compromised in the event of an infrastructure failure when replicas are disabled.
              </Box>
            </FormField>

            <Alert type="info">
              You can configure index fields for lexical search, and automatic semantic-enrichment search.{' '}
              <Link external>Learn more</Link>
            </Alert>
          </SpaceBetween>
        </Container>

        <Container
          header={
            <Header
              variant="h2"
              description="Configure your collection's encryption, network access, and data access settings."
            >
              Security
            </Header>
          }
        >
          <SpaceBetween size="l">
            <RadioGroup
              items={[
                {
                  value: 'easy',
                  label: 'Easy create',
                  description: 'The fastest way to create collection. No configuration is required by using the default settings or matching security policies. Some configuration options can be changed later.'
                },
                {
                  value: 'standard',
                  label: 'Standard create',
                  description: 'Complete step-by-step settings using your preferred configuration. You can configure and specify all configuration options, including encryption, network access, and data access.'
                }
              ]}
              value={formData.securityMode}
              onChange={({ detail }) => setFormData({ ...formData, securityMode: detail.value })}
            />
            <Box variant="p" color="text-body-secondary">
              We preselect the default settings for you. If you would like to change any of these settings now, use standard create.
            </Box>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h2">Encryption</Header>}>
          <FormField label="Selected AWS KMS key">
            <Box>AWS owned key</Box>
          </FormField>
        </Container>

        <Container header={<Header variant="h2">Network access</Header>}>
          <FormField label="Access type">
            <Box>Public</Box>
          </FormField>
        </Container>

        <Container header={<Header variant="h2">Data access</Header>}>
          <Box>-</Box>
        </Container>

        <Alert type="info">
          Vector Search collections support Automatic Semantic Enrichment or vector fields.
        </Alert>
      </SpaceBetween>
    </Box>
  );
}

function CreateAutomaticStep({ formData, setFormData }) {
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">Step 2: Create Automatic Semantic Enrichment fields</Header>}>
          <Box>Configure automatic semantic enrichment fields...</Box>
        </Container>
      </SpaceBetween>
    </Box>
  );
}

function ReviewStep({ formData }) {
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <Header variant="h3">Review collection settings</Header>
        <Container header={<Header variant="h2">Collection details</Header>}>
          <SpaceBetween size="s">
            <Box>
              <Box variant="awsui-key-label">Collection name</Box>
              <Box>{formData.collectionName || '-'}</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">Description</Box>
              <Box>{formData.description || '-'}</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">Collection type</Box>
              <Box>{formData.collectionType || '-'}</Box>
            </Box>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Box>
  );
}

function CreateCollectionV1({ onCancel, onNavigateToV2, onCollectionCreated }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    collectionName: '',
    description: '',
    collectionType: 'timeseries',
    enableRedundancy: true,
    securityMode: 'easy'
  });

  const handleNavigate = ({ detail }) => {
    setActiveStepIndex(detail.requestedStepIndex);
  };

  const handleSubmit = () => {
    console.log('V1 Collection created:', formData);
    // Navigate to collection details with the created collection name
    onCollectionCreated(formData.collectionName || 'new-collection-v1');
  };

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: 'Create collection', href: '#/collections/create-v1' }
  ];

  const steps = [
    {
      title: 'Configure collection settings',
      info: <Link variant="info">Info</Link>,
      description: 'A collection is a logical group of indexes that work together to support your workloads. You cannot change the collection name, collection type, and encryption settings after the collection is created.',
      content: <ConfigureCollectionStep formData={formData} setFormData={setFormData} onNavigateToV2={onNavigateToV2} />
    },
    {
      title: 'Create automatic semantic enrichment fields - optional',
      content: <CreateAutomaticStep formData={formData} setFormData={setFormData} />
    },
    {
      title: 'Review and create collection',
      content: <ReviewStep formData={formData} />
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
      <SpaceBetween size="l">
        <Alert type="info">
          You're creating a Serverless v1 collection. Serverless v2 offers instant auto-scaling and scale-to-zero for cost optimization, up to 40% cost savings, scales in seconds (vs. 2-30 minutes), and makes newly indexed data searchable instantly. <Link href="#" external>Learn more</Link>. Or you can switch to <Link onFollow={() => onNavigateToV2()}>Serverless v2 collection creation</Link>.
        </Alert>
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
      </SpaceBetween>
      <CommentsPanel screenName="Create Collection V1" />
    </AWSLayout>
  );
}

export default CreateCollectionV1;
