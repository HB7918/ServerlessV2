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
  Alert
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CreateCollectionGroup({ onCancel, onGroupCreated }) {
  const [groupName, setGroupName] = useState('');
  const [serverlessVersion, setServerlessVersion] = useState({ label: 'Serverless V2', value: 'v2' });
  const [deploymentType, setDeploymentType] = useState('standard');
  const [enableRetentionPolicy, setEnableRetentionPolicy] = useState(false);
  const [retentionDescription, setRetentionDescription] = useState('');
  const [minIndexingCapacity, setMinIndexingCapacity] = useState({ label: '-', value: '-' });
  const [maxIndexingCapacity, setMaxIndexingCapacity] = useState({ label: '96', value: '96' });
  const [minSearchCapacity, setMinSearchCapacity] = useState({ label: '-', value: '-' });
  const [maxSearchCapacity, setMaxSearchCapacity] = useState({ label: '96', value: '96' });

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Collection groups', href: '#/collection-groups' },
    { text: 'Create collection group', href: '#/create-collection-group' }
  ];

  const capacityOptions = [
    { label: '-', value: '-' },
    { label: '2', value: '2' },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '16', value: '16' },
    { label: '32', value: '32' },
    { label: '48', value: '48' },
    { label: '64', value: '64' },
    { label: '96', value: '96' }
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
          <Container>
            <ExpandableSection
              headerText="Organize collections and manage capacity"
              defaultExpanded={true}
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
          </Container>

          <Container header={<Header variant="h2">Collection group details</Header>}>
            <SpaceBetween size="m">
              <Alert type="info">
                Once set, the Collection group name and deployment type cannot be changed.
              </Alert>

              <FormField
                label="Collection group name"
                description="Enter collection group name (Min: 3-32 alphanumeric characters (a-z, 0-9), hyphens (-), numbers (0-9), and the hyphen (-))"
              >
                <Input
                  value={groupName}
                  onChange={({ detail }) => setGroupName(detail.value)}
                  placeholder="Enter collection group name"
                />
              </FormField>

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

              <FormField label="Minimum indexing capacity (OCUs)">
                <Select
                  selectedOption={minIndexingCapacity}
                  onChange={({ detail }) => setMinIndexingCapacity(detail.selectedOption)}
                  options={capacityOptions}
                />
              </FormField>

              <FormField label="Maximum indexing capacity (OCUs)">
                <Select
                  selectedOption={maxIndexingCapacity}
                  onChange={({ detail }) => setMaxIndexingCapacity(detail.selectedOption)}
                  options={capacityOptions}
                />
              </FormField>

              <FormField label="Minimum Search capacity (OCUs)">
                <Select
                  selectedOption={minSearchCapacity}
                  onChange={({ detail }) => setMinSearchCapacity(detail.selectedOption)}
                  options={capacityOptions}
                />
              </FormField>

              <FormField label="Maximum Search capacity (OCUs)">
                <Select
                  selectedOption={maxSearchCapacity}
                  onChange={({ detail }) => setMaxSearchCapacity(detail.selectedOption)}
                  options={capacityOptions}
                />
              </FormField>
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
