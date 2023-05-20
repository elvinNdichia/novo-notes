import React, { useState, useEffect, useRef } from "react";

const AutoHeightTextareaTitle = ({ title, setTitle }) => {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    textareaRef.current.style.height = "0";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      29
    )}px`;
  }, [title]);

  return (
    <textarea
      placeholder="Title"
      className="note-title"
      ref={textareaRef}
      value={title}
      onChange={handleChange}
      style={{
        width: "100%",
        overflow: "hidden",
        resize: "none",
        color: "#8D8888",
        border: "none",
        lineHeight: "normal", // override the CSS class line-height
      }}
    />
  );
};

const AutoHeightTextareaBody = ({ body, setBody }) => {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    if (textareaRef.current.scrollHeight > 18) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [body]);

  return (
    <textarea
      placeholder="Note body"
      className="note-body"
      ref={textareaRef}
      value={body}
      onChange={handleChange}
      style={{
        width: "100%",
        overflow: "auto",
        resize: "none",
        minHeight: "18px",
        border: "none",
      }}
    />
  );
};

/* In this component, the useEffect hook adjusts the textarea's height each time the textarea's value changes. 
The textarea's height is first reset to 'auto' to allow the textarea to shrink if the content has been deleted, 
and then set to the textarea's scrollHeight to accommodate the current content. */

export { AutoHeightTextareaTitle, AutoHeightTextareaBody };
