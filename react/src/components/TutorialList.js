import React, { useState, useRef, useEffect } from "react";
import TutorialDescription from "./TutorialDescription";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTutorials, getTutorials } from "../redux/ducks/tutorial";

function TutorialList(props) {
  const dispatch = useDispatch();

  const tutorials = useSelector((state) => state.tutorials);

  const [selectedTutorial, setSelectedTutorial] = useState();
  const ref = useRef(null);
  const filter = useRef(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const deleteAllTutorialsHandler = () => {
    dispatch(deleteAllTutorials());
    props.history.push("/");
  };

  useEffect(() => {
    dispatch(getTutorials());
  }, []);

  const search = () => {
    let result;
    if (searchKeyword !== "") {
      result = tutorials.filter((tutorial) => {
        return tutorial.title
          .toLowerCase()
          .includes(searchKeyword.trim().toLowerCase());
      });
      setSearchResult(result);
      filter.current = true;
    } else {
      filter.current = false;
      setSearchResult();
    }
  };

  return (
    <>
      <div className="row m-4 p-2">
        <div className="col-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            ></input>
            <button
              type="button"
              className="input-group-text bg-white"
              onClick={() => {
                setSelectedTutorial(null);
                search();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-100"></div>
        <div className="col-5">
          <h2 className="p-1">Tutorials List</h2>
          <ul className="list-group">
            {!filter.current
              ? tutorials?.map((tutorial, key) => (
                  <li
                    key={key}
                    className="list-group-item p-3"
                    onClick={(e) => {
                      ref.current?.classList.remove("active");
                      e.target.classList.add("active");
                      setSelectedTutorial(tutorial);
                      ref.current = e.target;
                    }}
                  >
                    {tutorial.title}
                  </li>
                ))
              : searchResult?.map((tutorial, key) => (
                  <li
                    key={key + searchKeyword}
                    className="list-group-item p-3"
                    onClick={(e) => {
                      ref.current?.classList.remove("active");
                      e.target.classList.add("active");
                      setSelectedTutorial(tutorial);
                      ref.current = e.target;
                    }}
                  >
                    {tutorial.title}
                  </li>
                ))}
          </ul>
          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={() => {
              setSelectedTutorial(null);
              deleteAllTutorialsHandler();
            }}
            disabled={tutorials?.length === 0}
          >
            Remove All
          </button>
        </div>
        <div className="col-6 p-1 offset-1">
          {selectedTutorial && (
            <TutorialDescription tutorial={selectedTutorial} />
          )}
        </div>
      </div>
    </>
  );
}

export default TutorialList;
