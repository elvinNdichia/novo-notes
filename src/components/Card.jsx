import React, { useEffect, useRef } from "react";
import { BrainContext } from "../helpers/BrainContext";
import { Box, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

export function Card({ id, title, body, time }) {
  const navigate = useNavigate();
  const { id: currentNoteId } = useParams();

  return (
    <motion.div
      style={{
        padding: "17px 16px 13px 12px",
        background:
          id === currentNoteId
            ? "linear-gradient(180deg, rgba(5, 189, 214, 0.86) 0%, #4C66C0 100%)"
            : "#E8EBF6",
        borderRadius: "8px",
        color:
          id === currentNoteId
            ? "rgba(255, 255, 255, .98)"
            : "rgba(0, 0, 0, 0.98)",
        cursor: "pointer",
      }}
      layout
      transition={{ duration: 0.3 }}
      onClick={() => {
        navigate("/note/" + id);
      }}
    >
      <h2 className="card-title">{title}</h2>
      <div style={{ height: "54px", overflow: "hidden" }}>
        <p className="card-body">{getLimitedString(body)}</p>
      </div>
      <p>...</p>
      <p
        className="card-time"
        style={{
          color:
            id === currentNoteId
              ? "rgba(255, 255, 255, .6)"
              : "rgba(0, 0, 0, .6)",
          marginTop: "20px",
        }}
      >
        {formatDate(time)}
      </p>
    </motion.div>
  );
}

export function Cards() {
  const { notes, getNotes, createNotesIfNew, loading, search } =
    React.useContext(BrainContext);

  const hasCreatedNotes = useRef(false);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (!hasCreatedNotes.current) {
      createNotesIfNew();
      hasCreatedNotes.current = true;
    }
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "8px",
        }}
      >
        <CircularProgress style={{ color: "#FBC103" }} />
      </Box>
    );
  }

  const searchedNotes = searchObjectsByQuery(notes, search);

  if (searchedNotes.length === 0) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div>
          <div>{nothingFoundSVG}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              className="card-body"
              style={{
                color: "#6B6B6B",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Nothing found
            </p>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gridGap: "1rem",
        gap: "1frem",
      }}
    >
      <AnimatePresence>
        {sortObjectsByTimeDescending(searchedNotes).map((note) => {
          return (
            <Card
              id={note.id}
              key={note.id}
              title={note.title}
              time={note.time}
              body={note.body}
            />
          );
        })}
      </AnimatePresence>
    </Box>
  );
}

// Helper functions for this
function getLimitedString(str) {
  if (str.length <= 120) {
    return str;
  } else {
    return str.substring(0, 120) + "...";
  }
}

function formatDate(timestamp) {
  if (!timestamp) {
    return null;
  }

  const date = timestamp.toDate();
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function searchObjectsByQuery(objects, queryString) {
  const results = objects.filter((obj) => {
    for (const key in obj) {
      if (
        (key === "title" || key === "body") &&
        obj[key].toLowerCase().includes(queryString.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  return results;
}

function sortObjectsByTimeDescending(array) {
  return array.sort((a, b) => {
    if (a.time && b.time) {
      return b.time.toMillis() - a.time.toMillis();
    } else {
      // handle the case where a.time or b.time is null
      if (!a.time && !b.time) {
        return 0; // both timestamps are null, consider them equal
      } else if (!a.time) {
        return 1; // a.time is null, so consider a to be greater
      } else {
        return -1; // b.time is null, so consider b to be greater
      }
    }
  });
}

export function CardUnselected() {
  return (
    <Box
      sx={{
        padding: "17px 16px 13px 12px",
        background: "rgba(76, 102, 192, .12)",
        //background:
        // "linear-gradient(180deg, rgba(5, 189, 214, 0.08) 0%, rgba(76, 102, 192, .24) 100%)",
        borderRadius: "8px",
        color: "rgba(0, 0, 0, .98)",
        cursor: "pointer",

        "&:active": {
          background: "rgba(76, 102, 192, .16)",
        },
      }}
    >
      <h2 className="card-title">English</h2>
      <div>
        <p className="card-body">
          The quick brown fox jumps over the lazy dog. The quick brown fox
          jumps...
        </p>
      </div>
      <p className="card-time" style={{ color: "rgba(0, 0, 0, .6)" }}>
        16:30
      </p>
    </Box>
  );
}
// The svg
const nothingFoundSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="185"
    height="157"
    viewBox="0 0 185 157"
    fill="none"
  >
    <g clipPath="url(#clip0_350_280)">
      <path
        d="M165.867 146.221L162.756 149.086L165.229 144.937C163.281 141.404 160.095 138.351 160.095 138.351C160.095 138.351 153.485 144.684 153.485 149.662C153.485 154.64 156.444 156.378 160.095 156.378C163.745 156.378 166.705 154.64 166.705 149.662C166.663 148.47 166.379 147.299 165.867 146.221Z"
        fill="#F0F0F0"
      />
      <path
        d="M161.956 149.241V149.486C161.941 152.338 161.46 154.564 160.517 156.131C160.503 156.154 160.489 156.176 160.475 156.199L160.37 156.134L160.269 156.071C161.316 154.379 161.686 151.987 161.7 149.5C161.701 149.419 161.702 149.338 161.701 149.257C161.697 148.203 161.633 147.138 161.53 146.103C161.522 146.023 161.514 145.942 161.505 145.86C161.362 144.495 161.155 143.19 160.944 142.057C160.93 141.977 160.914 141.897 160.898 141.818C160.532 139.901 160.159 138.512 160.074 138.205C160.065 138.168 160.059 138.147 160.057 138.142L160.173 138.109L160.174 138.108L160.291 138.075C160.292 138.08 160.312 138.149 160.346 138.278C160.476 138.759 160.814 140.065 161.146 141.787C161.16 141.865 161.176 141.945 161.191 142.025C161.363 142.945 161.532 143.973 161.666 145.051C161.7 145.322 161.73 145.589 161.757 145.853C161.766 145.934 161.775 146.016 161.782 146.096C161.894 147.215 161.952 148.263 161.956 149.241Z"
        fill="white"
      />
      <path
        d="M161.146 141.788C161.065 141.799 160.982 141.81 160.898 141.818C160.671 141.842 160.442 141.853 160.213 141.853C159.238 141.855 158.275 141.637 157.395 141.217C157.344 141.281 157.293 141.346 157.241 141.411C158.166 141.863 159.183 142.097 160.213 142.096C160.457 142.096 160.701 142.083 160.944 142.057C161.027 142.049 161.11 142.038 161.191 142.026C161.863 141.929 162.516 141.732 163.128 141.439C163.076 141.372 163.025 141.307 162.975 141.242C162.396 141.513 161.779 141.697 161.146 141.788Z"
        fill="white"
      />
      <path
        d="M161.757 145.853C161.673 145.858 161.589 145.86 161.505 145.86C161.48 145.861 161.453 145.861 161.428 145.861C160.371 145.861 159.33 145.606 158.393 145.117C157.457 144.627 156.652 143.919 156.049 143.052C156 143.123 155.952 143.195 155.904 143.268C156.533 144.145 157.363 144.86 158.323 145.354C159.284 145.847 160.348 146.104 161.428 146.104C161.462 146.104 161.496 146.104 161.53 146.103C161.615 146.102 161.698 146.099 161.782 146.096C163.079 146.029 164.33 145.591 165.384 144.833C165.345 144.761 165.306 144.689 165.266 144.618C164.241 145.362 163.022 145.791 161.757 145.853Z"
        fill="white"
      />
      <path
        d="M161.956 149.241C161.871 149.248 161.786 149.253 161.701 149.257C161.61 149.26 161.519 149.263 161.428 149.263C160.008 149.261 158.627 148.8 157.491 147.947C156.356 147.095 155.527 145.898 155.128 144.535C155.074 144.634 155.019 144.731 154.967 144.829C155.416 146.189 156.281 147.372 157.441 148.212C158.601 149.052 159.996 149.504 161.428 149.506C161.519 149.506 161.61 149.505 161.7 149.5C161.786 149.497 161.871 149.492 161.956 149.486C163.674 149.352 165.276 148.57 166.439 147.299C166.413 147.209 166.384 147.12 166.355 147.03C165.232 148.311 163.654 149.104 161.956 149.241Z"
        fill="white"
      />
      <path
        d="M139.851 38.6175L139.982 36.134L140.648 38.8949C142.919 39.5793 145.514 39.553 145.514 39.553C145.514 39.553 145.689 34.173 143.643 32.08C141.596 29.9871 139.637 30.473 138.102 31.9739C136.568 33.4747 136.038 35.4222 138.085 37.5151C138.592 37.9993 139.193 38.3745 139.851 38.6175Z"
        fill="#F0F0F0"
      />
      <path
        d="M140.254 35.74L140.153 35.6368C138.987 34.4317 138.274 33.2983 138.027 32.2514C138.023 32.2362 138.02 32.221 138.016 32.2058L138.087 32.1895L138.155 32.1746C138.411 33.3165 139.238 34.4744 140.256 35.5258C140.288 35.56 140.321 35.5947 140.355 35.6285C140.789 36.0697 141.254 36.4912 141.723 36.8838C141.759 36.9146 141.796 36.9453 141.834 36.976C142.455 37.4911 143.078 37.9547 143.633 38.3443C143.672 38.372 143.712 38.3992 143.751 38.4259C144.693 39.0815 145.42 39.5119 145.582 39.6062C145.602 39.618 145.613 39.6242 145.616 39.6258L145.581 39.687V39.688L145.545 39.7497C145.542 39.7482 145.505 39.7276 145.438 39.6874C145.186 39.5386 144.507 39.1284 143.659 38.5406C143.621 38.5139 143.582 38.4867 143.542 38.459C143.092 38.1433 142.598 37.7806 142.099 37.3821C141.973 37.2821 141.85 37.1823 141.731 37.0824C141.693 37.0522 141.656 37.0215 141.62 36.9908C141.113 36.5664 140.658 36.1494 140.254 35.74Z"
        fill="white"
      />
      <path
        d="M143.659 38.5405C143.689 38.5025 143.719 38.4639 143.751 38.4259C143.837 38.3225 143.928 38.2235 144.024 38.1294C144.434 37.7279 144.928 37.4235 145.471 37.2384C145.466 37.1904 145.461 37.1423 145.456 37.0933C144.881 37.2839 144.357 37.6033 143.925 38.0273C143.822 38.1277 143.725 38.2335 143.633 38.3443C143.602 38.3818 143.572 38.4204 143.542 38.4589C143.3 38.7756 143.106 39.1274 142.969 39.5022C143.018 39.5088 143.067 39.5154 143.114 39.522C143.247 39.1698 143.43 38.8391 143.659 38.5405Z"
        fill="white"
      />
      <path
        d="M141.731 37.0825C141.764 37.046 141.798 37.0105 141.833 36.976C141.844 36.965 141.855 36.9541 141.866 36.9436C142.31 36.5091 142.853 36.1886 143.448 36.0092C144.042 35.8299 144.672 35.797 145.282 35.9135C145.273 35.8634 145.264 35.8133 145.254 35.7631C144.629 35.6529 143.986 35.6931 143.38 35.8807C142.773 36.0682 142.22 36.3975 141.766 36.8414C141.751 36.8554 141.737 36.8694 141.723 36.8839C141.688 36.9194 141.654 36.9549 141.62 36.9908C141.102 37.552 140.757 38.2505 140.625 39.0027C140.671 39.0169 140.717 39.031 140.763 39.0447C140.888 38.3104 141.224 37.6285 141.731 37.0825Z"
        fill="white"
      />
      <path
        d="M140.254 35.74C140.287 35.702 140.32 35.665 140.355 35.6285C140.392 35.5895 140.429 35.551 140.467 35.5135C141.065 34.9305 141.835 34.5567 142.663 34.4481C143.491 34.3395 144.332 34.502 145.059 34.9113C145.042 34.8474 145.025 34.7841 145.006 34.7213C144.259 34.3341 143.408 34.1924 142.575 34.3163C141.742 34.4402 140.97 34.8234 140.367 35.4114C140.329 35.4489 140.291 35.4868 140.255 35.5258C140.22 35.5623 140.186 35.5993 140.153 35.6368C139.486 36.3994 139.134 37.387 139.168 38.3994C139.216 38.4267 139.264 38.452 139.314 38.4778C139.259 37.4777 139.596 36.4956 140.254 35.74Z"
        fill="white"
      />
      <path
        d="M45.4968 57.0725L45.6273 54.5891L46.2934 57.35C48.5648 58.0344 51.1596 58.0081 51.1596 58.0081C51.1596 58.0081 51.335 52.628 49.2884 50.5351C47.2418 48.4422 45.2829 48.9281 43.7481 50.4289C42.2133 51.9298 41.6837 53.8772 43.7303 55.9702C44.2377 56.4544 44.8388 56.8296 45.4968 57.0725Z"
        fill="#F0F0F0"
      />
      <path
        d="M45.8997 54.1951L45.7988 54.0919C44.6323 52.8867 43.9196 51.7534 43.6722 50.7065C43.6684 50.6913 43.6655 50.6761 43.6616 50.6609L43.7325 50.6445L43.8009 50.6296C44.0563 51.7716 44.8839 52.9295 45.9011 53.9809C45.9335 54.0151 45.9665 54.0498 46.0004 54.0835C46.435 54.5248 46.9 54.9462 47.3689 55.3389C47.4049 55.3696 47.442 55.4004 47.479 55.4311C48.1006 55.9462 48.7238 56.4098 49.2786 56.7994C49.3177 56.8271 49.3573 56.8543 49.3964 56.881C50.3382 57.5366 51.0658 57.967 51.2279 58.0613C51.2475 58.0731 51.2585 58.0793 51.261 58.0808L51.226 58.1421V58.1431L51.1905 58.2048C51.1879 58.2033 51.1508 58.1827 51.0836 58.1425C50.8312 57.9937 50.1523 57.5835 49.3047 56.9957C49.2666 56.969 49.227 56.9418 49.1879 56.914C48.7374 56.5984 48.2439 56.2357 47.7442 55.8371C47.6186 55.7372 47.4959 55.6373 47.3763 55.5375C47.3388 55.5073 47.3017 55.4766 47.2657 55.4459C46.7587 55.0214 46.3034 54.6045 45.8997 54.1951Z"
        fill="white"
      />
      <path
        d="M49.3049 56.9956C49.3346 56.9576 49.3648 56.919 49.3966 56.881C49.4827 56.7775 49.574 56.6786 49.6702 56.5845C50.0796 56.183 50.5739 55.8785 51.1167 55.6935C51.1117 55.6454 51.1067 55.5974 51.1017 55.5483C50.5267 55.7389 50.0029 56.0584 49.5703 56.4824C49.4676 56.5828 49.3703 56.6886 49.2788 56.7993C49.2476 56.8369 49.2173 56.8754 49.1881 56.914C48.9453 57.2307 48.752 57.5825 48.6147 57.9572C48.6642 57.9639 48.7126 57.9705 48.76 57.977C48.8923 57.6249 49.0759 57.2941 49.3049 56.9956Z"
        fill="white"
      />
      <path
        d="M47.3765 55.5376C47.4097 55.5011 47.444 55.4656 47.4792 55.4311C47.4894 55.4201 47.5007 55.4091 47.5114 55.3986C47.9556 54.9642 48.4983 54.6437 49.0932 54.4643C49.6882 54.2849 50.3176 54.2521 50.928 54.3686C50.9189 54.3185 50.9099 54.2683 50.8998 54.2182C50.2745 54.1079 49.632 54.1482 49.0253 54.3357C48.4187 54.5233 47.8655 54.8526 47.4115 55.2965C47.3972 55.3105 47.3829 55.3245 47.3691 55.339C47.3339 55.3744 47.2996 55.4099 47.2659 55.4459C46.7479 56.0071 46.4025 56.7055 46.271 57.4578C46.3168 57.472 46.3626 57.4861 46.4089 57.4998C46.5336 56.7655 46.8699 56.0836 47.3765 55.5376Z"
        fill="white"
      />
      <path
        d="M45.8997 54.1951C45.9325 54.157 45.9662 54.12 46.0005 54.0835C46.0373 54.0446 46.0746 54.0061 46.1129 53.9686C46.7105 53.3856 47.4809 53.0118 48.3088 52.9032C49.1366 52.7946 49.9774 52.9571 50.7052 53.3664C50.6877 53.3025 50.6707 53.2392 50.6522 53.1764C49.9045 52.7892 49.0539 52.6475 48.221 52.7714C47.3882 52.8953 46.6156 53.2785 46.013 53.8665C45.9747 53.9039 45.9369 53.9419 45.9011 53.9809C45.8659 54.0174 45.8321 54.0544 45.7988 54.0919C45.132 54.8545 44.7799 55.842 44.8138 56.8545C44.8614 56.8818 44.9102 56.9071 44.9594 56.9329C44.9049 55.9327 45.2422 54.9507 45.8997 54.1951Z"
        fill="white"
      />
      <path
        d="M61.2509 25.564L61.3814 23.0806L62.0476 25.8415C64.319 26.5258 66.9137 26.4996 66.9137 26.4996C66.9137 26.4996 67.0891 21.1195 65.0425 19.0266C62.9959 16.9336 61.0371 17.4195 59.5023 18.9204C57.9675 20.4212 57.4379 22.3687 59.4845 24.4616C59.9918 24.9459 60.593 25.321 61.2509 25.564Z"
        fill="#F0F0F0"
      />
      <path
        d="M61.6541 22.6865L61.5532 22.5833C60.3867 21.3782 59.674 20.2448 59.4266 19.198C59.4227 19.1828 59.4199 19.1676 59.416 19.1524L59.4869 19.136L59.5553 19.1211C59.8107 20.263 60.6383 21.4209 61.6555 22.4723C61.6879 22.5066 61.7209 22.5413 61.7548 22.575C62.1894 23.0163 62.6544 23.4377 63.1233 23.8304C63.1593 23.8611 63.1964 23.8918 63.2334 23.9225C63.855 24.4376 64.4782 24.9012 65.033 25.2908C65.0721 25.3186 65.1117 25.3458 65.1508 25.3725C66.0926 26.0281 66.8202 26.4585 66.9823 26.5527C67.0019 26.5646 67.0129 26.5708 67.0154 26.5723L66.9804 26.6335V26.6345L66.9449 26.6963C66.9423 26.6947 66.9052 26.6741 66.838 26.634C66.5855 26.4852 65.9067 26.075 65.0591 25.4871C65.021 25.4604 64.9814 25.4332 64.9423 25.4055C64.4918 25.0898 63.9983 24.7272 63.4986 24.3286C63.3729 24.2287 63.2503 24.1288 63.1307 24.029C63.0932 23.9987 63.0561 23.968 63.0201 23.9373C62.5131 23.5129 62.0578 23.096 61.6541 22.6865Z"
        fill="white"
      />
      <path
        d="M65.059 25.4871C65.0888 25.449 65.119 25.4105 65.1507 25.3724C65.2368 25.269 65.3281 25.17 65.4243 25.0759C65.8338 24.6745 66.3281 24.37 66.8708 24.1849C66.8658 24.1369 66.8608 24.0888 66.8558 24.0398C66.2809 24.2304 65.7571 24.5499 65.3244 24.9738C65.2218 25.0743 65.1245 25.1801 65.033 25.2908C65.0017 25.3283 64.9715 25.3669 64.9423 25.4054C64.6994 25.7222 64.5061 26.0739 64.3689 26.4487C64.4183 26.4553 64.4667 26.4619 64.5141 26.4685C64.6465 26.1163 64.8301 25.7856 65.059 25.4871Z"
        fill="white"
      />
      <path
        d="M63.1306 24.0288C63.1639 23.9923 63.1981 23.9568 63.2334 23.9223C63.2436 23.9113 63.2548 23.9004 63.2655 23.8899C63.7098 23.4554 64.2525 23.1349 64.8474 22.9555C65.4423 22.7761 66.0718 22.7433 66.6821 22.8598C66.6731 22.8097 66.664 22.7596 66.654 22.7094C66.0287 22.5991 65.3861 22.6394 64.7795 22.827C64.1729 23.0145 63.6196 23.3438 63.1657 23.7877C63.1513 23.8017 63.1371 23.8157 63.1233 23.8302C63.088 23.8657 63.0538 23.9011 63.02 23.9371C62.502 24.4983 62.1567 25.1968 62.0251 25.949C62.071 25.9632 62.1168 25.9773 62.1631 25.991C62.2878 25.2567 62.6241 24.5748 63.1306 24.0288Z"
        fill="white"
      />
      <path
        d="M61.6541 22.6865C61.6869 22.6485 61.7206 22.6115 61.7549 22.575C61.7917 22.536 61.829 22.4975 61.8673 22.4601C62.4649 21.877 63.2353 21.5032 64.0632 21.3946C64.891 21.2861 65.7318 21.4486 66.4596 21.8578C66.4421 21.794 66.4251 21.7307 66.4066 21.6678C65.6589 21.2807 64.8083 21.139 63.9754 21.2628C63.1426 21.3867 62.37 21.7699 61.7674 22.3579C61.7291 22.3954 61.6913 22.4334 61.6555 22.4724C61.6202 22.5088 61.5865 22.5458 61.5532 22.5833C60.8864 23.346 60.5343 24.3335 60.5682 25.346C60.6158 25.3733 60.6646 25.3986 60.7138 25.4244C60.6593 24.4242 60.9966 23.4421 61.6541 22.6865Z"
        fill="white"
      />
      <path
        d="M25.3584 138.558L19.9686 143.52L24.252 136.333C20.8773 130.213 15.358 124.924 15.358 124.924C15.358 124.924 3.90747 135.895 3.90747 144.518C3.90747 153.142 9.03404 156.153 15.358 156.153C21.682 156.153 26.8085 153.142 26.8085 144.518C26.8085 142.599 26.2404 140.563 25.3584 138.558Z"
        fill="#F0F0F0"
      />
      <path
        d="M18.5825 143.789V144.214C18.5572 149.155 17.7239 153.01 16.0889 155.724C16.0657 155.764 16.0405 155.802 16.0173 155.842L15.8343 155.731L15.6596 155.621C17.4735 152.69 18.1153 148.546 18.1385 144.237C18.1406 144.098 18.1427 143.957 18.1406 143.816C18.1343 141.991 18.0227 140.146 17.8439 138.353C17.8313 138.214 17.8165 138.073 17.8018 137.932C17.5535 135.567 17.1958 133.307 16.8296 131.344C16.8044 131.205 16.777 131.066 16.7496 130.929C16.1163 127.609 15.4702 125.203 15.3229 124.671C15.3061 124.606 15.2956 124.57 15.2935 124.562L15.4934 124.505L15.4955 124.503L15.6975 124.446C15.6996 124.454 15.7354 124.574 15.7943 124.797C16.0194 125.631 16.6044 127.893 17.1789 130.877C17.2042 131.011 17.2315 131.15 17.2568 131.289C17.5556 132.882 17.8481 134.662 18.0796 136.531C18.1385 137 18.1911 137.463 18.2374 137.92C18.2542 138.061 18.269 138.202 18.2816 138.341C18.4752 140.279 18.5755 142.095 18.5825 143.789Z"
        fill="white"
      />
      <path
        d="M17.1789 130.877C17.0379 130.896 16.8948 130.915 16.7496 130.929C16.3553 130.97 15.9592 130.99 15.5628 130.99C13.8735 130.993 12.2052 130.616 10.6808 129.888C10.5924 129.999 10.5041 130.111 10.4136 130.224C12.0171 131.007 13.7784 131.413 15.5628 131.411C15.986 131.411 16.4088 131.389 16.8296 131.344C16.9727 131.329 17.1158 131.31 17.2568 131.289C18.4205 131.122 19.5522 130.78 20.6131 130.273C20.5226 130.157 20.4343 130.043 20.348 129.932C19.3439 130.401 18.276 130.72 17.1789 130.877Z"
        fill="white"
      />
      <path
        d="M18.2374 137.92C18.0922 137.928 17.947 137.933 17.8018 137.933C17.7576 137.935 17.7113 137.935 17.6671 137.935C15.8367 137.935 14.0333 137.492 12.4109 136.645C10.7884 135.797 9.39495 134.57 8.34928 133.067C8.26511 133.192 8.18093 133.316 8.09888 133.442C9.18878 134.962 10.6252 136.201 12.2891 137.055C13.9531 137.91 15.7966 138.355 17.6671 138.356C17.7261 138.356 17.785 138.355 17.8439 138.353C17.9912 138.351 18.1364 138.347 18.2816 138.341C20.5284 138.226 22.6945 137.466 24.5209 136.152C24.4535 136.028 24.3862 135.904 24.3167 135.78C22.5417 137.07 20.4289 137.813 18.2374 137.92Z"
        fill="white"
      />
      <path
        d="M18.5825 143.789C18.4352 143.801 18.2879 143.81 18.1406 143.816C17.9828 143.822 17.825 143.827 17.6672 143.827C15.2075 143.824 12.8149 143.024 10.8476 141.548C8.88034 140.072 7.44421 137.998 6.75424 135.637C6.65955 135.807 6.56485 135.976 6.47437 136.146C7.25178 138.501 8.75167 140.552 10.761 142.006C12.7703 143.461 15.1868 144.245 17.6672 144.248C17.825 144.248 17.9828 144.245 18.1385 144.237C18.2879 144.233 18.4352 144.224 18.5825 144.214C21.5578 143.981 24.3334 142.626 26.3474 140.424C26.3032 140.268 26.2527 140.115 26.2022 139.959C24.257 142.178 21.5238 143.552 18.5825 143.789Z"
        fill="white"
      />
      <path
        d="M163.789 96.3667C171.6 89.5321 175.046 80.6929 171.485 76.6238C167.924 72.5547 158.706 74.7966 150.895 81.6312C143.085 88.4658 139.639 97.305 143.2 101.374C146.76 105.443 155.978 103.201 163.789 96.3667Z"
        fill="#E4E4E4"
      />
      <path
        d="M48.3769 101.374C51.9374 97.3052 48.4919 88.466 40.6811 81.6314C32.8703 74.7967 23.652 72.5548 20.0915 76.6239C16.5309 80.693 19.9764 89.5323 27.7872 96.3669C35.598 103.201 44.8163 105.443 48.3769 101.374Z"
        fill="#E4E4E4"
      />
      <path
        d="M65.9676 155.955C76.3465 155.955 84.7602 151.572 84.7602 146.165C84.7602 140.758 76.3465 136.375 65.9676 136.375C55.5888 136.375 47.175 140.758 47.175 146.165C47.175 151.572 55.5888 155.955 65.9676 155.955Z"
        fill="#E4E4E4"
      />
      <path
        d="M125.609 155.955C135.988 155.955 144.401 151.572 144.401 146.165C144.401 140.758 135.988 136.375 125.609 136.375C115.23 136.375 106.816 140.758 106.816 146.165C106.816 151.572 115.23 155.955 125.609 155.955Z"
        fill="#E4E4E4"
      />
      <path
        d="M95.7884 142.451C70.3481 142.451 49.6509 121.754 49.6509 96.3135C49.6509 70.8732 70.3481 50.176 95.7884 50.176C121.229 50.176 141.926 70.8732 141.926 96.3135C141.926 121.754 121.229 142.451 95.7884 142.451ZM95.7884 50.6261C70.5963 50.6261 50.101 71.1214 50.101 96.3135C50.101 121.506 70.5963 142.001 95.7884 142.001C120.98 142.001 141.476 121.506 141.476 96.3135C141.476 71.1214 120.98 50.6261 95.7884 50.6261Z"
        fill="#3F3D56"
      />
      <path
        d="M84.541 127.044C75.2334 123.841 67.4056 117.367 62.5132 108.826C57.6209 100.285 55.9969 90.2572 57.9434 80.6084C55.3611 85.7824 53.9137 91.4483 53.698 97.2268C53.4822 103.005 54.5031 108.763 56.6924 114.116C58.8817 119.468 62.1888 124.291 66.3925 128.261C70.5962 132.232 75.5995 135.259 81.0676 137.14C86.5357 139.022 92.3425 139.713 98.0995 139.169C103.856 138.624 109.431 136.857 114.449 133.984C119.468 131.111 123.815 127.2 127.2 122.512C130.585 117.823 132.929 112.466 134.077 106.798C129.675 115.603 122.226 122.509 113.115 126.233C104.003 129.957 93.8491 130.245 84.541 127.044Z"
        fill="#F0F0F0"
      />
      <path
        d="M82.1995 92.6368C79.864 92.6368 77.9639 90.1643 77.9639 87.1251C77.9639 84.0859 79.864 81.6133 82.1995 81.6133C84.5351 81.6133 86.4352 84.0859 86.4352 87.1251C86.4352 90.1643 84.5351 92.6368 82.1995 92.6368Z"
        fill="#3F3D56"
      />
      <path
        d="M107.857 92.6368C105.521 92.6368 103.621 90.1643 103.621 87.1251C103.621 84.0859 105.521 81.6133 107.857 81.6133C110.192 81.6133 112.092 84.0859 112.092 87.1251C112.092 90.1643 110.192 92.6368 107.857 92.6368Z"
        fill="#3F3D56"
      />
      <path
        d="M92.8624 8.08962C95.0997 8.08962 96.9135 6.7797 96.9135 5.16383C96.9135 3.54796 95.0997 2.23804 92.8624 2.23804C90.625 2.23804 88.8113 3.54796 88.8113 5.16383C88.8113 6.7797 90.625 8.08962 92.8624 8.08962Z"
        fill="#2F2E41"
      />
      <path
        d="M92.8624 3.57596C94.2297 3.57596 95.3381 2.77546 95.3381 1.78798C95.3381 0.800507 94.2297 0 92.8624 0C91.4951 0 90.3867 0.800507 90.3867 1.78798C90.3867 2.77546 91.4951 3.57596 92.8624 3.57596Z"
        fill="#2F2E41"
      />
      <path
        d="M89.9491 6.33295C88.5556 4.93945 88.1146 3.06063 88.8097 1.85156C88.6445 1.9457 88.4925 2.06126 88.3577 2.19526C87.2151 3.33785 87.5714 5.54664 89.1534 7.12866C90.7355 8.71076 92.9442 9.06696 94.0868 7.92437C94.2208 7.78951 94.3364 7.63752 94.4305 7.47236C93.2214 8.16747 91.3426 7.72645 89.9491 6.33295Z"
        fill="#2F2E41"
      />
      <path
        d="M51.1618 78.7514L49.739 76.3873L58.1801 69.7739L60.2802 73.2628L51.1618 78.7514Z"
        fill="#FFB6B6"
      />
      <path
        d="M49.2332 80.7336L44.645 73.1112L44.7414 73.0531C45.5283 72.5795 46.4711 72.4379 47.3623 72.6593C48.2536 72.8808 49.0205 73.4472 49.4942 74.234L52.2966 78.8898L49.2332 80.7336Z"
        fill="#2F2E41"
      />
      <path
        d="M140.089 75.6007L141.512 73.2367L133.071 66.6233L130.971 70.1122L140.089 75.6007Z"
        fill="#FFB6B6"
      />
      <path
        d="M138.954 75.7389L141.756 71.0833L141.757 71.0831C142.23 70.2963 142.997 69.7299 143.888 69.5085C144.78 69.287 145.722 69.4286 146.509 69.9022L146.606 69.9603L142.017 77.5828L138.954 75.7389Z"
        fill="#2F2E41"
      />
      <path
        d="M84.9224 44.052L84.385 46.1982L69.8843 57.8066L54.2786 72.3908L55.9523 76.283L93.1497 51.387L135.086 73.1247L136.959 68.8339L117.822 56.0061L101.996 45.0925L84.9224 44.052Z"
        fill="#2F2E41"
      />
      <path
        d="M89.8052 21.0901L83.5376 23.1464L84.3849 45.9768C84.3849 45.9768 95.2851 52.5213 101.996 45.0925V22.2573L98.2534 21.0901H89.8052Z"
        fill="url(#paint0_linear_350_280)"
      />
      <path
        d="M100.605 23.8267L101.996 22.2571C101.996 22.2571 105.864 23.6699 105.541 27.9097C105.219 32.1495 102.946 45.6345 102.946 45.6345L102.518 54.4306H98.4805L100.09 31.6829L100.605 23.8267Z"
        fill="url(#paint1_linear_350_280)"
      />
      <path
        d="M85.3009 24.502L83.9097 22.9324C83.9097 22.9324 80.042 24.3452 80.3646 28.585C80.6871 32.8248 82.9602 46.3098 82.9602 46.3098L83.3878 55.1058H87.4254L85.8162 32.3582L85.3009 24.502Z"
        fill="url(#paint2_linear_350_280)"
      />
      <path
        d="M85.4354 58.7284C86.8027 58.7284 87.9111 57.62 87.9111 56.2528C87.9111 54.8855 86.8027 53.7771 85.4354 53.7771C84.0681 53.7771 82.9597 54.8855 82.9597 56.2528C82.9597 57.62 84.0681 58.7284 85.4354 58.7284Z"
        fill="#FFB6B6"
      />
      <path
        d="M100.514 58.7284C101.882 58.7284 102.99 57.62 102.99 56.2528C102.99 54.8855 101.882 53.7771 100.514 53.7771C99.1472 53.7771 98.0388 54.8855 98.0388 56.2528C98.0388 57.62 99.1472 58.7284 100.514 58.7284Z"
        fill="#FFB6B6"
      />
      <path
        d="M92.758 19.2154C96.5446 19.2154 99.6143 16.1457 99.6143 12.359C99.6143 8.57238 96.5446 5.50269 92.758 5.50269C88.9713 5.50269 85.9016 8.57238 85.9016 12.359C85.9016 16.1457 88.9713 19.2154 92.758 19.2154Z"
        fill="#2F2E41"
      />
      <path
        d="M92.9645 19.4417C96.0174 19.4417 98.4922 16.9668 98.4922 13.914C98.4922 10.8611 96.0174 8.38623 92.9645 8.38623C89.9116 8.38623 87.4368 10.8611 87.4368 13.914C87.4368 16.9668 89.9116 19.4417 92.9645 19.4417Z"
        fill="#FFB6B6"
      />
      <path
        d="M87.1562 10.4371C88.4194 11.3077 89.9187 11.7711 91.4528 11.765C90.9056 12.1444 90.2826 12.4007 89.6268 12.5162C91.6665 12.9537 93.7746 12.9656 95.8191 12.551C96.2735 12.4781 96.7121 12.3275 97.1154 12.1058C97.3164 11.9935 97.4915 11.8402 97.6293 11.6559C97.7672 11.4715 97.8647 11.2602 97.9155 11.0357C98.0514 10.2595 97.4466 9.55442 96.8181 9.0792C95.8559 8.36272 94.7464 7.86907 93.5699 7.63398C92.3935 7.3989 91.1795 7.42825 90.0158 7.71991C89.2559 7.91632 88.4947 8.24818 88.0011 8.85841C87.5076 9.46864 87.3614 10.4094 87.8316 11.0378L87.1562 10.4371Z"
        fill="#2F2E41"
      />
      <path
        d="M184.775 156.405H0.225061C0.165371 156.405 0.108126 156.381 0.0659186 156.339C0.0237115 156.297 0 156.239 0 156.18C0 156.12 0.0237115 156.063 0.0659186 156.021C0.108126 155.978 0.165371 155.955 0.225061 155.955H184.775C184.835 155.955 184.892 155.978 184.934 156.021C184.976 156.063 185 156.12 185 156.18C185 156.239 184.976 156.297 184.934 156.339C184.892 156.381 184.835 156.405 184.775 156.405Z"
        fill="#3F3D56"
      />
      <path
        d="M88.8113 114.318C88.8113 115.99 89.4752 117.593 90.657 118.774C91.8388 119.956 93.4417 120.62 95.113 120.62C96.7843 120.62 98.3872 119.956 99.569 118.774C100.751 117.593 101.415 115.99 101.415 114.318H88.8113Z"
        fill="#3F3D56"
      />
      <path
        d="M118.322 106.441C121.305 106.441 123.723 104.023 123.723 101.04C123.723 98.0565 121.305 95.6382 118.322 95.6382C115.339 95.6382 112.92 98.0565 112.92 101.04C112.92 104.023 115.339 106.441 118.322 106.441Z"
        fill="#F0F0F0"
      />
      <path
        d="M71.7342 106.441C74.7174 106.441 77.1357 104.023 77.1357 101.04C77.1357 98.0565 74.7174 95.6382 71.7342 95.6382C68.7511 95.6382 66.3328 98.0565 66.3328 101.04C66.3328 104.023 68.7511 106.441 71.7342 106.441Z"
        fill="#F0F0F0"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_350_280"
        x1="92.7669"
        y1="21.0901"
        x2="92.7669"
        y2="48.6402"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#05BDD6" stopOpacity="0.86" />
        <stop offset="1" stopColor="#4C66C0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_350_280"
        x1="102.02"
        y1="22.2571"
        x2="102.02"
        y2="54.4306"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2FB1D5" />
        <stop offset="1" stopColor="#4C66C0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_350_280"
        x1="83.8854"
        y1="22.9324"
        x2="83.8854"
        y2="55.1058"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2FB1D5" />
        <stop offset="1" stopColor="#4C66C0" />
      </linearGradient>
      <clipPath id="clip0_350_280">
        <rect width="185" height="156.405" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
