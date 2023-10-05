import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Fragment } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {Helmet} from 'react-helmet'

const ComicsPage = () => {
  return (
    <Fragment>
      <Helmet>
        <meta
        name="description"
        content="Page with list comics"
        />
        <title>Comics page</title>
      </Helmet>
      <ErrorBoundary>
        <AppBanner />
        <ComicsList/>
      </ErrorBoundary>
    </Fragment>
  );
};

export default ComicsPage;
