import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setlocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDatatEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDatatEl.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commnetObj = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commnetObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Add a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 
          focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={commentEl}
          placeholder="Add your comment"
          name="comment"
          id=""
          cols="30"
          rows="10"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 
          focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
        />

        <input
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 
          focus:ring-gray-200 bg-gray-100 text-gray-700"
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDatatEl}
            id="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save comment data for future comments
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-green-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          type="button"
          onClick={handleCommentSubmission}
        >
          Submit
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Thanks for your commment
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
