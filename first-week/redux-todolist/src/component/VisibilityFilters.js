import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";

const VisibilityFilters = ({ setFilter }) => {
  return (
    <div>
      {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={currentFilter}
            onClick={() => {
              setFilter(currentFilter);
            }}
            style={{ border: "1px solid black", margin: "8px" }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeFilter: state.visibilityFilter };
};
export default connect(mapStateToProps, { setFilter })(VisibilityFilters);
