import { Box } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import { lazy } from "react";
import { Link } from "react-router-dom";
import ButtonWithExitAnimation from "./ButtonWithExitAnimation";

export function NewActions() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }} cla>
        <Box sx={{ cursor: "pointer", "&:active": { opacity: ".87" } }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M11.6667 7.00001H16.3334C16.3334 6.38117 16.0875 5.78768 15.65 5.35009C15.2124 4.91251 14.6189 4.66668 14 4.66668C13.3812 4.66668 12.7877 4.91251 12.3501 5.35009C11.9125 5.78768 11.6667 6.38117 11.6667 7.00001ZM9.33337 7.00001C9.33337 5.76233 9.82504 4.57535 10.7002 3.70018C11.5754 2.82501 12.7624 2.33334 14 2.33334C15.2377 2.33334 16.4247 2.82501 17.2999 3.70018C18.175 4.57535 18.6667 5.76233 18.6667 7.00001H24.5C24.8095 7.00001 25.1062 7.12293 25.325 7.34172C25.5438 7.56051 25.6667 7.85726 25.6667 8.16668C25.6667 8.4761 25.5438 8.77284 25.325 8.99163C25.1062 9.21043 24.8095 9.33334 24.5 9.33334H23.471L22.4374 21.3967C22.338 22.5616 21.805 23.6467 20.9439 24.4374C20.0827 25.2281 18.9561 25.6668 17.787 25.6667H10.213C9.04394 25.6668 7.91736 25.2281 7.05621 24.4374C6.19507 23.6467 5.66208 22.5616 5.56271 21.3967L4.52904 9.33334H3.50004C3.19062 9.33334 2.89388 9.21043 2.67508 8.99163C2.45629 8.77284 2.33337 8.4761 2.33337 8.16668C2.33337 7.85726 2.45629 7.56051 2.67508 7.34172C2.89388 7.12293 3.19062 7.00001 3.50004 7.00001H9.33337ZM17.5 14C17.5 13.6906 17.3771 13.3938 17.1583 13.1751C16.9395 12.9563 16.6428 12.8333 16.3334 12.8333C16.024 12.8333 15.7272 12.9563 15.5084 13.1751C15.2896 13.3938 15.1667 13.6906 15.1667 14V18.6667C15.1667 18.9761 15.2896 19.2728 15.5084 19.4916C15.7272 19.7104 16.024 19.8333 16.3334 19.8333C16.6428 19.8333 16.9395 19.7104 17.1583 19.4916C17.3771 19.2728 17.5 18.9761 17.5 18.6667V14ZM11.6667 12.8333C11.9761 12.8333 12.2729 12.9563 12.4917 13.1751C12.7105 13.3938 12.8334 13.6906 12.8334 14V18.6667C12.8334 18.9761 12.7105 19.2728 12.4917 19.4916C12.2729 19.7104 11.9761 19.8333 11.6667 19.8333C11.3573 19.8333 11.0605 19.7104 10.8418 19.4916C10.623 19.2728 10.5 18.9761 10.5 18.6667V14C10.5 13.6906 10.623 13.3938 10.8418 13.1751C11.0605 12.9563 11.3573 12.8333 11.6667 12.8333ZM7.88671 21.1983C7.93641 21.781 8.20307 22.3237 8.63389 22.7191C9.06471 23.1145 9.62829 23.3337 10.213 23.3333H17.787C18.3714 23.3331 18.9344 23.1136 19.3647 22.7183C19.795 22.323 20.0614 21.7806 20.111 21.1983L21.1284 9.33334H6.87171L7.88671 21.1983Z"
              fill="#7C7C7C"
            />
          </svg>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key="done"
            initial={{
              y: -30,
            }}
            animate={{ y: 0 }}
            exit={{ y: -30 }}
            transition={{ duration: 0.3 }}
            className="routing-animated"
          >
            <Link to="/">
              <Box
                sx={{
                  width: "32px",
                  height: "32px",
                  background: "#EDECEC",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginLeft: "15px",
                  ":active": {
                    background: "#E5E5E5",
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M11.1417 21L4.4917 14.35L6.1542 12.6875L11.1417 17.675L21.8459 6.97083L23.5084 8.63333L11.1417 21Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </Box>
            </Link>
          </motion.div>
        </AnimatePresence>
        <ButtonWithExitAnimation />
      </div>
    </>
  );
}
