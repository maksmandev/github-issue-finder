import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Result } from 'antd';

import MainPage from '../pages/Main';
import DetailsPage from '../pages/Details';

import { routes } from './constants';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.root} element={<MainPage />} />
      <Route path={routes.issues}>
        <Route path={routes.details} element={<DetailsPage />} />
      </Route>
      <Route
        path={routes.notFound}
        element={
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
