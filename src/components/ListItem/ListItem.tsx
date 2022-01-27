import { CommentOutlined } from '@ant-design/icons';
import { List, Space, Tag, Button } from 'antd';
import { Issue, State } from '../../types';

interface iProps {
  item: Issue;
  onSelect: (id: number) => void;
}

export const IssueState = ({ state }: { state: State }) => {
  const color = state === 'open' ? 'warning' : 'success';
  return <Tag color={color}>{state}</Tag>;
};

const ListItem = ({ item, onSelect }: iProps) => {
  const { number, title, user, created_at, comments, state } = item;
  const date = new Date(created_at).toLocaleString();
  const description = `Created by ${user.login} at ${date}`;

  return (
    <List.Item style={{ textAlign: 'left' }}>
      <List.Item.Meta
        title={
          <Button type="text" onClick={() => onSelect(number)}>
            {title}
          </Button>
        }
        description={description}
      />
      <Space>
        <IssueState state={state} />
        <Space>
          {comments}
          <CommentOutlined />
        </Space>
      </Space>
    </List.Item>
  );
};

export default ListItem;
