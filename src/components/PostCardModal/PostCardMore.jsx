import { useContext } from "react";
// import { useModal } from "@ebay/nice-modal-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

// context
import UserContext from "../../context/UserContext";

// style
import styles from "./modal.module.scss";

// report

export default NiceModal.create(({ post }) => {
  let modal = useModal();
  let visible = modal.visible;

  // userData context
  const { userData } = useContext(UserContext);

  let isAuthor = post.userName === userData.user.credentials.userName;

  // can delete post

  return (
    <>
      {visible && (
        <div className={styles.dialogWrapper} role="presentation">
          <div className={styles.dialogBoxAlign} role="dialog">
            <div className={styles.dialogBoxLook}>
              <div className={styles.btnAlign}>
                <div>
                  <button
                    className={styles.btn}
                    onClick={() => window.alert("Under Construction")}
                  >
                    Report
                  </button>
                  {isAuthor && (
                    <button
                      className={styles.btn}
                      onClick={() => {
                        modal.hide();
                        modal.resolve({
                          type: "delete",
                        });
                      }}
                    >
                      Delete Post
                    </button>
                  )}
                  <button className={styles.btn} onClick={modal.remove}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
