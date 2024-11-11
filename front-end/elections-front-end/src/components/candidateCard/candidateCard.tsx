import React from 'react';
import './candidateCard.css'

interface CandidateCardProps {
    
    name: string;
    image: string;
    votes: number;
}

const candidateCard: React.FC<CandidateCardProps> = ({name, image, votes}) => {
  return (
    <div className='candidateCard'>
        <div>{name}</div>
        <img src={image} alt="image" className='image'/>
        <div>votes: {votes}</div>
    </div>
  )
}

export default candidateCard