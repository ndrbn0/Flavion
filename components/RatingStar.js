import styled from "styled-components";
import { useState } from "react";

const StarRating = ({ rating, onRate, id }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <Stars>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= (hoverRating || rating)}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </Star>
      ))}
    </Stars>
  );
};

export default StarRating;

const Stars = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#FFD700" : "#E0E0E0")};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
