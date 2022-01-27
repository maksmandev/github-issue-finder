import { Col, Card, List, Avatar } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import api from '../api';
import { IssueState } from '../components/ListItem/ListItem';
import { Issue, Comment } from '../types';
import { parseQuery } from '../utils';

const DetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const path = searchParams.get('repo') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<Issue>();
  const [comments, setComments] = useState<Comment[]>();

  const repo = parseQuery(path);

  const fetchIssue = useCallback(async () => {
    const url = `${repo}/issues/${id}`;
    try {
      setIsLoading(true);
      const { data } = await api.get(url);
      setIssue(data);
      setIsLoading(false);
    } catch (e) {}
  }, [path]);

  const fetchComments = useCallback(async () => {
    const url = `${repo}/issues/${id}/comments`;
    try {
      setIsLoading(true);
      const { data } = await api.get(url);
      setComments(data);
      setIsLoading(false);
    } catch (e) {}
  }, [path]);

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, []);

  if (!issue) {
    return <Title>There are no issues for this repo {path}</Title>;
  }

  return (
    <>
      <Col span={24}>
        <Card title={issue?.title}>
          <IssueState state={issue?.state} />
          {`Created by ${issue?.user.login} at ${new Date(
            issue.created_at
          ).toLocaleString()}`}
        </Card>
      </Col>
      <Col span={24}>
        <Title level={3}>Comments:</Title>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatar_url} />}
                title={item.user.login}
                description={item.body}
              />
            </List.Item>
          )}
        />
      </Col>
    </>
  );
};

export default DetailsPage;
