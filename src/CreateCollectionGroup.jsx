import { useState } from 'react';
import {
  Form,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
  Checkbox,
  Textarea,
  Select,
  Box,
  Link,
  ExpandableSection,
  Alert,
  ColumnLayout
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CreateCollectionGroup({ onCancel, onGroupCreated }) {
  const [groupName, setGroupName] = useState('');
  const [serverlessVersion, setServerlessVersion] = useState({ label: 'Serverless V2', value: 'v2' });
  const [deploymentType, setDeploymentType] = useState('standard');
  const [enableRetentionPolicy, setEnableRetentionPolicy] = useState(false);
  const [retentionDescription, setRetentionDescription] = useState('');
  const [minIndexingCapacity, setMinIndexingCapacity] = useState({ label: '-', value: '-', description: '' });
  const [maxIndexingCapacity, setMaxIndexingCapacity] = useState({ label: '96', value: '96', description: '576 GB RAM' });
  const [minSearchCapacity, setMinSearchCapacity] = useState({ label: '-', value: '-', description: '' });
  const [maxSearchCapacity, setMaxSearchCapacity] = useState({ label: '96', value: '96', description: '576 GB RAM' });

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Collection groups', href: '#/collection-groups' },
    { text: 'Create collection group', href: '#/create-collection-group' }
  ];

  const capacityOptions = [
    { label: '-', value: '-', description: '' },
    { label: '1', value: '1', description: '6 GB RAM' },
    { label: '2', value: '2', description: '12 GB RAM' },
    { label: '4', value: '4', description: '24 GB RAM' },
    { label: '8', value: '8', description: '48 GB RAM' },
    { label: '16', value: '16', description: '96 GB RAM' },
    { label: '32', value: '32', description: '192 GB RAM' },
    { label: '48', value: '48', description: '288 GB RAM' },
    { label: '64', value: '64', description: '384 GB RAM' },
    { label: '80', value: '80', description: '480 GB RAM' },
    { label: '96', value: '96', description: '576 GB RAM' }
  ];

  const maxCapacityOptions = [
    { label: '1', value: '1', description: '6 GB RAM' },
    { label: '2', value: '2', description: '12 GB RAM' },
    { label: '4', value: '4', description: '24 GB RAM' },
    { label: '8', value: '8', description: '48 GB RAM' },
    { label: '16', value: '16', description: '96 GB RAM' },
    { label: '32', value: '32', description: '192 GB RAM' },
    { label: '48', value: '48', description: '288 GB RAM' },
    { label: '64', value: '64', description: '384 GB RAM' },
    { label: '80', value: '80', description: '480 GB RAM' },
    { label: '96', value: '96', description: '576 GB RAM' }
  ];

  const handleCreate = () => {
    if (onGroupCreated) {
      onGroupCreated(groupName);
    }
  };

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collection-groups"
      onBreadcrumbClick={(href) => {
        if (href === '#/collection-groups') {
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
          <Header
            variant="h1"
            description={
              <>
                Create a new collection group and configure its settings. <Link external>Learn more</Link>
              </>
            }
          >
            Create collection group
          </Header>
        }
      >
        <SpaceBetween size="l">
          <ExpandableSection
            headerText="Organize collections and manage capacity"
            defaultExpanded={true}
            variant="container"
          >
            <SpaceBetween size="m">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ flex: '0 0 250px' }}>
                    <img 
                      src="/Illustration.svg"
                      alt="Collection groups illustration"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <SpaceBetween size="s">
                      <Box variant="p">
                        Use collection groups to share the same capacity plan (OCUs) across collections. Grouping collections with the same or different KMS keys to set scaling limits and monitor OCU usage at the group level.
                      </Box>
                      <Box variant="p" fontWeight="bold">
                        When you create a new collection group, you can:
                      </Box>
                      <ul style={{ marginLeft: '20px' }}>
                        <li>Add one or more collections (each collection can only belong to one group).</li>
                        <li>Set capacity limits to control costs and prevent runaway infrastructure and budgeting.</li>
                        <li>Organize collection by team, workload type or environment.</li>
                      </ul>
                    </SpaceBetween>
                  </div>
                </div>
              </SpaceBetween>
          </ExpandableSection>

          <Container header={<Header variant="h2">Collection group details</Header>}>
            <SpaceBetween size="m">
              <Alert type="info">
                Once set, the Collection group name and deployment type cannot be changed.
              </Alert>

              <ColumnLayout columns={2}>
                <FormField
                  label="Collection group name"
                  constraintText="Must start with a lowercase letter. Can only contain between 3 and 32 lowercase letters a-z, numbers 0-9, and the hyphen (-)."
                >
                  <Input
                    value={groupName}
                    onChange={({ detail }) => setGroupName(detail.value)}
                    placeholder="Enter collection group name"
                  />
                </FormField>
                <div></div>
              </ColumnLayout>

              <ColumnLayout columns={2}>
                <FormField
                  label="Serverless version"
                  description="Select the serverless version for your collection group."
                >
                  <Select
                    selectedOption={serverlessVersion}
                    onChange={({ detail }) => setServerlessVersion(detail.selectedOption)}
                    options={[
                      { label: 'Serverless V1', value: 'v1' },
                      { label: 'Serverless V2', value: 'v2' }
                    ]}
                  />
                </FormField>
                <div></div>
              </ColumnLayout>

              {serverlessVersion.value === 'v1' && (
                <FormField
                  label="Deployment type"
                  description="Select the deployment type for your use case."
                >
                  <SpaceBetween size="xs">
                    <Checkbox
                      checked={deploymentType === 'standard'}
                      onChange={() => setDeploymentType('standard')}
                    >
                      Enable redundancy (active-standby)
                    </Checkbox>
                    <Box variant="p" color="text-body-secondary" fontSize="body-s" margin={{ left: 'xxl' }}>
                      Recommended for production workloads. Creates a standby replica, which is optional for production workloads. Even with system (or) event that you need to restore costs by disabling redundant active-standby. Availability will be compromised in the event of an infrastructure failure while your replicas are disabled.
                    </Box>
                    <Checkbox
                      checked={deploymentType === 'non-redundant'}
                      onChange={() => setDeploymentType('non-redundant')}
                    >
                      Disable redundancy (non-redundant)
                    </Checkbox>
                    <Textarea
                      value={retentionDescription}
                      onChange={({ detail }) => setRetentionDescription(detail.value)}
                      placeholder="Enter collection group description"
                      rows={3}
                    />
                  </SpaceBetween>
                </FormField>
              )}
            </SpaceBetween>
          </Container>

          <Container header={<Header variant="h2">Capacity management</Header>}>
            <SpaceBetween size="m">
              <Box variant="p">
                Collection groups maximum capacity can be set to an account's maximum capacity limit.
              </Box>

              <Alert type="info">
                <SpaceBetween size="xs">
                  <Box variant="strong">Understand the impact of capacity changes</Box>
                  <Box variant="p">
                    Changing the minimum OCUs affects how your collection group scales:
                  </Box>
                  <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                    <li>A higher min OCU improves performance consistency but increases baseline cost.</li>
                    <li>A lower min OCU reduces overall spending but may limit performance under load.</li>
                    <li>Setting min = max OCU disables autoscaling, providing predictable costs but no usage-driven scaling.</li>
                  </ul>
                </SpaceBetween>
              </Alert>

              <ColumnLayout columns={2}>
                <FormField label="Minimum indexing capacity (OCUs)">
                  <Select
                    selectedOption={minIndexingCapacity}
                    onChange={({ detail }) => setMinIndexingCapacity(detail.selectedOption)}
                    options={capacityOptions}
                    triggerVariant="option"
                  />
                </FormField>
                <FormField label="Maximum indexing capacity (OCUs)">
                  <Select
                    selectedOption={maxIndexingCapacity}
                    onChange={({ detail }) => setMaxIndexingCapacity(detail.selectedOption)}
                    options={maxCapacityOptions}
                    triggerVariant="option"
                  />
                </FormField>
              </ColumnLayout>

              <ColumnLayout columns={2}>
                <FormField label="Minimum Search capacity (OCUs)">
                  <Select
                    selectedOption={minSearchCapacity}
                    onChange={({ detail }) => setMinSearchCapacity(detail.selectedOption)}
                    options={capacityOptions}
                    triggerVariant="option"
                  />
                </FormField>
                <FormField label="Maximum Search capacity (OCUs)">
                  <Select
                    selectedOption={maxSearchCapacity}
                    onChange={({ detail }) => setMaxSearchCapacity(detail.selectedOption)}
                    options={maxCapacityOptions}
                    triggerVariant="option"
                  />
                </FormField>
              </ColumnLayout>
            </SpaceBetween>
          </Container>

          <Container header={<Header variant="h2">Tags - optional</Header>}>
            <SpaceBetween size="m">
              <Box variant="p">
                You can add tags to describe your collection group. A tag consists of a case-sensitive key-value pair. For example, you can define a tag with key "Environment" and value "Production".
              </Box>
              <Box variant="p">
                No tags associated with this collection group.
              </Box>
              <Button>Add new tag</Button>
              <Box variant="p" color="text-body-secondary" fontSize="body-s">
                You can add 50 more tags.
              </Box>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
      <CommentsPanel screenName="Create Collection Group" />
    </AWSLayout>
  );
}

export default CreateCollectionGroup;
