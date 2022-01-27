import Router from './router';
import { Col, ConfigProvider, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

ConfigProvider.config({
  theme: {
    primaryColor: '#3c9ae8',
  },
});

const App = () => {
  return (
    <ConfigProvider>
      <Row justify="center" align="middle">
        <Col xs={20} md={12}>
          <Row
            justify="center"
            style={{
              padding: '20px',
            }}
          >
            <Title style={{ textTransform: 'uppercase' }}>
              GitHub Issue Finder
            </Title>
            <Router />
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default App;
