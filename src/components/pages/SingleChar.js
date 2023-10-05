import SingleCharPage from "../singleChar/SingleCharPage";
import AppBanner from "../appBanner/AppBanner";
import { Fragment } from "react";
import {Helmet} from 'react-helmet'

const SingleChar = () => {
  return (
    <Fragment>
      <Helmet>
        <meta
        name="description"
        content="Page with character"
        />
        <title>Char page</title>
      </Helmet>
      <AppBanner />
      <SingleCharPage/>
    </Fragment>
  );
};

export default SingleChar