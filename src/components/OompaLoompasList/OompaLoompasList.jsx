import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOompaLoompasIfNeeded } from "../../store/oompaLoompa/oompaLoompaThunks";
import InfiniteScroll from "react-infinite-scroll-component";
import useFilter from "../../hooks/useFilter";
import { FilterBar } from "../FilterBar/FilterBar";
import { OompaLoompaItem } from "../OompaLoompaItem/OompaLoompaItem";
import "./OompaLoompasList.css";

export const OompaLoompasList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error, hasMore } = useSelector(
    (state) => state.oompaLoompas.list,
  );

  const { filteredData, updateFilter } = useFilter(data);

  useEffect(() => {
    if (data.length === 0 && hasMore) {
      dispatch(fetchOompaLoompasIfNeeded());
    }
  }, [dispatch]);

  const handleFilterChange = (e) => {
    updateFilter(e.target.value);
  };

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchOompaLoompasIfNeeded());
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className="filter-bar">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      <div className="oompaLoompas-description-header">
        <h1>Find your Oompo Loompa</h1>
        <h3>There are more than 100k</h3>
      </div>
      <InfiniteScroll
        dataLength={filteredData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={isLoading && <h4>Loading more Oompa Loompas...</h4>}
      >
        <div className="oompaLoompas-container">
          {filteredData.map((oompaLoompa) => (
            <OompaLoompaItem key={oompaLoompa.id} {...oompaLoompa} />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};
