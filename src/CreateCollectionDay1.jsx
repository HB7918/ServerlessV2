import { useState } from 'react';
import {
  Box,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
  Link,
  Tiles,
  ContentLayout,
  ExpandableSection,
  Table,
  Select,
  RadioGroup,
  Checkbox,
  ColumnLayout,
  Autosuggest,
  TokenGroup,
  Alert,
  StatusIndicator,
  Icon,
  Textarea,
  ButtonDropdown,
  Popover
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CreateCollectionDay1({ onCancel, onNavigateToV1, onCollectionCreated }) {
  const [formData, setFormData] = useState({
    collectionName: '',
    collectionType: 'search',
    customizeEncryption: false,
    kmsKey: '',
    accessType: 'public',
    vpcEndpoints: false,
    awsServicePrivateAccess: false,
    selectedVpcEndpoints: [],
    selectedAwsServices: []
  });

  const [customizeSettings, setCustomizeSettings] = useState(false);
  const [vpcInputValue, setVpcInputValue] = useState('');
  const [serviceInputValue, setServiceInputValue] = useState('');
  const [creationMethod, setCreationMethod] = useState('easy-create');
  
  // Easy create - Day1 user: select existing collection group
  const [easyCreateSelectedGroup, setEasyCreateSelectedGroup] = useState({ label: 'serverlessV2_27121', value: 'serverlessV2_27121', minIndexing: '0', maxIndexing: '96', minSearch: '0', maxSearch: '96', minIndexingRam: '', maxIndexingRam: '576 GB RAM', minSearchRam: '', maxSearchRam: '576 GB RAM' });
  const [isEditingGroupSelection, setIsEditingGroupSelection] = useState(false);
  
  const [easyCreateAppName, setEasyCreateAppName] = useState('opensearchui-1769533298515');
  const [isEditingAppName, setIsEditingAppName] = useState(false);
  const [easyCreateWorkspaceName, setEasyCreateWorkspaceName] = useState('workspace-1769533298515');
  const [isEditingWorkspaceName, setIsEditingWorkspaceName] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [creationSteps, setCreationSteps] = useState([
    { label: 'Creating collection', status: 'in-progress' }
  ]);

  // Available collection groups for Day1 user
  const existingCollectionGroups = [
    { label: 'serverlessV2_27121', value: 'serverlessV2_27121', minIndexing: '0', maxIndexing: '96', minSearch: '0', maxSearch: '96', minIndexingRam: '', maxIndexingRam: '576 GB RAM', minSearchRam: '', maxSearchRam: '576 GB RAM' },
    { label: 'serverlessV2_27122', value: 'serverlessV2_27122', minIndexing: '0', maxIndexing: '48', minSearch: '0', maxSearch: '48', minIndexingRam: '', maxIndexingRam: '288 GB RAM', minSearchRam: '', maxSearchRam: '288 GB RAM' },
    { label: 'production-group', value: 'production-group', minIndexing: '0', maxIndexing: '96', minSearch: '0', maxSearch: '96', minIndexingRam: '', maxIndexingRam: '576 GB RAM', minSearchRam: '', maxSearchRam: '576 GB RAM' }
  ];
  
  // Collection group settings (for standard create)
  const [groupSelection, setGroupSelection] = useState('select-existing');
  const [groupSettings, setGroupSettings] = useState({
    name: '',
    minIndexing: { label: '-', value: '-', description: '' },
    maxIndexing: { label: '96', value: '96', description: '576 GB RAM' },
    minSearch: { label: '-', value: '-', description: '' },
    maxSearch: { label: '96', value: '96', description: '576 GB RAM' },
    selectedGroup: null
  });

  // OpenSearch application settings
  const [appSettings, setAppSettings] = useState({
    applicationName: 'opensearchui-1769533298515',
    workspace: 'workspace-1769533298515',
    appSelection: 'create-new',
    workspaceSelection: 'create-new',
    selectedApp: null,
    selectedWorkspace: null,
    createNewApp: true
  });

  // Data access policy settings
  const [dataAccessSettings, setDataAccessSettings] = useState({
    policyOption: 'create-new',
    policyName: 'easy-weffsc',
    description: '',
    definitionMethod: 'visual',
    selectedExistingPolicy: null,
    ruleName: 'Rule 1',
    aliasPermissions: { create: false, describe: true, update: false, delete: false },
    indexPermissions: { create: false, describe: false, update: false, delete: false, read: false, write: false },
    modelPermissions: { create: false, describe: false, update: false, delete: false, execute: false }
  });

  const existingPolicies = [
    { label: 'data-access-policy-prod', value: 'data-access-policy-prod' },
    { label: 'data-access-policy-dev', value: 'data-access-policy-dev' },
    { label: 'data-access-policy-staging', value: 'data-access-policy-staging' }
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

  const handleSubmit = () => {
    console.log('Collection created:', formData);
    setIsCreating(true);
    setHasError(false);
    setCreationSteps([
      { label: 'Creating collection', status: 'in-progress' }
    ]);
    
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
    
    // Day1 user: simulate error after attempting to create
    setTimeout(() => {
      setCreationSteps([
        { label: 'Failed to create collection', status: 'error' }
      ]);
      setIsCreating(false);
      setHasError(true);
    }, 2000);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsCreating(true);
    setCreationSteps([
      { label: 'Creating collection', status: 'in-progress' }
    ]);
    
    // On retry, successfully create the collection
    setTimeout(() => {
      setCreationSteps([
        { label: 'Created collection', status: 'success' }
      ]);
      setTimeout(() => {
        onCollectionCreated(formData.collectionName || 'new-collection');
      }, 500);
    }, 2000);
  };

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Serverless: Collections', href: '#/collections' },
    { text: 'Create collection', href: '#/collections/create' }
  ];

  // Get selected group details for display
  const getSelectedGroupDetails = () => {
    if (!easyCreateSelectedGroup) return null;
    return existingCollectionGroups.find(g => g.value === easyCreateSelectedGroup.value);
  };

  const selectedGroupDetails = getSelectedGroupDetails();

  const defaultSettings = [
    { configuration: 'Collection group settings', value: 'Select existing collection group', editable: 'Yes', isSection: true },
    { 
      configuration: 'Collection group name', 
      value: easyCreateSelectedGroup ? easyCreateSelectedGroup.label : 'Select a collection group', 
      editable: 'No', 
      indent: true, 
      isGroupName: true 
    },
    { 
      configuration: 'Indexing capacity (OCUs)', 
      value: selectedGroupDetails 
        ? `${selectedGroupDetails.minIndexing} - ${selectedGroupDetails.maxIndexing} OCUs${selectedGroupDetails.maxIndexingRam ? ` (${selectedGroupDetails.maxIndexingRam})` : ''}` 
        : '-', 
      editable: 'No', 
      indent: true 
    },
    { 
      configuration: 'Search capacity (OCUs)', 
      value: selectedGroupDetails 
        ? `${selectedGroupDetails.minSearch} - ${selectedGroupDetails.maxSearch} OCUs${selectedGroupDetails.maxSearchRam ? ` (${selectedGroupDetails.maxSearchRam})` : ''}` 
        : '-', 
      editable: 'No', 
      indent: true 
    },
    { configuration: 'Encryption key', value: 'AWS Owned', editable: 'No', isSection: true },
    { configuration: 'Network access', value: 'Public', editable: 'Yes', isSection: true },
    { configuration: 'Data access', value: 'New policy', editable: 'Yes', isSection: true, isDataAccess: true },
    { configuration: 'Principals', value: 'arn:aws:iam::478031150999:role/Admin', editable: 'Yes', indent: true },
    { configuration: 'Policy name', value: 'easy-weffsc', editable: 'Yes', indent: true },
    { configuration: 'Permissions', value: ['aoss:CreateCollectionItems', 'aoss:DeleteCollectionItems', 'aoss:UpdateCollectionItems', 'aoss:DescribeCollectionItems', 'aoss:CreateIndex', 'aoss:DeleteIndex', 'aoss:UpdateIndex', 'aoss:DescribeIndex', 'aoss:ReadDocument', 'aoss:WriteDocument', 'aoss:DescribeMLResource', 'aoss:CreateMLResource', 'aoss:UpdateMLResource', 'aoss:DeleteMLResource', 'aoss:ExecuteMLResource'], editable: 'Yes', indent: true, isPermissions: true }
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
          <SpaceBetween size="s">
            <Header
              variant="h1"
              description="A collection is a logical group of indexes that work together to support your workloads. You cannot change the collection name, collection type, and encryption settings after the collection is created."
            >
              Create Serverless v2 collection - <em>Beta</em>
            </Header>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <div style={{ pointerEvents: isCreating ? 'none' : 'auto', opacity: isCreating ? 0.6 : 1 }}>
          <SpaceBetween size="l">
          <Container header={<Header variant="h2">Collection details</Header>}>
            <SpaceBetween size="l">
              <FormField 
                label="Collection name"
                constraintText="The name must start with a lowercase letter and must be between 3 and 32 characters. Valid characters are a-z (lowercase only), 0-9, and - (hyphen)."
              >
                <Input
                  placeholder="test"
                  value={formData.collectionName}
                  onChange={({ detail }) => setFormData({ ...formData, collectionName: detail.value })}
                  disabled={isCreating}
                />
              </FormField>

              <FormField
                label="Serverless version"
                description={
                  <>
                    Creating latest generation of Amazon OpenSearch Serverless with instant auto scaling and scale-to-zero for cost optimization. <Link onFollow={() => onNavigateToV1()}>Switch to Serverless v1</Link>
                  </>
                }
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
                      description: 'Use for analyzing large volumes of semi-structured, machine-generated data and events. Not supported for beta release.',
                      value: 'timeseries',
                      disabled: true
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
            </SpaceBetween>
          </Container>

          {/* Stacked Containers for Customize Settings */}
          <div>
            <Container
              variant="stacked"
              header={
                <Header 
                  variant="h2"
                  description="Configure your collection's encryption, network access, and data access settings."
                >
                  Collection creation method
                </Header>
              }
            >
              <SpaceBetween size="m">
                <Tiles
                  columns={2}
                  items={[
                    {
                      label: 'Easy create',
                      description: 'The fastest way to create collection. No configuration is required by using the default settings or matching security policies. Some configuration options can be changed later.',
                      value: 'easy-create'
                    },
                    {
                      label: 'Standard create',
                      description: 'Configure security settings with your preferred configuration. You can configure and specify all configuration options, including encryption, network access, and data access.',
                      value: 'standard-create'
                    }
                  ]}
                  value={creationMethod}
                  onChange={({ detail }) => setCreationMethod(detail.value)}
                />
                {creationMethod === 'easy-create' && (
                  <Box color="text-body-secondary">
                    We provided the default settings for you. If you would like to change any of these settings now, use standard create.
                  </Box>
                )}
              </SpaceBetween>
            </Container>
            {creationMethod === 'easy-create' && (
              <Container
                variant="stacked"
                header={<Header variant="h2">Default settings for the collection</Header>}
              >
                <div 
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ '--table-cell-vertical-align': 'top' }}
                  className="easy-create-table"
                >
                <Table
                  columnDefinitions={[
                    {
                      id: 'configuration',
                      header: 'Configuration',
                      cell: item => {
                        const content = item.isSection ? <Box fontWeight="bold">{item.configuration}</Box> : item.indent ? <Box margin={{ left: 'l' }}>{item.configuration}</Box> : item.configuration;
                        return (
                          <div 
                            onMouseEnter={() => setHoveredRow(item.configuration)}
                            style={{ cursor: 'default', padding: '4px 0', verticalAlign: 'top' }}
                          >
                            {item.hasBottomBorder ? <div style={{ borderBottom: '1px solid #e9ebed', paddingBottom: '8px', marginBottom: '-8px' }}>{content}</div> : content}
                          </div>
                        );
                      },
                      width: 300,
                      verticalAlign: 'top'
                    },
                    {
                      id: 'value',
                      header: <SpaceBetween direction="horizontal" size="xs"><span>Value</span><Icon name="edit" size="small" /></SpaceBetween>,
                      cell: item => {
                        const isHovered = hoveredRow === item.configuration;
                        
                        // Day1 user: Collection group name is a dropdown
                        if (item.isGroupName) {
                          if (isEditingGroupSelection) {
                            return (
                              <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                              <SpaceBetween direction="horizontal" size="xs">
                                <div style={{ width: '250px' }}>
                                  <Select
                                    selectedOption={easyCreateSelectedGroup}
                                    onChange={({ detail }) => setEasyCreateSelectedGroup(detail.selectedOption)}
                                    options={existingCollectionGroups}
                                    placeholder="Select a collection group"
                                    expandToViewport
                                  />
                                </div>
                                <Button variant="icon" iconName="check" onClick={() => setIsEditingGroupSelection(false)} />
                                <Button variant="icon" iconName="close" onClick={() => {
                                  setEasyCreateSelectedGroup({ label: 'serverlessV2_27121', value: 'serverlessV2_27121', minIndexing: '0', maxIndexing: '96', minSearch: '0', maxSearch: '96', minIndexingRam: '', maxIndexingRam: '576 GB RAM', minSearchRam: '', maxSearchRam: '576 GB RAM' });
                                  setIsEditingGroupSelection(false);
                                }} />
                              </SpaceBetween>
                              </div>
                            );
                          }
                          return (
                            <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ cursor: 'pointer', padding: '4px 0' }}>
                            <SpaceBetween direction="horizontal" size="xs">
                              <span>{item.value}</span>
                              {isHovered && <Button variant="inline-icon" iconName="edit" onClick={() => setIsEditingGroupSelection(true)} />}
                            </SpaceBetween>
                            </div>
                          );
                        }
                        if (item.isAppName) {
                          if (isEditingAppName) {
                            return (
                              <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                              <SpaceBetween direction="horizontal" size="xs">
                                <Input
                                  value={easyCreateAppName}
                                  onChange={({ detail }) => setEasyCreateAppName(detail.value)}
                                  autoFocus
                                />
                                <Button variant="icon" iconName="check" onClick={() => setIsEditingAppName(false)} />
                                <Button variant="icon" iconName="close" onClick={() => {
                                  setEasyCreateAppName('opensearchui-1769533298515');
                                  setIsEditingAppName(false);
                                }} />
                              </SpaceBetween>
                              </div>
                            );
                          }
                          return (
                            <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ cursor: 'pointer', padding: '4px 0' }}>
                            <SpaceBetween direction="horizontal" size="xs">
                              <span>{item.value}</span>
                              {isHovered && <Button variant="inline-icon" iconName="edit" onClick={() => setIsEditingAppName(true)} />}
                            </SpaceBetween>
                            </div>
                          );
                        }
                        if (item.isWorkspaceName) {
                          if (isEditingWorkspaceName) {
                            return (
                              <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                              <SpaceBetween direction="horizontal" size="xs">
                                <Input
                                  value={easyCreateWorkspaceName}
                                  onChange={({ detail }) => setEasyCreateWorkspaceName(detail.value)}
                                  autoFocus
                                />
                                <Button variant="icon" iconName="check" onClick={() => setIsEditingWorkspaceName(false)} />
                                <Button variant="icon" iconName="close" onClick={() => {
                                  setEasyCreateWorkspaceName('workspace-1769533298515');
                                  setIsEditingWorkspaceName(false);
                                }} />
                              </SpaceBetween>
                              </div>
                            );
                          }
                          return (
                            <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ cursor: 'pointer', padding: '4px 0' }}>
                            <SpaceBetween direction="horizontal" size="xs">
                              <span>{item.value}</span>
                              {isHovered && <Button variant="inline-icon" iconName="edit" onClick={() => setIsEditingWorkspaceName(true)} />}
                            </SpaceBetween>
                            </div>
                          );
                        }
                        // Permissions row
                        if (item.isPermissions) {
                          return (
                            <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                              {showPermissions ? (
                                <SpaceBetween size="xxs">
                                  {item.value.map((permission, idx) => (
                                    <div key={idx}>{permission}</div>
                                  ))}
                                  <Link onFollow={(e) => { e.preventDefault(); setShowPermissions(false); }}>Hide permissions</Link>
                                </SpaceBetween>
                              ) : (
                                <Link onFollow={(e) => { e.preventDefault(); setShowPermissions(true); }}>View full permissions ({item.value.length})</Link>
                              )}
                            </div>
                          );
                        }
                        // Non-editable items
                        if (item.hasBottomBorder) {
                          return (
                            <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                              <div style={{ borderBottom: '1px solid #e9ebed', paddingBottom: '8px', marginBottom: '-8px' }}>
                                <SpaceBetween direction="horizontal" size="xs">
                                  <span>{item.value}</span>
                                  {isHovered && (
                                    <Popover
                                      dismissButton={false}
                                      position="top"
                                      size="small"
                                      triggerType="custom"
                                      content="If you would like to make changes, use standard create."
                                    >
                                      <span style={{ color: '#5f6b7a', cursor: 'pointer' }}><Icon name="lock-private" size="small" /></span>
                                    </Popover>
                                  )}
                                </SpaceBetween>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                          <SpaceBetween direction="horizontal" size="xs">
                            <span>{item.value}</span>
                            {isHovered && (
                              <Popover
                                dismissButton={false}
                                position="top"
                                size="small"
                                triggerType="custom"
                                content="If you would like to make changes, use standard create."
                              >
                                <span style={{ color: '#5f6b7a', cursor: 'pointer' }}><Icon name="lock-private" size="small" /></span>
                              </Popover>
                            )}
                          </SpaceBetween>
                          </div>
                        );
                      },
                      width: 250
                    },
                    {
                      id: 'editable',
                      header: 'Editable after creation',
                      cell: item => {
                        return (
                          <div onMouseEnter={() => setHoveredRow(item.configuration)} style={{ padding: '4px 0' }}>
                            {item.hasBottomBorder ? <div style={{ borderBottom: '1px solid #e9ebed', paddingBottom: '8px', marginBottom: '-8px' }}>{item.editable}</div> : item.editable}
                          </div>
                        );
                      },
                      width: 180
                    }
                  ]}
                  items={defaultSettings}
                  variant="embedded"
                  stripedRows={false}
                  contentDensity="compact"
                />
                </div>
              </Container>
            )}

            {creationMethod === 'standard-create' && (
            <>
            <Container
              variant="stacked"
              header={
                <Header 
                  variant="h2"
                  description={<>Collections in the same group share OCUs and follow the group's min/max capacity settings. Each collection can only belong to one group. To create a new group, select Create new group (opens in a new tab), then return here and refresh to see your new group in the list. <Link external>Learn more</Link></>}
                >
                  Collection group settings
                </Header>
              }
            >
              <SpaceBetween size="m">
                <Box>
                  <Box variant="awsui-key-label" margin={{ bottom: 'xxs' }}>Collection group selection</Box>
                  <Tiles
                    columns={2}
                    items={[
                      {
                        label: 'Select existing collection group',
                        value: 'select-existing'
                      },
                      {
                        label: 'Create new collection group',
                        value: 'create-new'
                      }
                    ]}
                    value={groupSelection}
                    onChange={({ detail }) => setGroupSelection(detail.value)}
                  />
                </Box>
                
                <FormField label="Collection group name">
                  <div style={{ width: 'calc(50% - 6px)' }}>
                    {groupSelection === 'select-existing' ? (
                      <Select
                        selectedOption={groupSettings.selectedGroup}
                        onChange={({ detail }) => setGroupSettings({ ...groupSettings, selectedGroup: detail.selectedOption, name: detail.selectedOption.value })}
                        options={existingCollectionGroups}
                        placeholder="Select a collection group"
                      />
                    ) : (
                      <Input
                        value={groupSettings.name}
                        onChange={({ detail }) => setGroupSettings({ ...groupSettings, name: detail.value })}
                      />
                    )}
                  </div>
                </FormField>

                {groupSelection === 'select-existing' ? (
                  <ColumnLayout columns={2} variant="text-grid">
                    <SpaceBetween size="m">
                      <div>
                        <Box variant="awsui-key-label">Minimum indexing capacity (OCUs)</Box>
                        <div>{groupSettings.selectedGroup ? `${existingCollectionGroups.find(g => g.value === groupSettings.selectedGroup.value)?.minIndexing || '8'} OCUs` : '-'}</div>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Maximum indexing capacity (OCUs)</Box>
                        <div>{groupSettings.selectedGroup ? `${existingCollectionGroups.find(g => g.value === groupSettings.selectedGroup.value)?.maxIndexing || '96'} OCUs` : '-'}</div>
                      </div>
                    </SpaceBetween>
                    <SpaceBetween size="m">
                      <div>
                        <Box variant="awsui-key-label">Minimum Search capacity (OCUs)</Box>
                        <div>{groupSettings.selectedGroup ? `${existingCollectionGroups.find(g => g.value === groupSettings.selectedGroup.value)?.minSearch || '8'} OCUs` : '-'}</div>
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Maximum Search capacity (OCUs)</Box>
                        <div>{groupSettings.selectedGroup ? `${existingCollectionGroups.find(g => g.value === groupSettings.selectedGroup.value)?.maxSearch || '96'} OCUs` : '-'}</div>
                      </div>
                    </SpaceBetween>
                  </ColumnLayout>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <FormField 
                        label="Minimum indexing capacity (OCUs)"
                        description="Baseline resources for data ingestion. Higher values improve write consistency but increase baseline costs. Each OCU = 6 GB RAM."
                      >
                        <Select
                          selectedOption={groupSettings.minIndexing}
                          onChange={({ detail }) => setGroupSettings({ ...groupSettings, minIndexing: detail.selectedOption })}
                          options={capacityOptions}
                          filteringType="auto"
                          filteringPlaceholder="Enter a number"
                          triggerVariant="option"
                        />
                      </FormField>
                      <FormField 
                        label="Maximum indexing capacity (OCUs)"
                        description="Upper limit for indexing during peak demand. Auto-scales to this limit. Setting too low may throttle writes. Default: 96 OCUs (576 GB RAM)."
                      >
                        <Select
                          selectedOption={groupSettings.maxIndexing}
                          onChange={({ detail }) => setGroupSettings({ ...groupSettings, maxIndexing: detail.selectedOption })}
                          options={maxCapacityOptions}
                          filteringType="auto"
                          filteringPlaceholder="Enter a number"
                          triggerVariant="option"
                        />
                      </FormField>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <FormField 
                        label="Minimum Search capacity (OCUs)"
                        description="Baseline resources for queries. Higher values ensure consistent response times. Each OCU = 6 GB RAM."
                      >
                        <Select
                          selectedOption={groupSettings.minSearch}
                          onChange={({ detail }) => setGroupSettings({ ...groupSettings, minSearch: detail.selectedOption })}
                          options={capacityOptions}
                          filteringType="auto"
                          filteringPlaceholder="Enter a number"
                          triggerVariant="option"
                        />
                      </FormField>
                      <FormField 
                        label="Maximum Search capacity (OCUs)"
                        description="Upper limit for search during peak traffic. Auto-scales to this limit. Setting too low may slow queries. Default: 96 OCUs (576 GB RAM)."
                      >
                        <Select
                          selectedOption={groupSettings.maxSearch}
                          onChange={({ detail }) => setGroupSettings({ ...groupSettings, maxSearch: detail.selectedOption })}
                          options={maxCapacityOptions}
                          filteringType="auto"
                          filteringPlaceholder="Enter a number"
                          triggerVariant="option"
                        />
                      </FormField>
                    </div>
                  </>
                )}
              </SpaceBetween>
            </Container>

            <Container
              variant="stacked"
              header={
                <Header 
                  variant="h2"
                  description={<>Encryption at rest secures the indexes within your collection. For each collection, AWS KMS uses a symmetric encryption key. Encryption policies are the optimal way to manage KMS keys across multiple collections. <Link external>Manage encryption policies</Link></>}
                >
                  Encryption
                </Header>
              }
            >
              <SpaceBetween size="s">
                <Box>
                  Your data is encrypted by default with a key that AWS owns and manages for you. To choose a different key, customize your encryption settings.
                </Box>
                <Checkbox
                  checked={formData.customizeEncryption}
                  onChange={({ detail }) => setFormData({ ...formData, customizeEncryption: detail.checked })}
                >
                  <div>
                    Customize encryption settings (advanced)
                    <div style={{ color: '#5f6b7a', fontSize: '12px' }}>
                      To use the default key, clear this option.
                    </div>
                  </div>
                </Checkbox>

                {formData.customizeEncryption && (
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
                )}
              </SpaceBetween>
            </Container>
            <Container
              variant="stacked"
              header={
                <Header 
                  variant="h2"
                  description={<>Choose internet or VPC access. To enable VPC access, we use private IP addresses from your VPC, which provides an inherent layer of security. Collection VPC endpoints are created and managed solely within OpenSearch Serverless and are separate from domain VPC endpoints. The optimal way to manage network access and VPC endpoints across multiple collections is using network access policies. <Link external>View and manage network access policies</Link></>}
                >
                  Network access settings
                </Header>
              }
            >
              <SpaceBetween size="m">
                <FormField label="Access type">
                  <Box color="text-body-secondary">
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
                        label: 'Private'
                      }
                    ]}
                    value={formData.accessType}
                    onChange={({ detail }) => setFormData({ ...formData, accessType: detail.value })}
                  />
                </FormField>

                {formData.accessType === 'private' && (
                  <Box margin={{ left: 'l' }}>
                    <SpaceBetween size="m">
                      <SpaceBetween size="xs">
                        <Checkbox
                          checked={formData.vpcEndpoints}
                          onChange={({ detail }) => setFormData({ ...formData, vpcEndpoints: detail.checked })}
                        >
                          VPC endpoints for access
                        </Checkbox>
                        {formData.vpcEndpoints && (
                          <Box margin={{ left: 'l' }}>
                            <SpaceBetween size="xs">
                              <Box color="text-body-secondary">
                                Choose one or more VPC endpoints or input VPCe ID to allow access to collection.
                              </Box>
                              <SpaceBetween direction="horizontal" size="xs">
                                <div style={{ width: '400px' }}>
                                  <Autosuggest
                                    value={vpcInputValue}
                                    onChange={({ detail }) => setVpcInputValue(detail.value)}
                                    onSelect={({ detail }) => {
                                      if (detail.value && !formData.selectedVpcEndpoints.find(t => t.label === detail.value)) {
                                        setFormData({
                                          ...formData,
                                          selectedVpcEndpoints: [...formData.selectedVpcEndpoints, { label: `VPCe id = ${detail.value}`, dismissLabel: `Remove ${detail.value}` }]
                                        });
                                        setVpcInputValue('');
                                      }
                                    }}
                                    options={[
                                      { value: 'vpce-007aabb47506742bd' },
                                      { value: 'vpce-0123456789abcdef0' },
                                      { value: 'vpce-abcdef0123456789a' }
                                    ]}
                                    placeholder="Select VPC endpoints or input VPCe ID"
                                    empty="No VPC endpoints found"
                                  />
                                </div>
                                <Button iconName="refresh" variant="icon" />
                                <Button>Create VPC endpoints</Button>
                              </SpaceBetween>
                              {formData.selectedVpcEndpoints.length > 0 && (
                                <TokenGroup
                                  items={formData.selectedVpcEndpoints}
                                  onDismiss={({ detail: { itemIndex } }) => {
                                    setFormData({
                                      ...formData,
                                      selectedVpcEndpoints: formData.selectedVpcEndpoints.filter((_, index) => index !== itemIndex)
                                    });
                                  }}
                                />
                              )}
                            </SpaceBetween>
                          </Box>
                        )}
                      </SpaceBetween>

                      <Checkbox
                        checked={formData.awsServicePrivateAccess}
                        onChange={({ detail }) => setFormData({ ...formData, awsServicePrivateAccess: detail.checked })}
                      >
                        AWS service private access
                      </Checkbox>
                      {formData.awsServicePrivateAccess && (
                        <Box margin={{ left: 'l' }}>
                          <SpaceBetween size="xs">
                            <Box color="text-body-secondary">
                              With AWS service private access, you can provide private network access to OpenSearch Serverless collections for other AWS services. Select one or more services from the dropdown. Access only applies to the OpenSearch endpoint, not to OpenSearch Dashboards.
                            </Box>
                            <div style={{ width: '400px' }}>
                              <Autosuggest
                                value={serviceInputValue}
                                onChange={({ detail }) => setServiceInputValue(detail.value)}
                                onSelect={({ detail }) => {
                                  if (detail.value && !formData.selectedAwsServices.find(t => t.label.includes(detail.value))) {
                                    setFormData({
                                      ...formData,
                                      selectedAwsServices: [...formData.selectedAwsServices, { label: `Service = ${detail.value}`, dismissLabel: `Remove ${detail.value}` }]
                                    });
                                    setServiceInputValue('');
                                  }
                                }}
                                options={[
                                  { value: 'bedrock.amazonaws.com' },
                                  { value: 'lambda.amazonaws.com' },
                                  { value: 'sagemaker.amazonaws.com' },
                                  { value: 'kendra.amazonaws.com' }
                                ]}
                                placeholder="Select AWS services or input access string"
                                empty="No services found"
                              />
                            </div>
                            {formData.selectedAwsServices.length > 0 && (
                              <TokenGroup
                                items={formData.selectedAwsServices}
                                onDismiss={({ detail: { itemIndex } }) => {
                                  setFormData({
                                    ...formData,
                                    selectedAwsServices: formData.selectedAwsServices.filter((_, index) => index !== itemIndex)
                                  });
                                }}
                              />
                            )}
                          </SpaceBetween>
                        </Box>
                      )}
                    </SpaceBetween>
                  </Box>
                )}
              </SpaceBetween>
            </Container>

            <Container
              variant="stacked"
              header={
                <Header 
                  variant="h2"
                  description={<>Data access policies define which principals (IAM users, roles, or SAML identities) can access the data in your collections and indexes. You can create a new policy or select an existing one. <Link external>Learn more</Link></>}
                >
                  Data access policy settings
                </Header>
              }
            >
              <SpaceBetween size="l">
                <FormField label="Choose an option for the rules that you want to define">
                  <RadioGroup
                    items={[
                      { value: 'create-new', label: 'Create as a new data access policy' },
                      { value: 'add-existing', label: 'Add to an existing data access policy' }
                    ]}
                    value={dataAccessSettings.policyOption}
                    onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, policyOption: detail.value })}
                  />
                </FormField>

                {dataAccessSettings.policyOption === 'add-existing' && (
                  <FormField label="Select existing policy">
                    <div style={{ width: '50%' }}>
                      <Select
                        selectedOption={dataAccessSettings.selectedExistingPolicy}
                        onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, selectedExistingPolicy: detail.selectedOption })}
                        options={existingPolicies}
                        placeholder="Select a data access policy"
                      />
                    </div>
                  </FormField>
                )}

                {dataAccessSettings.policyOption === 'create-new' && (
                  <>
                    <FormField label="Access policy name">
                      <Input
                        placeholder="Enter policy name"
                        value={dataAccessSettings.policyName}
                        onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, policyName: detail.value })}
                      />
                    </FormField>

                    <FormField label={<>Description - <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>optional</span></>}>
                      <Textarea
                        placeholder="Enter description"
                        value={dataAccessSettings.description}
                        onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, description: detail.value })}
                        rows={3}
                      />
                    </FormField>
                  </>
                )}

                <FormField label="Select policy definition method">
                  <RadioGroup
                    items={[
                      { value: 'visual', label: 'Visual editor' },
                      { value: 'json', label: 'JSON' }
                    ]}
                    value={dataAccessSettings.definitionMethod}
                    onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, definitionMethod: detail.value })}
                  />
                </FormField>

                <ExpandableSection
                  headerText="Rule 1"
                  headerDescription="Select the principal(s) first, and then identify the resources and permissions that the principal(s) can use."
                  defaultExpanded={true}
                  headerActions={<Button disabled onClick={(e) => { e.stopPropagation(); }}>Remove</Button>}
                >
                  <SpaceBetween size="l">
                    <FormField 
                      label="Rule name"
                      constraintText="Limit around 30 characters long."
                    >
                      <div style={{ width: '50%' }}>
                        <Input
                          value={dataAccessSettings.ruleName}
                          onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, ruleName: detail.value })}
                        />
                      </div>
                    </FormField>

                    <div>
                      <SpaceBetween size="m">
                        <div>
                          <Box variant="h4">Select principals</Box>
                          <Box color="text-body-secondary">
                            Select either an IAM user that you create in AWS, or a SAML user who's authorized to use applications within AWS IAM Identity Center user portal.
                          </Box>
                        </div>
                        <ButtonDropdown
                          items={[
                            { id: 'iam-users', text: 'IAM users and roles' },
                            { id: 'saml', text: 'SAML users and groups' }
                          ]}
                          variant="normal"
                        >
                          Add principals
                        </ButtonDropdown>

                        <div>
                          <Box variant="h4">Grant permissions</Box>
                          <Box color="text-body-secondary">
                            Specify the types of permissions to grant for aliases, templates, and indexes in the selected collections.
                          </Box>
                        </div>
                        
                        <SpaceBetween size="xs">
                          <SpaceBetween direction="horizontal" size="xs">
                            <Box fontWeight="bold">Alias and templates permissions</Box>
                            <Link onFollow={() => setDataAccessSettings({ ...dataAccessSettings, aliasPermissions: { create: true, describe: true, update: true, delete: true } })}>Select all</Link>
                          </SpaceBetween>
                          <SpaceBetween direction="horizontal" size="l">
                            <Checkbox checked={dataAccessSettings.aliasPermissions.create} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, aliasPermissions: { ...dataAccessSettings.aliasPermissions, create: detail.checked } })}>Create</Checkbox>
                            <Checkbox checked={dataAccessSettings.aliasPermissions.describe} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, aliasPermissions: { ...dataAccessSettings.aliasPermissions, describe: detail.checked } })}>Describe</Checkbox>
                            <Checkbox checked={dataAccessSettings.aliasPermissions.update} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, aliasPermissions: { ...dataAccessSettings.aliasPermissions, update: detail.checked } })}>Update</Checkbox>
                            <Checkbox checked={dataAccessSettings.aliasPermissions.delete} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, aliasPermissions: { ...dataAccessSettings.aliasPermissions, delete: detail.checked } })}>Delete</Checkbox>
                          </SpaceBetween>
                        </SpaceBetween>

                        <SpaceBetween size="xs">
                          <SpaceBetween direction="horizontal" size="xs">
                            <Box fontWeight="bold">Index permissions</Box>
                            <Link onFollow={() => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { create: true, describe: true, update: true, delete: true, read: true, write: true } })}>Select all</Link>
                          </SpaceBetween>
                          <SpaceBetween direction="horizontal" size="l">
                            <Checkbox checked={dataAccessSettings.indexPermissions.create} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, create: detail.checked } })}>Create</Checkbox>
                            <Checkbox checked={dataAccessSettings.indexPermissions.describe} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, describe: detail.checked } })}>Describe</Checkbox>
                            <Checkbox checked={dataAccessSettings.indexPermissions.update} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, update: detail.checked } })}>Update</Checkbox>
                            <Checkbox checked={dataAccessSettings.indexPermissions.delete} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, delete: detail.checked } })}>Delete</Checkbox>
                            <Checkbox checked={dataAccessSettings.indexPermissions.read} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, read: detail.checked } })}>Read documents</Checkbox>
                            <Checkbox checked={dataAccessSettings.indexPermissions.write} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, indexPermissions: { ...dataAccessSettings.indexPermissions, write: detail.checked } })}>Write or update documents</Checkbox>
                          </SpaceBetween>
                        </SpaceBetween>

                        <SpaceBetween size="xs">
                          <SpaceBetween direction="horizontal" size="xs">
                            <Box fontWeight="bold">Model permissions</Box>
                            <Link onFollow={() => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { create: true, describe: true, update: true, delete: true, execute: true } })}>Select all</Link>
                          </SpaceBetween>
                          <SpaceBetween direction="horizontal" size="l">
                            <Checkbox checked={dataAccessSettings.modelPermissions.create} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { ...dataAccessSettings.modelPermissions, create: detail.checked } })}>Create</Checkbox>
                            <Checkbox checked={dataAccessSettings.modelPermissions.describe} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { ...dataAccessSettings.modelPermissions, describe: detail.checked } })}>Describe</Checkbox>
                            <Checkbox checked={dataAccessSettings.modelPermissions.update} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { ...dataAccessSettings.modelPermissions, update: detail.checked } })}>Update</Checkbox>
                            <Checkbox checked={dataAccessSettings.modelPermissions.delete} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { ...dataAccessSettings.modelPermissions, delete: detail.checked } })}>Delete</Checkbox>
                            <Checkbox checked={dataAccessSettings.modelPermissions.execute} onChange={({ detail }) => setDataAccessSettings({ ...dataAccessSettings, modelPermissions: { ...dataAccessSettings.modelPermissions, execute: detail.checked } })}>Execute</Checkbox>
                          </SpaceBetween>
                        </SpaceBetween>
                        
                        <div style={{ borderBottom: '1px solid #e9ebed', marginTop: '8px' }}></div>
                        
                        <Button>Add another rule</Button>
                      </SpaceBetween>
                    </div>
                  </SpaceBetween>
                </ExpandableSection>
              </SpaceBetween>
            </Container>
            </>
            )}
          </div>

          <ExpandableSection
            headerText={<>Tags - <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>optional</span></>}
            defaultExpanded={false}
            variant="container"
          >
            <SpaceBetween size="l">
              <Box>
                You can add tags to describe your collection. A tag consists of a case-sensitive key-value pair. For example, you can define a tag with a key-value pair of Environment Name=Development.
              </Box>
              <Box>No tags associated with this collection</Box>
              <Button disabled={isCreating}>Add new tag</Button>
              <Box variant="small" color="text-body-secondary">
                You can add up to 50 tags.
              </Box>
            </SpaceBetween>
          </ExpandableSection>
          </SpaceBetween>
          </div>

          {isCreating && (
            <Alert
              type="warning"
              header="Important: Creating OpenSearch Serverless resources."
            >
              <SpaceBetween size="xs">
                <Box>Navigating away from this page stops the collection setup. The Collection details page appears after setup completes.</Box>
                {creationSteps.map((step, index) => (
                  <Box key={index}>
                    <StatusIndicator type={step.status === 'success' ? 'success' : step.status === 'in-progress' ? 'in-progress' : 'pending'}>
                      {step.label}{step.status === 'in-progress' ? '...' : ''}
                    </StatusIndicator>
                  </Box>
                ))}
              </SpaceBetween>
            </Alert>
          )}

          {hasError && (
            <Alert
              type="error"
              header="Failed to create collection"
              action={<Button onClick={handleRetry}>Retry</Button>}
            >
              <SpaceBetween size="xs">
                <Box>An error occurred while creating the collection. Please try again.</Box>
                {creationSteps.map((step, index) => (
                  <Box key={index}>
                    <StatusIndicator type="error">
                      {step.label}
                    </StatusIndicator>
                  </Box>
                ))}
              </SpaceBetween>
            </Alert>
          )}

          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={onCancel} disabled={isCreating}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={isCreating || hasError || (creationMethod === 'easy-create' && !easyCreateSelectedGroup)} loading={isCreating}>
                {isCreating ? 'Creating collection' : 'Create collection'}
              </Button>
            </SpaceBetween>
          </Box>
          <Box padding={{ bottom: 'xxl' }} />
        </SpaceBetween>
      </ContentLayout>
      <CommentsPanel screenName="Create Collection Day1" />
    </AWSLayout>
  );
}

export default CreateCollectionDay1;
