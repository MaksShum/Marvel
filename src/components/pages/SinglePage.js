import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";
import { Fragment } from "react";

const SinglePage = () => {
  return (
    <Fragment>
      <AppBanner />
      <SingleComic />
    </Fragment>
  );
};

export default SinglePage