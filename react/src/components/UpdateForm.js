import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../redux/ducks/tutorial";

function UpdateForm(props) {
  const dispatch = useDispatch();
  const tutorial = props.location.state.tutorial;
  const id = tutorial.id;
  const [title, setTitle] = useState(tutorial.title);
  const [description, setDescription] = useState(tutorial.description);
  const [published, setPublished] = useState(tutorial.published);

  useEffect(() => {
    changePublished();
  }, [published]);

  const deleteTutorialHandler = () => {
    dispatch(deleteTutorial(id));
    props.history.push("/");
  };

  const updateTutorialHandler = () => {
    const updatedTutorial = {
      title: title.trim(),
      description: description.trim(),
      published,
    };

    dispatch(updateTutorial(id, updatedTutorial));

    setTitle("");
    setDescription("");
    props.history.push("/");
  };

  const changePublished = () => {
    const updatedTutorial = {
      published,
    };
    dispatch(updateTutorial(id, updatedTutorial));
  };

  return (
    <>
      <div className="row">
        <div className="col-4 offset-4">
          <h2 className="p-4">Tutorials</h2>
          <div className="p-4">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                placeholder="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </div>
            <span className="fw-bold">Status: </span>
            <span>{published ? "Published" : "Pending"}</span>
            <br></br>
            <br></br>
            {published ? (
              <button
                type="button"
                className="btn btn-primary btn-sm m-2"
                onClick={() => {
                  setPublished(false);
                }}
              >
                UnPublish
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm m-2 "
                onClick={() => {
                  setPublished(true);
                }}
              >
                Publish
              </button>
            )}

            <button
              type="button"
              className="btn btn-danger btn-sm  m-2"
              onClick={deleteTutorialHandler}
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm  m-2"
              disabled={
                title.trim().length === 0 || description.trim().length === 0
              }
              onClick={updateTutorialHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
