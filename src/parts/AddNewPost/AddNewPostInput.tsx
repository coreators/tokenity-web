// import { type } from "os";

export default function AddNewPostInput({ v, onChange }) {
  return (
    <div className="mt-3 row">
      <label className="col-sm-4 col-form-label">{v.title}</label>
      <div className="col-sm-8">
        {v.type === "switch" && (
          <div className="form-check form-switch">
            <input
              id={`${v.key}`}
              className="form-check-input"
              type="checkbox"
              onChange={onChange}
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
              id={`${v.key}`}
              type="tel"
              className="form-control"
              onChange={onChange}
              onKeyPress={(e) => {
                return !/[0-9.]/.test(e.key) && e.preventDefault();
              }}
              onKeyUp={(e: any) => {
                if (
                  v.options &&
                  v.options.max &&
                  Number(e.target.value > v.options.max)
                ) {
                  e.target.value = v.options.max;
                  return;
                }
              }}
              {...v.options}
            />
          </div>
        )}

        {v.type !== "switch" && v.type !== "min_bid" && (
          <input
            id={`${v.key}`}
            type={v.type}
            className="form-control"
            onKeyPress={(e) =>
              v.type === "number" && !/[0-9]/.test(e.key) && e.preventDefault()
            }
            onKeyUp={(e: any) => {
              if (v.type === "number") e.target.value = Number(e.target.value);
              if (
                v.options &&
                v.options.max &&
                Number(e.target.value > v.options.max)
              ) {
                e.target.value = v.options.max;
                return;
              }
            }}
            onChange={onChange}
            {...v.options}
          />
        )}
      </div>
    </div>
  );
}
