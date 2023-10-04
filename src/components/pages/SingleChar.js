import SingleCharPage from "../singleChar/SingleCharPage";
import AppBanner from "../appBanner/AppBanner";
import { Fragment } from "react";

const SingleChar = () => {
  return (
    <Fragment>
      <AppBanner />
      <SingleCharPage/>
    </Fragment>
  );
};

export default SingleChar