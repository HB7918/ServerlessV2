import { useState, useEffect } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Button,
  Textarea,
  Box,
  Spinner
} from '@cloudscape-design/components';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

const client = generateClient();

function CommentsPanel({ screenName }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storageKey = `comments-${screenName}`;

  // Load comments from AppSync
  useEffect(() => {
    fetchComments();
    
    // Subscribe to new comments
    const subscription = client.graphql({
      query: subscriptions.onCreateComment,
      variables: { screenname: screenName }
    }).subscribe({
      next: ({ data }) => {
        const newComment = data.onCreateComment;
        setComments(prev => [newComment, ...prev]);
      },
      error: (error) => console.error('Subscription error:', error)
    });

    return () => subscription.unsubscribe();
  }, [screenName]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log('Fetching comments for screen:', screenName);
      
      const result = await client.graphql({
        query: queries.listComments,
        variables: {
          filter: { screenname: { eq: screenName } }
        }
      });
      
      console.log('GraphQL result:', result);
      
      const items = result.data.listComments.items || [];
      // Sort by timestamp, newest first
      items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setComments(items);
      setError(null);
      console.log('✅ Comments loaded successfully:', items.length);
    } catch (err) {
      console.error('❌ Error fetching comments:', err);
      console.error('Error details:', JSON.stringify(err, null, 2));
      setError(`Failed to load comments: ${err.message || 'Unknown error'}`);
      // Fallback to localStorage
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const timestamp = new Date().toISOString();
      const comment = {
        screenname: screenName,
        text: newComment,
        author: 'User',
        timestamp: timestamp
      };

      try {
        console.log('Creating comment:', comment);
        const result = await client.graphql({
          query: mutations.createComment,
          variables: { input: comment }
        });
        console.log('✅ Comment created:', result);
        setNewComment('');
      } catch (error) {
        console.error('❌ Error adding comment:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        // Fallback to localStorage
        const commentWithId = { ...comment, id: Date.now().toString() };
        setComments([commentWithId, ...comments]);
        localStorage.setItem(storageKey, JSON.stringify([commentWithId, ...comments]));
        setNewComment('');
      }
    }
  };

  const handleDeleteComment = async (comment) => {
    try {
      await client.graphql({
        query: mutations.deleteComment,
        variables: { 
          input: { 
            screenname: comment.screenname,
            timestamp: comment.timestamp
          } 
        }
      });
      setComments(comments.filter(c => c.timestamp !== comment.timestamp));
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Fallback to localStorage
      const filtered = comments.filter(c => c.timestamp !== comment.timestamp);
      setComments(filtered);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      right: 20, 
      width: '400px', 
      zIndex: 1000,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.15)'
    }}>
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          iconName="contact"
          variant="primary"
          fullWidth
        >
          Comments {comments.length > 0 && `(${comments.length})`}
        </Button>
      ) : (
        <Container
          header={
            <Header
              variant="h3"
              actions={
                <Button
                  iconName="close"
                  variant="icon"
                  onClick={() => setIsExpanded(false)}
                />
              }
            >
              Comments on {screenName}
            </Header>
          }
        >
          <SpaceBetween size="m">
            <div>
              <Textarea
                value={newComment}
                onChange={({ detail }) => setNewComment(detail.value)}
                placeholder="Leave a comment or feedback..."
                rows={3}
              />
              <div style={{ marginTop: '8px', textAlign: 'right' }}>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  variant="primary"
                >
                  Add Comment
                </Button>
              </div>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {loading ? (
                <Box textAlign="center" padding="l">
                  <Spinner />
                </Box>
              ) : error ? (
                <div>
                  <Box textAlign="center" color="text-status-error" padding="l">
                    {error}
                  </Box>
                  <Box textAlign="center" fontSize="body-s" color="text-body-secondary" padding="s">
                    Check browser console for details
                  </Box>
                </div>
              ) : comments.length === 0 ? (
                <Box textAlign="center" color="text-body-secondary" padding="l">
                  No comments yet. Be the first to leave feedback!
                </Box>
              ) : (
                <SpaceBetween size="s">
                  {comments.map(comment => (
                    <div
                      key={comment.timestamp}
                      style={{
                        padding: '12px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Box fontWeight="bold">{comment.author}</Box>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Box fontSize="body-s" color="text-body-secondary">
                            {formatTimestamp(comment.timestamp)}
                          </Box>
                          <Button
                            iconName="close"
                            variant="icon"
                            onClick={() => handleDeleteComment(comment)}
                          />
                        </div>
                      </div>
                      <Box>{comment.text}</Box>
                    </div>
                  ))}
                </SpaceBetween>
              )}
            </div>
          </SpaceBetween>
        </Container>
      )}
    </div>
  );
}

export default CommentsPanel;
