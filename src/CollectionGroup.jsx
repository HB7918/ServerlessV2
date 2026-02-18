import { useState } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Box,
  Button,
  Table,
  TextFilter,
  Pagination,
  Link,
  ExpandableSection
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';
import CommentsPanel from './components/CommentsPanel';

function CollectionGroup({ onCreateClick, onNavigate, onViewGroup }) {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [filteringText, setFilteringText] = useState('');

  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'Collection group', href: '#/collection-groups' }
  ];

  const collectionGroups = [
    {
      name: 'test',
      serverlessVersion: 'Serverless V2',
      indexingCapacity: '- / 96 OCUs',
      searchCapacity: '- / 96 OCUs',
      collections: 0
    }
  ];

  const filteredGroups = collectionGroups.filter(group => {
    if (!filteringText) return true;
    return group.name.toLowerCase().includes(filteringText.toLowerCase());
  });

  return (
    <AWSLayout
      breadcrumbs={breadcrumbs}
      activeHref="#/collection-groups"
      onNavigate={onNavigate}
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
                      Use collection groups to share the same capacity pool (OCUs) across collections. Grouping collections with the same or different KMS keys to set scaling limits and monitor OCU usage at the group level.
                    </Box>
                    <Box variant="p" fontWeight="bold">
                      When you create a new collection group, you can:
                    </Box>
                    <ul style={{ marginLeft: '20px' }}>
                      <li>Add one or more collections (each collection can only belong to one group).</li>
                      <li>Set optional min/max OCUs for predictable performance and budgeting.</li>
                      <li>Organize collection by team, workload type or environment.</li>
                    </ul>
                  </SpaceBetween>
                </div>
              </div>
            </SpaceBetween>
          </ExpandableSection>
        </Container>

        <Table
          columnDefinitions={[
            {
              id: 'name',
              header: 'Collection group',
              cell: item => (
                <Link onFollow={(e) => {
                  e.preventDefault();
                  if (onViewGroup) onViewGroup(item.name);
                }}>
                  {item.name}
                </Link>
              ),
              sortingField: 'name',
              minWidth: 200
            },
            {
              id: 'serverlessVersion',
              header: 'Serverless version',
              cell: item => item.serverlessVersion,
              sortingField: 'serverlessVersion',
              minWidth: 180
            },
            {
              id: 'indexingCapacity',
              header: 'Indexing capacity range (Min/Max)',
              cell: item => item.indexingCapacity,
              sortingField: 'indexingCapacity',
              minWidth: 250
            },
            {
              id: 'searchCapacity',
              header: 'Search capacity range (Min/Max)',
              cell: item => item.searchCapacity,
              sortingField: 'searchCapacity',
              minWidth: 250
            },
            {
              id: 'collections',
              header: 'Collections',
              cell: item => item.collections,
              sortingField: 'collections',
              minWidth: 120
            }
          ]}
          items={filteredGroups}
          selectedItems={selectedGroups}
          onSelectionChange={({ detail }) => setSelectedGroups(detail.selectedItems)}
          selectionType="single"
          trackBy="name"
          loadingText="Loading collection groups"
          empty={
            <Box textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <Box variant="p">No collection groups</Box>
                <Button variant="primary" onClick={onCreateClick}>
                  Create
                </Button>
              </SpaceBetween>
            </Box>
          }
          filter={
            <TextFilter
              filteringPlaceholder="Find collection group"
              filteringText={filteringText}
              onChange={({ detail }) => setFilteringText(detail.filteringText)}
            />
          }
          header={
            <Header
              counter={`(${filteredGroups.length})`}
              description={
                <>
                  View and manage your collection groups. Create new groups or modify existing ones to organize your collections and control OCU usage. <Link external>Learn more</Link>
                </>
              }
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button iconName="refresh" />
                  <Button disabled={selectedGroups.length === 0}>Delete</Button>
                  <Button variant="primary" onClick={onCreateClick}>
                    Create
                  </Button>
                </SpaceBetween>
              }
            >
              Collection groups
            </Header>
          }
          pagination={
            <Pagination
              currentPageIndex={1}
              pagesCount={1}
            />
          }
          preferences={
            <Button iconName="settings" variant="icon" />
          }
          variant="full-page"
        />
      </SpaceBetween>
      <CommentsPanel screenName="Collection Groups" />
    </AWSLayout>
  );
}

export default CollectionGroup;
