import { useCallback, useEffect, useState } from 'react';
import { Button, Col, List, Input, BackTop } from 'antd';
const { Search } = Input;
import { useNavigate, useLocation } from 'react-router-dom';
import ListItem from '../components/ListItem/ListItem';
import { routes } from '../router/constants';
import api from '../api';
import { getRepoQuery, parseQuery } from '../utils';
import { Issue } from '../types';

const PAGE_SIZE = 8;

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const repo = getRepoQuery(location.search);

  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState(repo || '');

  const [issues, setIssues] = useState<Issue[]>([]);

  const [hasMore, setHasMore] = useState(false);

  const query = parseQuery(searchQuery);
  const url = `${query}/issues?state=all&page=${page}&per_page=${PAGE_SIZE}`;
  const [isLoading, setIsLoading] = useState(false);

  const fetchIssues = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(url);
      setHasMore(data.length === PAGE_SIZE);
      setIssues([...issues, ...data]);
    } catch (e) {
      setIssues([]);
    }
    setIsLoading(false);
  }, [repo, page]);

  useEffect(() => {
    if (repo) {
      fetchIssues();
    }
  }, [page, repo]);

  const loadMore = async () => {
    setPage(page + 1);
  };

  const handleSelect = (id: number) => {
    navigate({
      pathname: `${routes.issues}/${id}`,
      search: `?repo=${searchQuery}`,
    });
  };

  const handleSearch = async (value: string) => {
    setPage(1);
    setIssues([]);
    navigate({
      pathname: location.pathname,
      search: `repo=${value}`,
    });
    await fetchIssues();
  };

  const loadMoreRender = hasMore && (
    <div
      style={{
        textAlign: 'center',
        margin: 24,
        height: 32,
      }}
    >
      <Button onClick={loadMore} disabled={isLoading}>
        Load More
      </Button>
    </div>
  );

  return (
    <>
      <Search
        placeholder="input search text"
        value={searchQuery}
        enterButton={
          <Button type="primary" disabled={isLoading}>
            Search
          </Button>
        }
        size="large"
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      <Col lg={24}>
        <List
          loading={isLoading}
          itemLayout="horizontal"
          loadMore={loadMoreRender}
          dataSource={issues}
          renderItem={(item) => (
            <ListItem item={item} onSelect={handleSelect} />
          )}
        />
      </Col>
      <BackTop>
        <Button type="primary">UP</Button>
      </BackTop>
    </>
  );
};

export default MainPage;
