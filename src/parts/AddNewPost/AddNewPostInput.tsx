export default function AddNewPostInput({ v }) {
  return (
    <div className="mt-3 row">
      <label className="col-sm-4 col-form-label">{v.title}</label>
      <div className="col-sm-8">
        {v.type === "switch" && (
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={`${v.key}`}
              defaultChecked
            />
            {v.switchLabel && (
              <label className="form-check-label" htmlFor={`${v.key}`}>
                {v.switchLabel}
              </label>
            )}
          </div>
        )}

        {v.type === "min_bid" && (
          <div className="input-group ">
            <span className="input-group-text">COSM</span>
            <input
              type="number"
              min="0"
              className="form-control"
              onKeyPress={(e) =>
                v.type === "min_bid" &&
                !/[0-9.]/.test(e.key) &&
                e.preventDefault()
              }
            />
          </div>
        )}

        {v.type !== "switch" && v.type !== "min_bid" && (
          <input
            type={v.type}
            className="form-control"
            onKeyPress={(e) =>
              v.type === "number" && !/[0-9]/.test(e.key) && e.preventDefault()
            }
          />
        )}
      </div>
    </div>
  );
}
