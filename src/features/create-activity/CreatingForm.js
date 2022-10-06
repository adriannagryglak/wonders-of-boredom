import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatingFormStyled } from "./CreateActivityStyled";
import {
  addActivity,
  setError,
  resetMessage,
  selectAddingActivityState,
} from "./addingActivityslice";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    outdoor: false,
    solo: false,
    tags: [],
  });

  const { error, message } = useSelector(selectAddingActivityState);

  function handleFieldChange(target) {
    setFormData((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  }

  function handleTagClick(choosenTag) {
    setFormData((prev) => {
      return {
        ...prev,
        tags: prev.tags.includes(choosenTag)
          ? prev.tags.filter((el) => choosenTag !== el)
          : prev.tags.concat(choosenTag),
      };
    });
  }

  const allTags = ["active", "autumn", "cozy"];

  function sendForm(e) {
    e.preventDefault();
    if (formData.name.length < 5) {
      dispatch(setError("name of idea suspiciously short"));
    } else if (formData.author.length < 3) {
      dispatch(setError("please sign your idea"));
    } else {
      dispatch(setError(null));
      dispatch(addActivity(formData));
    }
  }

  useEffect(() => {
    if (message) {
      setFormData({
        name: "",
        author: "",
        outdoor: false,
        solo: false,
        tags: [],
      });
    }
  }, [message]);

  return (
    <AnimatePresence>
      <CreatingFormStyled>
        {message ? (
          <motion.div
            key="formSend"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="creating-form--send-message">{message}!</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(resetMessage());
              }}
            >
              add another one
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                id="name"
                required
                onChange={(e) => {
                  handleFieldChange(e.target);
                }}
              />
              <label className="for-text-input" htmlFor="name">
                describe what you have in mind
              </label>
            </div>
            <div>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                id="author"
                onChange={(e) => {
                  handleFieldChange(e.target);
                }}
              />
              <label className="for-text-input" htmlFor="author">
                and the author is...
              </label>
            </div>
            <div className="category-choice">
              <label htmlFor="outdoor">is your activity outdoorsy?</label>
              <div className="creating-form--yes-no">
                <span
                  style={{ fontWeight: formData.outdoor ? "600" : "300" }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, outdoor: true }));
                  }}
                >
                  Y
                </span>
                /
                <span
                  style={{ fontWeight: formData.outdoor ? "300" : "600" }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, outdoor: false }));
                  }}
                >
                  N
                </span>
              </div>
            </div>
            <div className="category-choice">
              <label htmlFor="solo">or perfect for some alone time?</label>
              <div className="creating-form--yes-no">
                <span
                  style={{ fontWeight: formData.solo ? "600" : "300" }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, solo: true }));
                  }}
                >
                  Y
                </span>
                /
                <span
                  style={{ fontWeight: formData.solo ? "300" : "600" }}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, solo: false }));
                  }}
                >
                  N
                </span>
              </div>
            </div>
            <div className="tags-choice">
              <label>pick what matches your vibe</label>
              <ul>
                {allTags.map((tag, i) => {
                  return (
                    <li
                      style={{
                        fontWeight: formData.tags.includes(tag.toUpperCase())
                          ? "600"
                          : "300",
                      }}
                      key={i}
                      onClick={(e) => {
                        handleTagClick(e.target.innerText);
                      }}
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            {error && <p>{error}</p>}
            <button
              onClick={(e) => {
                sendForm(e);
              }}
            >
              add to collection of wonders
            </button>
          </motion.div>
        )}
      </CreatingFormStyled>
    </AnimatePresence>
  );
}
