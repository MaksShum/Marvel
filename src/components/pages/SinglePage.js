import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";
import { Fragment } from "react";
import {Helmet} from 'react-helmet'


const SinglePage = () => {
  return (
    <Fragment>
      <Helmet>
        <meta
        name="description"
        content="Page with ccomic"
        />
        <title>Comic page</title>
      </Helmet>
      <AppBanner />
      <SingleComic/>
    </Fragment>
  );
};

export default SinglePage