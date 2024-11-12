import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { featchCandidates } from "../store/features/CandidatesSlice";
import CandidateCard from "../components/candidateCard/candidateCard";

const VotePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, status, candidates } = useSelector(
    (state: RootState) => state.candidates
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(featchCandidates());
    }
  }, [dispatch, status]);

  return (
    <>
      <main className="candidatesContainer">
        {status === "fulfilled" && !error ? (
          candidates.map((candidate) => (
            <div key={candidate.name}>
              <CandidateCard name={candidate.name} image={candidate.image} votes={candidate.votes} />
            </div>
          ))
        ) : (
          <p>{status}</p>
        )}
      </main>
      {error && <p>{error}</p>}
    </>
  );
};

export default VotePage;
