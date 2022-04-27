/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  //   state = {
  //     comments: [], // comments will go here
  //     isLoading: false,
  //     isError: false,
  //   };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //   useEffect = async (prevProps) => {
  //     // if (prevProps.asin !== props.asin) {
  //     //   //   this.setState({
  //     //   //     isLoading: true,
  //     //   //   });

  //     //   setIsLoading(true);

  useEffect(() => {
    commentArea();
    setIsLoading(true);
  }, [props.asin]);

  const commentArea = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3OWY5NTgxNmI1YjAwMTU5NDA3NDAiLCJpYXQiOjE2MjI2NDY2NzcsImV4cCI6MTYyMzg1NjI3N30.y-rBwB5WAQOWBvWrLlAgTQUrbGulxd2M6cWH3VLyGLw",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        //   this.setState({
        //     comments: comments,
        //     isLoading: false,
        //     isError: false,
        //   });
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      } else {
        console.log("error");
        //   this.setState({ isLoading: false, isError: true });
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      // this.setState({ isLoading: false, isError: true });
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
